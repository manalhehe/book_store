import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Use relative path for Vercel, absolute for local dev
    const apiUrl = import.meta.env.PROD ? '/api/orders' : 'http://localhost:5000/api/orders';
    
    axios.get(apiUrl)
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
    <div style={{ padding: '80px 5% 40px', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section - Responsive Flex */}
      <div style={{ 
        display: 'flex', 
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: window.innerWidth < 768 ? 'flex-start' : 'center', 
        marginBottom: '30px',
        gap: '20px'
      }}>
        <h1 style={{ fontWeight: '900', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>Sales Dashboard</h1>
        <div style={statCardStyle}>
          <span style={{ color: '#666' }}>Total Revenue: </span>
          <span style={{ color: '#2ed573', fontWeight: '900' }}>${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {/* Table Container - Added Overflow for Mobile */}
      <div style={tableContainerStyle}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Recent Orders</h2>
        
        <div style={{ overflowX: 'auto' }}> {/* CRITICAL FOR MOBILE: Enables side-scrolling for the table */}
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
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
        </div>
        
        {orders.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No sales records found.</p>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const tableContainerStyle = {
  background: 'white',
  padding: window.innerWidth < 768 ? '15px' : '30px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
};

const statCardStyle = {
  background: 'white',
  padding: '15px 25px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  fontSize: '1.1rem',
  width: window.innerWidth < 768 ? '100%' : 'auto',
  boxSizing: 'border-box'
};

const thStyle = { padding: '15px', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '15px', verticalAlign: 'middle', fontSize: '0.9rem' };

export default AdminDashboard;