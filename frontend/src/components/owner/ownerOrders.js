import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the backend
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order {index + 1}:</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity}, Total Price: ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// CSS Styling
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default OwnerOrdersPage;
