import React from 'react';

const Hero = ({ onShopClick }) => {
  return (
    <div style={{
      height: '90vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Decorative Circles */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255, 71, 87, 0.05)', zIndex: 0 }} />

      {/* Text Section */}
      <div style={{ flex: 1, zIndex: 1, textAlign: 'left' }}>
        <span style={{ 
          background: '#ff4757', color: 'white', padding: '8px 20px', 
          borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)'
        }}>
          NEW ARRIVALS 2026
        </span>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', color: '#1a1a1a', margin: '20px 0', lineHeight: '1' }}>
          Read Your <br /> 
          <span style={{ color: '#ff4757' }}>Dream.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#57606f', maxWidth: '500px', lineHeight: '1.6' }}>
          Skip the boring. Dive into a collection of curated stories that challenge the mind and soothe the soul.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <button onClick={onShopClick} style={primaryBtn}>Explore Shop</button>
          <button onClick={onShopClick} style={secondaryBtn}>Best Sellers</button>
        </div>
      </div>

      {/* Floating Image Section */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" 
          alt="Featured Book"
          className="floating-hero"
          style={{ 
            width: '320px', borderRadius: '15px', boxShadow: '30px 30px 60px rgba(0,0,0,0.15)',
            transform: 'rotate(-10deg)', zIndex: 2 
          }} 
        />
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%', background: 'white',
          padding: '15px 25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          zIndex: 3, textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#ff4757' }}>4.9 ★</p>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#a4b0be', fontWeight: '600' }}>Top Rated Choice</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: rotate(-10deg) translateY(0px); }
          50% { transform: rotate(-10deg) translateY(-25px); }
          100% { transform: rotate(-10deg) translateY(0px); }
        }
        .floating-hero { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const primaryBtn = {
  padding: '18px 40px', background: '#1a1a1a', color: 'white', border: 'none',
  borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
};

const secondaryBtn = {
  padding: '18px 40px', background: 'transparent', color: '#1a1a1a', border: '2px solid #1a1a1a',
  borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
};

export default Hero;