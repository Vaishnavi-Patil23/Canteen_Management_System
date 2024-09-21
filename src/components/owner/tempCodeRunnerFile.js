import React, { useState, useEffect } from 'react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking backend API data for orders
    const mockOrders = [
      { _id: 1, name: 'Pizza', quantity: 2, price: 10, status: 'Completed' },
      { _id: 2, name: 'Burger', quantity: 1, price: 5, status: 'Pending' },
      { _id: 3, name: 'Pasta', quantity: 3, price: 8, status: 'In Progress' },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Your Orders</h1>
      <div style={styles.orderList}>
        {orders.map(order => (
          <div key={order._id} style={styles.orderItem}>
            <h2>{order.name}</h2>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price}</p>
            {/* Show order status with conditional styling */}
            <p style={getStatusStyle(order.status)}>
              Status: {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to get status style based on order status
const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return { color: 'green', fontWeight: 'bold' };
    case 'Pending':
      return { color: 'orange', fontWeight: 'bold' };
    case 'In Progress':
      return { color: 'blue', fontWeight: 'bold' };
    default:
      return { color: 'black' };
  }
};

// CSS Styling
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  orderList: {
    display: 'flex', // Arrange items horizontally
    justifyContent: 'center', // Center the orders horizontally
    flexWrap: 'wrap', // Allow wrapping if items overflow
    gap: '20px', // Space between order items
  },
  orderItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    width: '250px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
};

export default OrderPage;
