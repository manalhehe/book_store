import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Stats from './components/Stats';
import Categories from './components/Categories';
import BookCard from './components/BookCard';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import CartSidebar from './components/CartSidebar';
import CheckoutPage from './components/CheckoutPage';
import QuickView from './components/QuickView';
import AddBook from './components/AddBook'; 
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';

const EXAMPLE_BOOKS = [
  { _id: '1', title: 'The 48 Laws of Power', author: 'Robert Greene', price: 26, image: 'https://covers.openlibrary.org/b/id/8225266-L.jpg', genre: 'Philosophy' },
  { _id: '2', title: 'Ikigai', author: 'Héctor García', price: 18, image: 'https://covers.openlibrary.org/b/id/12711613-L.jpg', genre: 'Self-Help' },
  { _id: '3', title: 'The Housemaid', author: 'Freida McFadden', price: 14, image: 'https://covers.openlibrary.org/b/id/12913958-L.jpg', genre: 'Thriller' },
  { _id: '4', title: 'Atomic Habits', author: 'James Clear', price: 22, image: 'https://covers.openlibrary.org/b/id/12884200-L.jpg', genre: 'Self-Help' },
  { _id: '5', title: 'The Psychology of Money', author: 'Morgan Housel', price: 21, image: 'https://covers.openlibrary.org/b/id/12558501-L.jpg', genre: 'Finance' }
];

function App() {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('home'); 
  const [authMode, setAuthMode] = useState('login'); 
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
  // Use the Netlify URL if live, or localhost if testing
  const apiUrl = import.meta.env.PROD ? '/api/books' : 'http://localhost:5000/api/books';
  
  axios.get(apiUrl)
    .then(res => {
      // CRITICAL FIX: Ensure the data is actually an array before setting state
      if (Array.isArray(res.data)) {
        setBooks(res.data);
      } else {
        console.error("API did not return an array:", res.data);
        setBooks(EXAMPLE_BOOKS); // Fallback to your example books
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setBooks(EXAMPLE_BOOKS); // Fallback so the app doesn't crash
    });
};

  const handleNavigate = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (book) => {
    setWishlist(prev => prev.find(i => i._id === book._id) ? prev.filter(i => i._id !== book._id) : [...prev, book]);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) || 
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar 
        user={user} 
        onLogout={() => { setUser(null); setView('home'); }}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => handleNavigate('home')}
        onShopClick={() => handleNavigate('shop')}
        onWishlistClick={() => handleNavigate('wishlist')}
        onDashboardClick={() => handleNavigate('dashboard')} // Triggers Admin View
        onUserClick={() => { setView('login'); setAuthMode('login'); }}
        search={search}
        setSearch={setSearch}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onCheckoutClick={() => { setView('checkout'); setIsCartOpen(false); }}
      />

      {/* --- DYNAMIC VIEW ROUTING --- */}
      {view === 'login' ? (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {authMode === 'login' ? (
            <div style={authCardStyle}>
              <h2 style={{fontWeight: '900', marginBottom: '20px'}}>Sign In</h2>
              <form onSubmit={(e) => { e.preventDefault(); setUser({email: e.target[0].value}); setView('home'); }}>
                <input type="email" placeholder="Email" required style={inputStyle} />
                <input type="password" placeholder="Password" required style={inputStyle} />
                <button type="submit" style={btnStyle}>Login</button>
              </form>
              <p onClick={() => setAuthMode('register')} style={{marginTop: '20px', cursor: 'pointer', color: '#ff4757', fontWeight: 'bold'}}>Create an account</p>
            </div>
          ) : <Register onBack={() => setAuthMode('login')} />}
        </div>
      ) : view === 'checkout' ? (
        <CheckoutPage cart={cart} onBack={() => setView('shop')} />
      ) : view === 'dashboard' ? (
        <div style={{ padding: '100px 5% 40px' }}>
          <AdminDashboard />
          <div style={{marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '40px'}}>
            <h2 style={{fontWeight: '900', marginBottom: '20px'}}>Add New Inventory</h2>
            <AddBook onBookAdded={() => { fetchBooks(); setView('shop'); }} />
          </div>
        </div>
      ) : (
        <>
          {view === 'home' && <Hero onShopClick={() => handleNavigate('shop')} />}
          
          <div style={{ padding: '60px 5%' }}>
            <h2 style={{fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', marginBottom: '30px'}}>
              {view === 'wishlist' ? 'My Wishlist ❤️' : 'Our Collection'}
            </h2>
            
            {/* RESPONSIVE GRID */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
              gap: '20px' 
            }}>
              {(view === 'wishlist' ? wishlist : filteredBooks).map(book => (
                <BookCard 
                  key={book._id} 
                  book={book} 
                  onAddToCart={() => setCart([...cart, book])}
                  onWishlistToggle={() => toggleWishlist(book)}
                  isWishlisted={wishlist.some(i => i._id === book._id)}
                  onOpenQuickView={() => setSelectedBook(book)}
                />
              ))}
            </div>
            {view === 'wishlist' && wishlist.length === 0 && (
              <p style={{textAlign: 'center', padding: '50px', color: '#888'}}>Your wishlist is empty.</p>
            )}
          </div>

          {view === 'home' && <Stats />}
          <Reviews />
        </>
      )}

      {selectedBook && (
        <QuickView 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onAddToCart={() => { setCart([...cart, selectedBook]); setSelectedBook(null); }} 
        />
      )}
    </div>
  );
}

// --- SHARED STYLES ---
const authCardStyle = { background: '#f8f9fa', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' };
const inputStyle = { display: 'block', margin: '10px auto', padding: '12px', width: '100%', boxSizing: 'border-box', borderRadius: '10px', border: '1px solid #ddd' };
const btnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '12px 40px', width: '100%', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };

export default App;