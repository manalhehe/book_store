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
import Register from './components/Register';

// FIXED: 10 stable image links from OpenLibrary to resolve 404 console errors
const EXAMPLE_BOOKS = [
  { _id: '1', title: 'The 48 Laws of Power', author: 'Robert Greene', price: 26, image: 'https://covers.openlibrary.org/b/id/8225266-L.jpg', genre: 'Philosophy' },
  { _id: '2', title: 'Ikigai', author: 'Héctor García', price: 18, image: 'https://covers.openlibrary.org/b/id/12711613-L.jpg', genre: 'Self-Help' },
  { _id: '3', title: 'The Housemaid', author: 'Freida McFadden', price: 14, image: 'https://covers.openlibrary.org/b/id/12913958-L.jpg', genre: 'Thriller' },
  { _id: '4', title: 'L\'Alchimiste', author: 'Paulo Coelho', price: 10, image: 'https://covers.openlibrary.org/b/id/12725455-L.jpg', genre: 'Fiction' },
  { _id: '5', title: 'Atomic Habits', author: 'James Clear', price: 22, image: 'https://covers.openlibrary.org/b/id/12884200-L.jpg', genre: 'Self-Help' },
  { _id: '6', title: 'Project Hail Mary', author: 'Andy Weir', price: 22, image: 'https://covers.openlibrary.org/b/id/10636294-L.jpg', genre: 'Sci-Fi' },
  { _id: '7', title: 'The Silent Patient', author: 'Alex Michaelides', price: 18, image: 'https://covers.openlibrary.org/b/id/12613143-L.jpg', genre: 'Mystery' },
  { _id: '8', title: 'Deep Work', author: 'Cal Newport', price: 25, image: 'https://covers.openlibrary.org/b/id/12630132-L.jpg', genre: 'Business' },
  { _id: '9', title: 'Yellowface', author: 'R.F. Kuang', price: 22, image: 'https://covers.openlibrary.org/b/id/13401550-L.jpg', genre: 'Fiction' },
  { _id: '10', title: 'The Psychology of Money', author: 'Morgan Housel', price: 21, image: 'https://covers.openlibrary.org/b/id/12558501-L.jpg', genre: 'Finance' }
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
    // Fetches your 100 injected books from the server
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data.length > 0 ? res.data : EXAMPLE_BOOKS))
      .catch(() => setBooks(EXAMPLE_BOOKS));
  };

  const toggleWishlist = (book) => {
    setWishlist(prev => prev.find(i => i._id === book._id) ? prev.filter(i => i._id !== book._id) : [...prev, book]);
  };

  const handleNavigate = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search logic to find any of your 100 books
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) || 
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <Navbar 
        user={user} 
        onLogout={() => setUser(null)}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => handleNavigate('home')}
        onShopClick={() => handleNavigate('shop')}
        onWishlistClick={() => handleNavigate('wishlist')}
        onUserClick={() => { setView('login'); setAuthMode('login'); }}
        search={search}
        setSearch={setSearch}
      />

      {/* FIXED: Added onCheckoutClick to bring back the checkout view */}
          <CartSidebar 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)} 
      cartItems={cart} 
      onCheckoutClick={() => {
        setView('checkout'); // Change la vue vers CheckoutPage
        setIsCartOpen(false); // Ferme la barre latérale
      }}
    />

      {/* --- DYNAMIC VIEW ROUTING --- */}
      {view === 'login' ? (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {authMode === 'login' ? (
            <div style={{ background: '#f8f9fa', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <h2 style={{fontWeight: '900', marginBottom: '20px'}}>Sign In</h2>
              <form onSubmit={(e) => { e.preventDefault(); setUser({email: e.target[0].value}); setView('home'); }}>
                <input type="email" placeholder="Email" required style={inputStyle} />
                <input type="password" placeholder="Password" required style={inputStyle} />
                <button type="submit" style={btnStyle}>Login</button>
              </form>
              <p onClick={() => setAuthMode('register')} style={{marginTop: '20px', cursor: 'pointer', color: '#ff4757', fontWeight: 'bold'}}>Create an account</p>
            </div>
          ) : (
            <Register onBack={() => setAuthMode('login')} />
          )}
        </div>
      ) : view === 'checkout' ? (
        <CheckoutPage cart={cart} onBack={() => setView('shop')} />
      ) : (
        <>
          {view === 'home' && <Hero onShopClick={() => handleNavigate('shop')} />}
          {view === 'home' && <Brands />}
          
          <div style={{ padding: '80px 8%' }}>
            <h2 style={{fontSize: '3rem', fontWeight: '900', marginBottom: '40px'}}>
              {view === 'wishlist' ? 'My Wishlist' : 'Our Collection'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
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
        <p>© 2026 BookHaven Store. Server active on Port 5000.</p>
      </footer>
    </div>
  );
}

const inputStyle = { display: 'block', margin: '10px auto', padding: '12px', width: '280px', borderRadius: '10px', border: '1px solid #ddd' };
const btnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };

export default App;