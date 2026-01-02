import React from 'react';

const BookCard = ({ book, onAddToCart, onWishlistToggle, isWishlisted, onOpenQuickView, onDelete }) => {
  return (
    <div style={cardStyle}>
      {/* Delete button for Admin */}
      {onDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }} 
          style={deleteBtnStyle}
        >
          ✕
        </button>
      )}

      {/* Image with 404 security fix */}
      <div style={imageContainer} onClick={onOpenQuickView}>
        <img 
          src={book.image || 'https://via.placeholder.com/150x220?text=No+Image'} 
          alt={book.title} 
          style={imageStyle} 
          // If the link returns 404, this replaces it with a placeholder
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/150x220?text=Cover+Not+Found"; 
          }}
        />
        <div style={overlayStyle}>
          <span>Quick View</span>
        </div>
      </div>

      <div style={infoStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={genreStyle}>{book.genre || 'General'}</p>
            <h3 style={titleStyle}>{book.title}</h3>
            <p style={authorStyle}>by {book.author}</p>
          </div>
          {/* Wishlist Heart */}
          <button 
            onClick={(e) => { e.stopPropagation(); onWishlistToggle(book); }} 
            style={{ ...wishBtnStyle, color: isWishlisted ? '#ff4757' : '#ccc' }}
          >
            ❤
          </button>
        </div>

        <div style={footerStyle}>
          <span style={priceStyle}>${book.price}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(book); }} 
            style={addBtnStyle}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Provided in your file) ---
const cardStyle = { background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease', position: 'relative', cursor: 'pointer' };
const deleteBtnStyle = { position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(255, 71, 87, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
const imageContainer = { height: '280px', overflow: 'hidden', position: 'relative', background: '#f8f9fa' };
const imageStyle = { width: '100%', height: '100%', objectFit: 'contain', padding: '20px' };
const overlayStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', opacity: 0, transition: 'opacity 0.3s ease' };
const infoStyle = { padding: '20px' };
const genreStyle = { fontSize: '0.7rem', textTransform: 'uppercase', color: '#ff4757', fontWeight: '800', marginBottom: '5px' };
const titleStyle = { fontSize: '1.1rem', fontWeight: '800', margin: '0 0 5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const authorStyle = { fontSize: '0.85rem', color: '#747d8c', marginBottom: '15px' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #f1f2f6' };
const priceStyle = { fontSize: '1.3rem', fontWeight: '900', color: '#2f3542' };
const addBtnStyle = { background: '#2f3542', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const wishBtnStyle = { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: 0 };

export default BookCard;