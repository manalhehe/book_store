import React from 'react';

const Stats = () => {
  const stats = [
    { label: "Curated Titles", value: "12,000+" },
    { label: "Active Readers", value: "45k" },
    { label: "Global Authors", value: "1.2k" },
    { label: "Daily Sales", value: "850+" }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      padding: '100px 8%', 
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '300', 
            color: '#1a1a1a', 
            margin: 0,
            letterSpacing: '-2px'
          }}>
            {stat.value}
          </h2>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#ff4757', 
            fontWeight: '700', 
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginTop: '10px'
          }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;