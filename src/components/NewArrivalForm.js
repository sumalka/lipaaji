// src/components/NewArrivalForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NewArrivalForm = () => {
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/new-arrivals', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('New arrival added successfully!');
      setFormData({ name: '', price: '', imageUrl: '' }); // Reset form
    } catch (error) {
      console.error('Error adding new arrival:', error);
      setError('Failed to add arrival. Check network or server.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Add New Arrival</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Product Image: </label>
        <input type="file" onChange={(e) => console.log(e.target.files)} /> {/* Placeholder for image upload */}
      </div>
      <div>
        <label>Product Name: </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>
      <button onClick={handleSubmit} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
        Add to New Arrivals
      </button>
    </div>
  );
};

export default NewArrivalForm;