import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length >= 2) {
        try {
          const response = await axios.get('/api/products');
          const filteredProducts = response.data.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filteredProducts);
          setShowResults(true);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts([]);
        setShowResults(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/product/${productId}`);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      
      {showResults && products.length > 0 && (
        <div className="search-results">
          {products.map(product => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="search-result-image"
              />
              <div className="search-result-info">
                <div className="search-result-name">{product.name}</div>
                <div className="search-result-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && searchTerm.length >= 2 && products.length === 0 && (
        <div className="search-results">
          <div className="no-results">No products found</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar; 