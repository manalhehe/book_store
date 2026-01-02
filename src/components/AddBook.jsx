import React, { useState } from 'react';
import axios from 'axios';

const AddBook = ({ onBookAdded, onBack }) => {
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', genre: '', image: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to your running backend on port 5000
      const res = await axios.post('http://localhost:5000/api/books', formData);
      alert('Book added successfully!');
      onBookAdded(res.data); // Update the main list
      onBack(); // Go back to home
    } catch (err) {
      console.error("Error adding book:", err);
      alert('Failed to add book.');
    }
  };

  return (
    <div style={{ padding: '140px 8%', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '30px' }}>Add New <span style={{color: '#ff4757'}}>Book</span></h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Title" required style={inputStyle} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <input type="text" placeholder="Author" required style={inputStyle} onChange={(e) => setFormData({...formData, author: e.target.value})} />
        <input type="number" placeholder="Price" required style={inputStyle} onChange={(e) => setFormData({...formData, price: e.target.value})} />
        <input type="text" placeholder="Genre" style={inputStyle} onChange={(e) => setFormData({...formData, genre: e.target.value})} />
        <input type="text" placeholder="Image URL (e.g., Amazon link)" style={inputStyle} onChange={(e) => setFormData({...formData, image: e.target.value})} />
        <textarea placeholder="Description" style={{...inputStyle, height: '100px'}} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={btnStyle}>Save to Database</button>
          <button type="button" onClick={onBack} style={{...btnStyle, background: '#eee', color: '#333'}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = { padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem' };
const btnStyle = { padding: '15px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', flex: 1 };

export default AddBook;