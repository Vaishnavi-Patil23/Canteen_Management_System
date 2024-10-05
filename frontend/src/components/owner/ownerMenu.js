import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([
    // { name: 'Maggie', price: 30, available: true },
    // { name: 'Coffie', price: 10, available: true },
    // { name: 'Idali Sambhar', price: 35, available: true },
    // { name: 'Tea', price: 7, available: true },
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '', available: true });
  const [editItem, setEditItem] = useState(null); // State for editing an item
  const [isEditing, setIsEditing] = useState(null); // Track the editing index

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
        const data = await response.json();
        setMenuItems(data); // Assuming your backend sends the menu items as an array
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    
    fetchMenuItems();
  }, []);

  // Handler to add a new item
  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        const response = await fetch('http://localhost:3000/api/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newItem.name,
            price: newItem.price,
            available: newItem.available,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result.message); // Success message
          const updatedResponse = await fetch('http://localhost:3000/api/menu');
          const updatedData = await updatedResponse.json();
          // Update the menuItems state with the new item
          setMenuItems(updatedData);
          setNewItem({ name: '', price: '', available: true });
        } else {
          console.error('Failed to add menu item');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  // Handler to remove an item
  const handleRemoveItem = (index) => {
    const updatedMenu = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenu);
  };

  // Handler to start editing an item
  const handleEditItem = (index) => {
    setIsEditing(index); // Set the index for editing
    setEditItem(menuItems[index]); // Store the item being edited
  };

  // Handler to save the edited item
  const handleSaveEdit = (index) => {
    const updatedMenu = [...menuItems];
    updatedMenu[index] = editItem;
    setMenuItems(updatedMenu);
    setIsEditing(null); // Exit edit mode
    setEditItem(null); // Clear edit item state
  };

  const styles = {
    container: {
      margin: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    addItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      width: '100%',
    },
    select: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      width: '100%',
    },
    buttonAdd: {
      padding: '10px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #ddd',
      backgroundColor: '#f2f2f2',
      color: '#333',
    },
    td: {
      padding: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },
    buttonRemove: {
      padding: '6px 12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    buttonEdit: {
      padding: '6px 12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '10px',
    },
    header: {
      marginBottom: '20px',
      color: '#007bff',
      fontSize: '24px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Menu</h1>

      {/* Form to Add New Menu Item */}
      <div style={styles.addItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          style={styles.input}
        />
        <select
          value={newItem.available ? 'Yes' : 'No'}
          onChange={(e) => setNewItem({ ...newItem, available: e.target.value === 'Yes' })}
          style={styles.select}
        >
          <option value="Yes">Available</option>
          <option value="No">Not Available</option>
        </select>
        <button onClick={handleAddItem} style={styles.buttonAdd}>
          Add Item
        </button>
      </div>

      {/* Menu Items Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Meal Items</th>
            <th style={styles.th}>Item Price</th>
            <th style={styles.th}>Available</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editItem?.name || ''}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    style={styles.input}
                  />
                ) : (
                  item.itemName
                )}
              </td>
              <td style={styles.td}>
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editItem?.price || ''}
                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                    style={styles.input}
                  />
                ) : (
                  item.itemPrice
                )}
              </td>
              <td style={styles.td}>
                {isEditing === index ? (
                  <select
                    value={editItem?.available ? 'Yes' : 'No'}
                    onChange={(e) => setEditItem({ ...editItem, available: e.target.value === 'Yes' })}
                    style={styles.select}
                  >
                    <option value="Yes">Available</option>
                    <option value="No">Not Available</option>
                  </select>
                ) : (
                  item.Availability ? 'Yes' : 'No'
                )}
              </td>
              <td style={styles.td}>
                {isEditing === index ? (
                  <button onClick={() => handleSaveEdit(index)} style={styles.buttonAdd}>
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditItem(index)} style={styles.buttonEdit}>
                      Edit
                    </button>
                    <button onClick={() => handleRemoveItem(index)} style={styles.buttonRemove}>
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
