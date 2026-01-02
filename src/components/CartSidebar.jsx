import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onCheckoutClick }) => {
  // Calcul du total des articles dans le panier
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Si la barre latérale n'est pas ouverte, on ne renvoie rien
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, height: '100%', width: '380px',
      backgroundColor: 'white', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
      zIndex: 1000, padding: '30px', display: 'flex', flexDirection: 'column',
      transition: 'all 0.3s ease'
    }}>
      {/* En-tête du Panier */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <h2 style={{ fontWeight: '900', fontSize: '1.8rem', margin: 0 }}>Your Cart</h2>
        <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '2rem', cursor: 'pointer', color: '#666' }}>×</button>
      </div>

      {/* Liste des Livres */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f5f5f5' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '60px', height: '85px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 5px 0', color: '#1a1a1a' }}>{item.title}</h4>
                <p style={{ color: '#ff4757', fontWeight: '800', margin: 0 }}>${item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Résumé et Bouton d'action */}
      <div style={{ borderTop: '2px solid #f5f5f5', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '1.4rem', fontWeight: '900' }}>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => {
            console.log("Bouton Checkout cliqué !"); // Pour vérifier dans F12
            onCheckoutClick(); // Appel de la fonction de redirection de App.jsx
          }}
          style={{
            width: '100%',
            padding: '18px',
            background: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '900',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'transform 0.2s ease',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.target.style.background = '#333'}
          onMouseOut={(e) => e.target.style.background = '#1a1a1a'}
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;