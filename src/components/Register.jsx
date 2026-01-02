import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Points to your active server on localhost:5000
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert("Registration Successful!");
      onBack(); 
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '50px', borderRadius: '20px', textAlign: 'center' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" required style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={btnStyle}>Register</button>
      </form>
      <p onClick={onBack} style={{ cursor: 'pointer', color: '#ff4757', marginTop: '15px' }}>Back to Login</p>
    </div>
  );
};

const inputStyle = { display: 'block', margin: '10px auto', padding: '12px', width: '250px', borderRadius: '8px', border: '1px solid #ddd' };
const btnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default Register;