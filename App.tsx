import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ProductManager from './components/dashboard/ProductManager';
import OrderManager from './components/dashboard/OrderManager';
import StoreCustomizer from './components/dashboard/StoreCustomizer';
import StorefrontLayout from './components/storefront/StorefrontLayout';
import StoreHome from './components/storefront/StoreHome';
import ProductDetails from './components/storefront/ProductDetails';
import Checkout from './components/storefront/Checkout';
import OrderConfirmation from './components/storefront/OrderConfirmation';
import AgeGate from './components/storefront/AgeGate';

const AppContent: React.FC = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('spiritflow_age_verified');
    if (isVerified) {
        setVerified(true);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="design" element={<StoreCustomizer />} />
          <Route path="customers" element={<div className="p-8">Customer Management Module</div>} />
          <Route path="analytics" element={<div className="p-8">Analytics Module</div>} />
          <Route path="settings" element={<div className="p-8">Settings Module</div>} />
        </Route>

        {/* Storefront Routes */}
        <Route path="/" element={
            !verified ? <AgeGate onVerify={() => setVerified(true)} /> : <StorefrontLayout />
        }>
            <Route index element={<StoreHome />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;