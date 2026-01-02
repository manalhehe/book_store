const Newsletter = () => {
  return (
    <div style={{ 
      padding: '100px 10%', 
      background: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)', 
      color: 'white',
      textAlign: 'center',
      marginTop: '0' 
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Join the BookHaven Club</h2>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px' }}>
        Get 20% off your first order and stay updated with new arrivals.
      </p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px',
        flexWrap: 'wrap' 
      }}>
        <input 
          type="email" 
          placeholder="Enter your email address..." 
          style={{ 
            padding: '18px 25px', 
            width: '400px', 
            borderRadius: '50px', 
            border: 'none',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button style={{ 
          padding: '18px 40px', 
          background: '#e74c3c', 
          color: 'white', 
          border: 'none', 
          borderRadius: '50px', 
          cursor: 'pointer',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          transition: '0.3s'
        }}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Newsletter;