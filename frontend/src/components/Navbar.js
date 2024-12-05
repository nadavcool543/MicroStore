import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import './Navbar.css';

function Navbar() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">MicroStore</span>
        </Link>
        <SearchBar />
        <div className="navbar-links">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          <Link to="/cart" className="nav-link cart">
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 