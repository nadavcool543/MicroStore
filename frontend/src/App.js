import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import './App.css';
import { withProfiler } from "@sentry/react";
import { Routes } from './Routes';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default withProfiler(App); 