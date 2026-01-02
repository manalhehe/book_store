import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders from your server.js API
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Dashboard...</div>;

  return (
    <div style={{ padding: '60px 8%', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontWeight: '900', fontSize: '2.5rem' }}>Sales Dashboard</h1>
        <div style={statCardStyle}>
          <span style={{ color: '#666' }}>Total Revenue: </span>
          <span style={{ color: '#2ed573', fontWeight: '900' }}>${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      <div style={tableContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Recent Orders</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Items</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={tdStyle}>#{order._id.slice(-6)}</td>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 'bold' }}>{order.customerName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.email}</div>
                </td>
                <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>{order.items.length} Books</td>
                <td style={{ ...tdStyle, fontWeight: 'bold' }}>${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p style={{ textAlign: 'center', padding: '40px' }}>No sales yet!</p>}
      </div>
    </div>
  );
};

// --- Styles ---
const tableContainerStyle = {
  background: 'white',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
};

const statCardStyle = {
  background: 'white',
  padding: '15px 30px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  fontSize: '1.2rem'
};

const thStyle = { padding: '15px', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' };
const tdStyle = { padding: '15px', verticalAlign: 'middle' };

export default AdminDashboard;