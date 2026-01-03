import React from 'react';

const BookCard = ({ book, onAddToCart, onWishlistToggle, isWishlisted, onOpenQuickView }) => {
  return (
    <div style={cardStyle}>
      {/* Wishlist Heart Button */}
      <div 
        onClick={(e) => {
          e.stopPropagation(); // Prevents opening quick view when clicking heart
          onWishlistToggle();
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          cursor: 'pointer',
          background: 'white',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ 
          fontSize: '1.2rem', 
          color: isWishlisted ? '#ff4757' : '#ccc',
          transition: 'color 0.3s ease'
        }}>
          {isWishlisted ? '❤️' : '🤍'}
        </span>
      </div>

      {/* Book Image */}
      <div style={imageContainer} onClick={onOpenQuickView}>
        <img src={book.image} alt={book.title} style={imageStyle} />
        <div style={overlayStyle}>
          <span>Quick View</span>
        </div>
      </div>

      {/* Book Info */}
      <div style={{ padding: '15px' }}>
        <h4 style={titleStyle}>{book.title}</h4>
        <p style={authorStyle}>{book.author}</p>
        <div style={footerStyle}>
          <span style={priceStyle}>${book.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            style={addBtnStyle}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const cardStyle = {
  background: 'white',
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease'
};

const imageContainer = {
  position: 'relative',
  height: '240px',
  cursor: 'pointer',
  overflow: 'hidden'
};

const imageStyle = { width: '100%', height: '100%', objectFit: 'cover' };

const overlayStyle = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)', color: 'white', display: 'flex',
  alignItems: 'center', justifyContent: 'center', opacity: 0,
  transition: 'opacity 0.3s ease', fontWeight: 'bold'
};

const titleStyle = { margin: '0 0 5px 0', fontSize: '1rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const authorStyle = { margin: '0 0 10px 0', fontSize: '0.8rem', color: '#888' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const priceStyle = { fontWeight: '900', color: '#ff4757', fontSize: '1.1rem' };
const addBtnStyle = { background: '#1a1a1a', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };

export default BookCard;