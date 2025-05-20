// src/components/LostFoundForm.jsx
import React, { useState } from 'react';
import styles from './Form.module.css';

const LostFoundForm = ({ type }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    location: '',
    date: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert('Form submitted! (dummy)');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.header}>{type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</h2>

      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select category</option>
        <option value="money">Money</option>
        <option value="electronics">Electronics</option>
        <option value="documents">Documents</option>
        <option value="fragile">Fragile Items</option>
        <option value="clothing">Clothing</option>
      </select>

      <label>Item Name</label>
      <input type="text" name="name" placeholder="e.g. Black iPhone 12" value={formData.name} onChange={handleChange} required />

      <label>Description</label>
      <textarea name="description" placeholder="Brief description..." value={formData.description} onChange={handleChange} required />

      <label>{type === 'lost' ? 'Location Last Seen' : 'Location Found'}</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} required />

      <label>Date {type === 'lost' ? 'Lost' : 'Found'}</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      {type === 'found' && (
        <>
          <label>Upload Photo</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </>
      )}

      <button type="submit" className={styles.submitBtn}>Submit</button>
    </form>
  );
};

export default LostFoundForm;
