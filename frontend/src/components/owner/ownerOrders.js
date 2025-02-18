import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
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

  const handleStatusChange = async (userId, itemId, newStatus) => {
    try {
      // console.log("Updating Order:", orderId, "Item:", itemId, "New Status:", newStatus);

      const response = await fetch(`http://localhost:5000/orders/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus }),
      });
  
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) => ({
            ...order,
            items: order.items.map((item) =>
              item._id === itemId ? { ...item, status: newStatus } : item
            ),
          }))
        );
      } else {
      console.error("Failed to update status.");
    }
  }catch (error) {
      console.error('Error updating status:', error);
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
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <h3 style={styles.customerName}>Customer: {order.customerName}</h3>
            <table style={styles.orderTable}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th> 
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>Rs. {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.price * item.quantity}</td>
                    <td>
                      
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange( order.userId, item._id, e.target.value)}
                        style={styles.statusSelect}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={{ fontWeight: 'bold' }}>Total Amount:</td>
                  <td style={{ fontWeight: 'bold' }}>Rs. {calculateTotal(order.items)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#F7F9FC',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  dashboardTitle: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  customerName: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#555',
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
    color: '#333',
  },
  statusSelect: {
    padding: '5px',
    border: '1px solid #C1C1C1',
    borderRadius: '4px',
    backgroundColor: '#F1F1F1',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  noOrders: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
  },
};

export default OwnerDashboard;
