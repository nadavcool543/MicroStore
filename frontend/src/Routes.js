import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Products from './components/Products';
import Orders from './components/Orders';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </RouterRoutes>
  );
} 