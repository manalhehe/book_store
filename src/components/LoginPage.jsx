import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h1>{isLogin ? 'Welcome Back' : 'Join Us'}</h1>
        <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }} style={loginStyles.form}>
          <input type="email" placeholder="Email" style={loginStyles.input} required />
          <input type="password" placeholder="Password" style={loginStyles.input} required />
          <button type="submit" style={loginStyles.button}>{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: '#ff4757', marginTop: '15px' }}>
          {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
        </p>
      </div>
    </div>
  );
};

const loginStyles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
  card: { background: '#fff', padding: '50px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '15px', borderRadius: '10px', border: '1px solid #ddd', width: '300px' },
  button: { padding: '15px', borderRadius: '10px', background: '#1a1a1a', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
};

export default LoginPage;