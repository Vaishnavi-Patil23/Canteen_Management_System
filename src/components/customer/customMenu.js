import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuTable = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', availability: true });

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    const response = await axios.get('/api/menu');
    setMenuItems(response.data);
  };

  useEffect(() => {
    fetchMenuItems();  // Fetch data on component mount
    const intervalId = setInterval(fetchMenuItems, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update a menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      await axios.put(`/api/menu/${editingItem._id}`, formData);
    } else {
      // Add new item
      await axios.post('/api/menu', formData);
    }
    setEditingItem(null);
    setFormData({ name: '', price: '', availability: true });
    fetchMenuItems();
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`/api/menu/${id}`);
    fetchMenuItems();
  };

  return (
    <div>
      <h1>Menu</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.availability ? 'Available' : 'Unavailable'}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value === 'true' })}
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
      </form>
    </div>
  );
};

export default MenuTable;
