import React from 'react';

const Navbar = ({ 
  user, 
  onLogout, 
  search, 
  setSearch, 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  onHomeClick, 
  onShopClick, 
  onWishlistClick, 
  onUserClick,
  onDashboardClick // ADDED: New prop for Dashboard
}) => {

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={logoStyle} onClick={onHomeClick}>
        Book<span style={{ color: '#ff4757' }}>Haven</span>
      </div>

      {/* Navigation Links */}
      <div style={linksContainer}>
        <span style={linkItem} onClick={onHomeClick}>Home</span>
        <span style={linkItem} onClick={onShopClick}>Shop</span>
        
        {/* ADMIN DASHBOARD BUTTON */}
        <span style={adminButtonStyle} onClick={onDashboardClick}>
          ⚙️ Admin
        </span>

        <span style={linkItem} onClick={onWishlistClick}>
          Wishlist {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
        </span>
      </div>

      {/* Search Bar - Hidden on very small screens to save space */}
      <div style={searchWrapper}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Actions (Cart & User) */}
      <div style={actionsStyle}>
        <div style={iconBadgeWrapper} onClick={onCartClick}>
          <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🛒</span>
          {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
        </div>

        <div style={userSectionStyle}>
          {user ? (
            <div style={userInfoWrapper}>
              <div style={userAvatarStyle}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div style={userDetailsStyle}>
                <span style={emailTextStyle}>{user.email.split('@')[0]}</span>
                <span onClick={onLogout} style={logoutButtonStyle}>Logout</span>
              </div>
            </div>
          ) : (
            <div onClick={onUserClick} style={loginTriggerStyle}>
              <span style={{ fontSize: '1.2rem' }}>👤</span>
              <span style={loginTextStyle}>Login</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- UPDATED STYLES FOR MOBILE RESPONSIVENESS ---

const navStyle = {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  padding: '15px 5%', // Reduced padding for mobile
  background: '#ffffff',
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  zIndex: 1000,
  boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
  flexWrap: 'wrap' // ALLOWS WRAPPING ON MOBILE
};

const logoStyle = { fontSize: '1.5rem', fontWeight: '900', cursor: 'pointer', letterSpacing: '-1px' };

const linksContainer = { 
  display: 'flex', 
  gap: '15px', 
  fontWeight: '700',
  fontSize: '0.85rem'
};

const linkItem = { cursor: 'pointer', position: 'relative' };

const adminButtonStyle = { 
  cursor: 'pointer', 
  color: '#6c5ce7', // Purple to stand out
  fontWeight: '800',
  display: 'flex',
  alignItems: 'center'
};

const badgeStyle = {
  background: '#ff4757', color: 'white', fontSize: '0.6rem',
  padding: '2px 5px', borderRadius: '10px'
};

const searchWrapper = { 
  flex: 1, 
  margin: '0 15px',
  minWidth: '150px' // Ensures it doesn't vanish
};

const searchInputStyle = {
  width: '100%', padding: '8px 15px', borderRadius: '10px',
  border: '1px solid #f1f2f6', background: '#f8f9fa', outline: 'none',
  fontSize: '0.9rem'
};

const actionsStyle = { display: 'flex', alignItems: 'center', gap: '15px' };

const iconBadgeWrapper = { position: 'relative', cursor: 'pointer' };

const cartBadgeStyle = {
  position: 'absolute', top: '-5px', right: '-10px',
  background: '#1a1a1a', color: 'white', fontSize: '0.6rem',
  width: '18px', height: '18px', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
};

const userSectionStyle = { borderLeft: '1px solid #eee', paddingLeft: '10px' };
const userInfoWrapper = { display: 'flex', alignItems: 'center', gap: '8px' };
const userAvatarStyle = {
  width: '30px', height: '30px', background: '#ff4757', color: 'white',
  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontWeight: 'bold', fontSize: '0.8rem'
};
const userDetailsStyle = { display: 'flex', flexDirection: 'column' };
const emailTextStyle = { fontSize: '0.7rem', fontWeight: '700', color: '#2f3542', maxWidth: '60px', overflow: 'hidden' };
const logoutButtonStyle = { fontSize: '0.6rem', color: '#ff4757', cursor: 'pointer', fontWeight: 'bold' };
const loginTriggerStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 10px', background: '#f1f2f6', borderRadius: '8px' };
const loginTextStyle = { fontWeight: 'bold', marginLeft: '5px', fontSize: '0.8rem' };

export default Navbar;