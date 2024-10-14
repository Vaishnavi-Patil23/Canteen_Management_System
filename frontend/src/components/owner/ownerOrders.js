import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    try {
      const updatedOrders = [...orders];
      updatedOrders[index].status = newStatus;
      setOrders(updatedOrders);

      await axios.put(`http://localhost:3000/orders/${updatedOrders[index]._id}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (orders.length === 0) {
    return <div style={styles.noOrders}>No orders available</div>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.dashboardTitle}>Customer Orders</h2>
      <div style={styles.ordersList}>
        {orders.map((order, index) => (
          <div key={order._id} style={styles.orderCard}>
            <h3 style={styles.customerName}>Customer: {order.customerName}</h3>
            <table style={styles.orderTable}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.itemName}</td>
                  <td>Rs. {order.price}</td>
                  <td>{order.quantity}</td>
                  <td>Rs. {order.totalAmount}</td>
                </tr>
                <tr>
                  <td colSpan="3">Total:</td>
                  <td>Rs. {calculateTotal([order])}</td>
                </tr>
              </tbody>
            </table>

            <div style={styles.statusSection}>
              <label htmlFor={`status-${index}`} style={styles.statusLabel}>Order Status:</label>
              <select
                id={`status-${index}`}
                value={order.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                style={styles.statusSelect}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS styles defined in a JavaScript object with descent colors
const styles = {
  dashboardContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#F7F9FC', // Light grey background for the dashboard
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  dashboardTitle: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333', // Dark grey for the title
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  orderCard: {
    backgroundColor: '#FFFFFF', // White for order cards
    border: '1px solid #E0E0E0', // Light grey border for cards
    borderRadius: '8px',
    padding: '15px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  customerName: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#555', // Medium grey for customer names
  },
  orderTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '10px',
  },
  statusSection: {
    marginTop: '10px',
  },
  statusLabel: {
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#333', // Dark grey for status label
  },
  statusSelect: {
    padding: '5px',
    border: '1px solid #C1C1C1', // Light grey for the select border
    borderRadius: '4px',
    backgroundColor: '#F1F1F1', // Light background for select
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555', // Medium grey for loading text
  },
  noOrders: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777', // Light grey for no orders text
  },
};

export default OwnerDashboard;
