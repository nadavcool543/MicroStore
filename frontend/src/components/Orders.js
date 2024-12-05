import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#f1c40f',
      PROCESSING: '#3498db',
      SHIPPED: '#2ecc71',
      DELIVERED: '#27ae60'
    };
    return colors[status] || '#7f8c8d';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-container">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h2>Order #{order.id.slice(-8)}</h2>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              <div 
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status}
              </div>
            </div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <div className="order-total">
                <span>Total:</span>
                <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
              </div>
              {order.trackingNumber && (
                <div className="tracking-info">
                  <span>Tracking Number:</span>
                  <span className="tracking-number">{order.trackingNumber}</span>
                </div>
              )}
              <div className="payment-method">
                <span>Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders; 