import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed: npm install axios

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const userProfile = {
    name: 'Joseph',
  };

  useEffect(() => {
    // Fetching orders from the backend API
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders'); // Fetching from your API endpoint
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = () => {
    setShowPaymentForm(true);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setShowPaymentForm(false);
  };

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
  };

  const handleRemoveItem = async (id) => {
    try {
      // Delete order from database
      await axios.delete(`http://localhost:3000/orders/${id}`); // Adjust your API path if necessary

      // Remove order from state after deletion from database
      const updatedOrders = orders.filter(order => order._id !== id);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Orders</h1>
      <div style={styles.orderList}>
        {orders.map(order => (
          <div key={order._id} style={styles.orderItem}>
            <h2>{order.itemName}</h2>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price}</p>
            <p style={getStatusStyle(order.status)}>Status: {order.status}</p>
            <button style={styles.removeButton} onClick={() => handleRemoveItem(order._id)}>
              Remove {order.name}
            </button>
          </div>
        ))}
      </div>
      <div style={styles.totalSection}>
        <h3>Total Price: ${calculateTotal()}</h3>
        {!showPaymentForm && !paymentSuccess && (
          <button style={styles.paymentButton} onClick={handlePayment}>
            Make Payment
          </button>
        )}
      </div>

      {/* Payment Form */}
      {showPaymentForm && (
        <form onSubmit={handleSubmitPayment} style={styles.paymentForm}>
          <h3>Payment Details</h3>
          <label>
            Name:
            <input type="text" value={userProfile.name} readOnly style={styles.input} />
          </label>
          <label>
            Total Amount:
            <input type="text" value={`$${calculateTotal()}`} readOnly style={styles.input} />
          </label>
          <button type="submit" style={styles.submitButton}>Pay</button>
        </form>
      )}

      {/* Payment Success Message */}
      {paymentSuccess && <p style={styles.successMessage}>Payment Successful!</p>}
    </div>
  );
};

// Function to get status style based on order status
const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return { ...styles.status, color: 'green', backgroundColor: '#e6ffe6' };
    case 'Pending':
      return { ...styles.status, color: 'orange', backgroundColor: '#fff7e6' };
    case 'In Progress':
      return { ...styles.status, color: 'blue', backgroundColor: '#e6f0ff' };
    default:
      return { ...styles.status, color: 'black' };
  }
};

// CSS Styling
const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333',
  },
  orderList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  orderItem: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    textAlign: 'left',
  },
  status: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  totalSection: {
    marginTop: '30px',
  },
  paymentButton: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  paymentForm: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '1rem',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  successMessage: {
    marginTop: '20px',
    fontSize: '1.5rem',
    color: 'green',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default OrderPage;
