import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <i className="fas fa-arrow-left"></i> Back to Products
      </button>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <div className="rating">
              {'★'.repeat(Math.floor(product.rating || 4))}
              {'☆'.repeat(5 - Math.floor(product.rating || 4))}
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
            <div className="category">{product.category}</div>
          </div>
          <p className="description">{product.description}</p>
          <div className="price-stock">
            <div className="price">${product.price.toFixed(2)}</div>
            <div className={`stock ${product.stockQuantity < 10 ? 'low-stock' : ''}`}>
              {product.stockQuantity === 0 ? 'Out of Stock' :
               product.stockQuantity < 10 ? `Only ${product.stockQuantity} left!` :
               'In Stock'}
            </div>
          </div>
          <button 
            className="add-to-cart-btn"
            disabled={product.stockQuantity === 0}
            onClick={() => {
              addToCart(product);
              navigate('/cart');
            }}
          >
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 