import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

    
    const userProfile = {
      name: localStorage.getItem('userName') || 'Guest', 
    };

  const userId = localStorage.getItem('userId')?.trim();
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/orders/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, [userId]);

  const handlePayment = () => {
    setShowPaymentForm(true);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setShowPaymentForm(false);
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return total + orderTotal;
    }, 0);
  };
  

  const handleRemoveItem = async (id) => {
    try {

      await axios.delete(`http://localhost:5000/orders/${id}`);

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
      {orders.map((order) => (
        <div key={order._id} style={styles.orderItem}>
          
          {order.items.map((item) => (
            <div key={item._id} style={styles.itemDetails}>
              <h2>{item.itemName}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price per item: Rs. {item.price.toFixed(2)}</p>
              <p>Total Amount: Rs. {item.totalAmount.toFixed(2)}</p>
              <p style={getStatusStyle(item.status)}>
            <strong>Status:</strong> {item.status}
          </p>
            </div>
          ))}

         
          <button
            style={styles.removeButton}
            onClick={() => handleRemoveItem(order._id)}
          >
            Remove Order
          </button>
        </div>
      ))}
    </div>
      <div style={styles.totalSection}>
        <h3>Total Price: Rs. {calculateTotal()}</h3>
        {!showPaymentForm && !paymentSuccess && (
          <button style={styles.paymentButton} onClick={handlePayment}>
            Make Payment
          </button>
        )}
      </div>

      {showPaymentForm && (
        <form onSubmit={handleSubmitPayment} style={styles.paymentForm}>
          <h3>Payment Details</h3>
          <label>
            Name:
            <input type="text" value={userProfile.name}  style={styles.input} />
          </label>
          <label>
            Total Amount:
            <input type="text" value={`${calculateTotal()}`} style={styles.input} />
          </label>
          <button type="submit" style={styles.submitButton}>Pay</button>
        </form>
      )}

      {paymentSuccess && <p style={styles.successMessage}>Payment Successful!</p>}
    </div>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return { ...styles.status, color: 'green', backgroundColor: '#e6ffe6' };
    case 'pending':
      return { ...styles.status, color: 'orange', backgroundColor: '#fff7e6' };
    case 'In Progress':
      return { ...styles.status, color: 'blue', backgroundColor: '#e6f0ff' };
    default:
      return { ...styles.status, color: 'black' };
  }
};

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
