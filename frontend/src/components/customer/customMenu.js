import React, { useState, useEffect } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking backend API data for menu items
    const mockMenuItems = [
      { _id: 1, name: 'Pizza', price: 10, available: true },
      { _id: 2, name: 'Burger', price: 5, available: false },
      { _id: 3, name: 'Pasta', price: 8, available: true },
      { _id: 4, name: 'Fries', price: 3, available: true },
      { _id: 5, name: 'Coffie', price: 10, available: true },
    ];

    setTimeout(() => {
      setMenuItems(mockMenuItems);
      setLoading(false);
    }, 1000);
  }, []);

  // Add an item to the order with selected quantity
  const addToOrder = (item, quantity) => {
    if (quantity > 0 && item.available) {
      setOrder([...order, { ...item, quantity }]);
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
            <p>Price: ${item.price}</p>
            {/* Show availability */}
            <p style={item.available ? styles.available : styles.unavailable}>
              {item.available ? 'Available' : 'Unavailable'}
            </p>

            {/* Quantity input */}
            {item.available && (
              <div style={styles.orderSection}>
                <label htmlFor={`quantity_${item._id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity_${item._id}`}
                  min="1"
                  max="10"
                  defaultValue="1"
                  style={styles.quantityInput}
                />
                <button
                  style={styles.addButton}
                  onClick={() => {
                    const quantity = document.getElementById(`quantity_${item._id}`).value;
                    addToOrder(item, Number(quantity));
                  }}
                >
                  Add to Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Display current order */}
      <div style={styles.orderSummary}>
        <h2>Current Order</h2>
        {order.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          <ul>
            {order.map((orderItem, index) => (
              <li key={index}>
                {orderItem.name} - Quantity: {orderItem.quantity}, Price: ${orderItem.price * orderItem.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// CSS Styling
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  menuList: {
    display: 'flex', // Arrange items in a horizontal row
    justifyContent: 'center', // Center horizontally
    flexWrap: 'wrap', // Allow wrapping if items overflow
    gap: '20px', // Space between items
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
  orderSummary: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
  },
};

export default MenuPage;
