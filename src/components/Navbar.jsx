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
  onUserClick 
}) => {

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={logoStyle} onClick={onHomeClick}>
        Book<span style={{ color: '#ff4757' }}>Haven</span>
      </div>

      {/* Liens de Navigation */}
      <div style={linksContainer}>
        <span style={linkItem} onClick={onHomeClick}>Home</span>
        <span style={linkItem} onClick={onShopClick}>Shop</span>
        <span style={linkItem} onClick={onWishlistClick}>
          Wishlist {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
        </span>
      </div>

      {/* Barre de Recherche */}
      <div style={searchWrapper}>
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Actions (Panier & Utilisateur) */}
      <div style={actionsStyle}>
        {/* Icône Panier */}
        <div style={iconBadgeWrapper} onClick={onCartClick}>
          <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🛒</span>
          {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
        </div>

        {/* Section Utilisateur Dynamique */}
        <div style={userSectionStyle}>
          {user ? (
            <div style={userInfoWrapper}>
              <div style={userAvatarStyle}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div style={userDetailsStyle}>
                <span style={emailTextStyle}>{user.email}</span>
                <span onClick={onLogout} style={logoutButtonStyle}>Logout</span>
              </div>
            </div>
          ) : (
            <div onClick={onUserClick} style={loginTriggerStyle}>
              <span style={{ fontSize: '1.5rem' }}>👤</span>
              <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>Login</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- STYLES (Objets JavaScript) ---

const navStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '20px 8%', background: '#ffffff',
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
  boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
};

const logoStyle = { fontSize: '1.8rem', fontWeight: '900', cursor: 'pointer', letterSpacing: '-1px' };

const linksContainer = { display: 'flex', gap: '30px', fontWeight: '700' };

const linkItem = { cursor: 'pointer', fontSize: '0.95rem', position: 'relative' };

const badgeStyle = {
  background: '#ff4757', color: 'white', fontSize: '0.7rem',
  padding: '2px 6px', borderRadius: '10px', marginLeft: '5px'
};

const searchWrapper = { flex: 0.6, margin: '0 40px' };

const searchInputStyle = {
  width: '100%', padding: '12px 20px', borderRadius: '15px',
  border: '1px solid #f1f2f6', background: '#f8f9fa', outline: 'none'
};

const actionsStyle = { display: 'flex', alignItems: 'center', gap: '25px' };

const iconBadgeWrapper = { position: 'relative', cursor: 'pointer' };

const cartBadgeStyle = {
  position: 'absolute', top: '-5px', right: '-10px',
  background: '#1a1a1a', color: 'white', fontSize: '0.7rem',
  width: '20px', height: '20px', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
};

const userSectionStyle = { borderLeft: '1px solid #eee', paddingLeft: '20px' };

const userInfoWrapper = { display: 'flex', alignItems: 'center', gap: '10px' };

const userAvatarStyle = {
  width: '35px', height: '35px', background: '#ff4757', color: 'white',
  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontWeight: 'bold', fontSize: '0.9rem'
};

const userDetailsStyle = { display: 'flex', flexDirection: 'column' };

const emailTextStyle = { fontSize: '0.8rem', fontWeight: '700', color: '#2f3542' };

const logoutButtonStyle = {
  fontSize: '0.7rem', color: '#ff4757', cursor: 'pointer',
  textDecoration: 'underline', fontWeight: 'bold'
};

const loginTriggerStyle = {
  display: 'flex', alignItems: 'center', cursor: 'pointer',
  padding: '8px 15px', background: '#f1f2f6', borderRadius: '12px'
};

export default Navbar;