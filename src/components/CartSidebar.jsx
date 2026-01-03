import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onCheckoutClick }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay: Closes the cart when clicking outside on mobile */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999
        }}
      />

      <div style={{
        position: 'fixed', 
        right: 0, 
        top: 0, 
        height: '100%', 
        // MOBILE FIX: Use 100% width on small screens, 380px on desktop
        width: window.innerWidth < 500 ? '100%' : '380px',
        backgroundColor: 'white', 
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        zIndex: 1000, 
        padding: '25px', 
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
          <h2 style={{ fontWeight: '900', fontSize: '1.5rem', margin: 0 }}>Your Cart</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '2rem', cursor: 'pointer', color: '#666' }}>×</button>
        </div>

        {/* Book List */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '5px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <span style={{ fontSize: '3rem' }}>🛒</span>
              <p style={{ color: '#999', fontWeight: 'bold' }}>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f5f5f5' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '50px', height: '75px', borderRadius: '6px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', margin: '0 0 5px 0' }}>{item.title}</h4>
                  <p style={{ color: '#ff4757', fontWeight: '800', margin: 0, fontSize: '0.9rem' }}>${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        <div style={{ borderTop: '2px solid #f5f5f5', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: '900' }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => {
              onCheckoutClick();
              onClose(); // Auto-close after clicking checkout
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: '#1a1a1a',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;