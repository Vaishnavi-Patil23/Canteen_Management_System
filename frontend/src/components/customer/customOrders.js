import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed: npm install axios

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

    
    const userProfile = {
      name: localStorage.getItem('userName') || 'Guest', // Fetch dynamically
    };


  // useEffect(() => {
  //   // Fetching orders from the backend API
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/orders`, {
  //         params: { userId},
  //       }); // Fetching from your API endpoint
  //       setOrders(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [userId]);

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   console.log('Fetched userId:', userId);
  //   // Fetching orders for the logged-in user using localStorage
  //   if (userId) {
    // const fetchOrders = async () => {
    //   try {
    //     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
        
    //     if (!userId) {
    //       console.error('User not logged in');
    //       setLoading(false);
    //       return;
    //     }
    //     // Fetch orders for the logged-in user
    //     const response = await axios.get(`http://localhost:3000/orders/${userId}`);
    //     setOrders(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching orders:', error);
    //     setLoading(false);
    //   }
    // };

  //   const fetchOrders = async () => {
  //     const userId = localStorage.getItem('userId');  // Retrieve the userId from localStorage
    
  //     if (!userId) {
  //       alert('User not logged in');
  //       return;
  //     }
    
  //     try {
  //       const response = await fetch(`http://localhost:3000/orders/${userId}`);
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || 'Failed to fetch orders');
  //       }
    
  //       const orders = await response.json();
  //       console.log('Orders fetched successfully:', orders);
  //       setOrders(orders);  // Assuming you are storing the fetched orders in a state variable
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //       alert('Failed to fetch orders: ' + error.message);
  //     }
  //   };
    
  //   fetchOrders();
  // } else {
  //   console.error('User ID not found in localStorage');
  //   setLoading(false); // Set loading to false if userId is not found
  // }
  // }, []); // Empty dependency array to run once on mount

  const userId = localStorage.getItem('userId')?.trim();
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/orders/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Reset loading after fetch
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
      {orders.map((order) => (
        <div key={order._id} style={styles.orderItem}>
          
          {/* Display items in the order */}
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

          {/* Display order status */}
         
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
            <input type="text" value={`${calculateTotal()}`} readOnly style={styles.input} />
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
    case 'pending':
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
