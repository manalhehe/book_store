const QuickView = ({ book, onClose, onAddToCart }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2000,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backdropFilter: 'blur(5px)'
    }} onClick={onClose}>
      
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: '#fff', width: '90%', maxWidth: '800px', borderRadius: '25px',
          display: 'flex', overflow: 'hidden', position: 'relative', animation: 'fadeIn 0.3s ease'
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        
        {/* Left Side: Image */}
        <div style={{ flex: 1, background: '#f8f9fa', padding: '40px', display: 'flex', alignItems: 'center' }}>
          <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
        </div>

        {/* Right Side: Details */}
        <div style={{ flex: 1.2, padding: '50px' }}>
          <p style={{ color: '#e74c3c', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>{book.genre}</p>
          <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>{book.title}</h2>
          <p style={{ color: '#888', marginBottom: '20px' }}>by {book.author}</p>
          
          <div style={{ margin: '20px 0', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.6' }}>
              Dive into this masterpiece by {book.author}. A must-read in the {book.genre} category that has captured the hearts of readers worldwide.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>${book.price}</span>
            <button 
              onClick={onAddToCart}
              style={{
                background: '#1a1a1a', color: '#fff', border: 'none', padding: '15px 30px',
                borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#e74c3c'}
              onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;