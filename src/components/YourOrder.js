import React, { useState } from 'react';

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([
    {
      customerName: 'John Doe',
      items: [
        { name: 'Burger', price: 5, quantity: 2 },
        { name: 'Fries', price: 3, quantity: 1 },
      ],
      status: 'pending',
    },
    {
      customerName: 'Jane Smith',
      items: [
        { name: 'Pizza', price: 12, quantity: 1 },
        { name: 'Soda', price: 2, quantity: 2 },
      ],
      status: 'in-progress',
    },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Orders</h2>
      {orders.map((order, index) => (
        <div key={index} style={styles.orderCard}>
          <h3 style={styles.customerName}>Customer: {order.customerName}</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Item Name</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>${item.price}</td>
                  <td style={styles.tableCell}>{item.quantity}</td>
                  <td style={styles.tableCell}>${item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={styles.tableCellTotal}>Total:</td>
                <td style={styles.tableCell}>${calculateTotal(order.items)}</td>
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
  );
};

// Inline Styles
const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#4a90e2',
  },
  orderCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  customerName: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '15px',
  },
  tableHeader: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tableCellTotal: {
    padding: '10px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  statusSection: {
    marginTop: '15px',
  },
  statusLabel: {
    marginRight: '10px',
    fontWeight: 'bold',
  },
  statusSelect: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '150px',
  },
};

export default OwnerDashboard;
