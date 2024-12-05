import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map(product => product.category))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-page">
      <div className="hero-section">
        <h1>Welcome to MicroStore</h1>
        <p>Discover the latest in tech innovation</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="products-container">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <div className="product-image-container">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="product-image"
                  />
                  {product.stockQuantity < 10 && (
                    <span className="low-stock">Low Stock</span>
                  )}
                </div>
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-name">
                  <h3>{product.name}</h3>
                </Link>
                <div className="product-meta">
                  <div className="price">${product.price.toFixed(2)}</div>
                  <div className="rating">
                    {'★'.repeat(Math.floor(product.rating || 4))}
                    {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                </div>
                <button 
                  className="add-to-cart"
                  disabled={product.stockQuantity === 0}
                  onClick={() => addToCart(product)}
                >
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products; 