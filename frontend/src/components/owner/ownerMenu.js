//done
import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', available: true });
  const [editItem, setEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/menu`);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        const response = await fetch(`${BACKEND_URL}/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
        const data = await response.json();
        setMenuItems([...menuItems, data]);
        setNewItem({ name: '', price: '', available: true });
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const handleSaveEdit = async (index) => {
    try {
      const response = await fetch(`${BACKEND_URL}/menu/${menuItems[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem),
      });
      const data = await response.json();
      const updatedMenu = [...menuItems];
      updatedMenu[index] = data;
      setMenuItems(updatedMenu);
      setIsEditing(null);
      setEditItem(null);
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };
  
const handleEditItem = (index) => {
  setIsEditing(index); 
  setEditItem(menuItems[index]); 
};


  const handleRemoveItem = async (index) => {
    try {
      const response = await fetch(`${BACKEND_URL}/menu/${menuItems[index]._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMenuItems(menuItems.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
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

      <div style={styles.addItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
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
                  item.name
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
                  item.price
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
                  item.available ? 'Yes' : 'No'
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
