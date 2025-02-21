import React, { useState, useEffect } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  const userProfile = {
    name: localStorage.getItem('userName') || 'Guest', 
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/menu`);
        if (!response.ok) {
          throw new Error(`Error fetching menu items: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const addToOrder = (item, quantity) => {
    if (quantity > 0 && item.available) {
      const orderItem = { ...item, quantity };
      setOrder(prevOrder => [...prevOrder, orderItem]);
    } else {
      alert('Please select a valid quantity!');
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const addOrder = async () => {
    if (order.length === 0) {
      alert('No items in the order');
      return;
    }

    const customerName = userProfile.name;
    const userId = localStorage.getItem('userId');

    console.log('userId from localStorage:', userId);

    const orderItems = order.map(item => ({
      itemName: item.name,
      price: item.price,
      quantity: item.quantity,
      totalAmount: item.price * item.quantity,
      status: 'pending',
    }));

    try {
      const response = await fetch(`${BACKEND_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          customerName, 
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add the order');
      }

      const data = await response.json();
      console.log('Order added successfully:', data);
      setOrder([]); 
      alert('Order added successfully!');
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Failed to add the order: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Menu</h1>
      <div style={styles.menuList}>
        {menuItems.map(item => (
          <div key={item._id} style={styles.menuItem}>
            <h2>{item.name}</h2>
            <p>Price: Rs. {item.price}</p>
            <p style={item.available ? styles.available : styles.unavailable}>
              {item.available ? 'Available' : 'Unavailable'}
            </p>

            {item.available && (
              <div style={styles.orderSection}>
                <label htmlFor={`quantity_${item._id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity_${item._id}`}
                  min="1"
                  max="10"
                  value={quantities[item._id] || ''}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  style={styles.quantityInput}
                />
                <button
                  style={styles.addButton}
                  onClick={() => {
                    const quantity = Number(quantities[item._id] || 1);
                    addToOrder(item, quantity);
                  }}
                >
                  Add to Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.orderSummary}>
        <h2>Current Order</h2>
        {order.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          <ul>
            {order.map((orderItem, index) => (
              <li key={index}>
                {orderItem.name} - Quantity: {orderItem.quantity}, Price: Rs. {orderItem.price * orderItem.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button style={styles.addOrderButton} onClick={addOrder}>
        Add Order
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  menuList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  menuItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    width: '250px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  available: {
    color: 'green',
    fontWeight: 'bold',
  },
  unavailable: {
    color: 'red',
    fontWeight: 'bold',
  },
  orderSection: {
    marginTop: '10px',
  },
  quantityInput: {
    marginLeft: '10px',
    width: '50px',
    padding: '5px',
  },
  addButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addOrderButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  orderSummary: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
  },
};

export default MenuPage;
