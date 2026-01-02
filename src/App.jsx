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
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';

const EXAMPLE_BOOKS = [
  { _id: '1', title: 'The 48 Laws of Power', author: 'Robert Greene', price: 26, image: 'https://covers.openlibrary.org/b/id/8225266-L.jpg', genre: 'Philosophy' },
  { _id: '5', title: 'Atomic Habits', author: 'James Clear', price: 22, image: 'https://covers.openlibrary.org/b/id/12884200-L.jpg', genre: 'Self-Help' }
];

function App() {
  // --- PERSISTENCE LOGIC (LocalStorage) ---
  const [view, setView] = useState(() => localStorage.getItem('book_view') || 'home');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('book_user')) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('book_cart')) || []);
  
  const [books, setBooks] = useState([]);
  const [authMode, setAuthMode] = useState('login'); 
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // --- SAVE TO LOCALSTORAGE ON CHANGE ---
  useEffect(() => { localStorage.setItem('book_view', view); }, [view]);
  useEffect(() => { localStorage.setItem('book_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('book_cart', JSON.stringify(cart)); }, [cart]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data.length > 0 ? res.data : EXAMPLE_BOOKS))
      .catch(() => setBooks(EXAMPLE_BOOKS));
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    localStorage.clear();
  };

  const handleNavigate = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) || 
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => handleNavigate('home')}
        onShopClick={() => handleNavigate('shop')}
        onWishlistClick={() => handleNavigate('wishlist')}
        onUserClick={() => { setView('login'); setAuthMode('login'); }}
        onAdminClick={() => setView('admin')} // Optional Admin link
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
      {view === 'admin' ? (
        <AdminDashboard />
      ) : view === 'login' && !user ? (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {authMode === 'login' ? (
            <div style={loginBoxStyle}>
              <h2 style={{fontWeight: '900', marginBottom: '20px'}}>Sign In</h2>
              <form onSubmit={(e) => { e.preventDefault(); setUser({email: e.target[0].value}); setView('home'); }}>
                <input type="email" placeholder="Email" required style={inputStyle} />
                <input type="password" placeholder="Password" required style={inputStyle} />
                <button type="submit" style={btnStyle}>Login</button>
              </form>
              <p onClick={() => setAuthMode('register')} style={switchLinkStyle}>Create an account</p>
            </div>
          ) : (
            <Register onBack={() => setAuthMode('login')} />
          )}
        </div>
      ) : view === 'checkout' ? (
        <CheckoutPage cart={cart} onBack={() => setView('shop')} setCart={setCart} />
      ) : (
        <>
          {view === 'home' && <Hero onShopClick={() => handleNavigate('shop')} />}
          {view === 'home' && <Brands />}
          
          <div style={{ padding: '80px 8%' }}>
            <h2 style={{fontSize: '3rem', fontWeight: '900', marginBottom: '40px'}}>
              {view === 'wishlist' ? 'My Wishlist' : 'Our Collection'}
            </h2>
            <div style={gridStyle}>
              {(view === 'wishlist' ? wishlist : filteredBooks).map(book => (
                <BookCard 
                  key={book._id} 
                  book={book} 
                  onAddToCart={() => setCart([...cart, book])}
                  onWishlistToggle={() => {}} // Add wishlist logic if needed
                  isWishlisted={wishlist.some(i => i._id === book._id)}
                  onOpenQuickView={() => setSelectedBook(book)}
                />
              ))}
            </div>
          </div>

          {view === 'home' && <Stats />}
          {view === 'home' && <Categories onCategorySelect={() => handleNavigate('shop')} />}
          <Reviews />
          <Newsletter />
        </>
      )}

      {selectedBook && (
        <QuickView 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onAddToCart={() => { setCart([...cart, selectedBook]); setSelectedBook(null); }} 
        />
      )}

      <footer style={{ padding: '60px', background: '#0a0a0a', color: 'white', textAlign: 'center' }}>
        <p>© 2026 BookHaven Store. All data saved to Database & Browser LocalStorage.</p>
        <button onClick={() => setView('admin')} style={{color: '#444', background: 'none', border: 'none', marginTop: '10px', cursor: 'pointer'}}>Admin Access</button>
      </footer>
    </div>
  );
}

// Styles
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' };
const inputStyle = { display: 'block', margin: '10px auto', padding: '12px', width: '280px', borderRadius: '10px', border: '1px solid #ddd' };
const btnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };
const loginBoxStyle = { background: '#f8f9fa', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' };
const switchLinkStyle = { marginTop: '20px', cursor: 'pointer', color: '#ff4757', fontWeight: 'bold' };

export default App;