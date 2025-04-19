import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import CatalogPage from './components/pages/CatalogPage';
import CatalogListPage from './components/pages/CatalogListPage';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/pages/CartPage';
import PaymentDeliveryPage from './components/pages/PaymentDeliveryPage';
import BirdsPage from './components/pages/BirdsPage';
import BirdDetailPage from './components/pages/BirdDetailPage';
import DonationPage from './components/pages/DonationPage';
import LoginPage from './components/pages/LoginPage';
import AboutPage from './components/pages/AboutPage';
import GrainsPage from './components/pages/GrainsPage';
import './scss/styles/app.scss';
import { useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);

  const handleOrderUpdate = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogListPage />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/catalog/grains" element={<GrainsPage />} />
        <Route path="/catalog/:category/:id" element={<ProductPage />} />
        <Route
          path="/cart"
          element={<CartPage onOrderUpdate={handleOrderUpdate} />}
        />
        <Route path="/payment-delivery" element={<PaymentDeliveryPage />} />
        <Route path="/birds" element={<BirdsPage />} />
        <Route path="/birds/:id" element={<BirdDetailPage />} />
        <Route path="/donations" element={<DonationPage />} />
        <Route path="/login" element={<LoginPage orders={orders} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/not-found" element={<div>Страница не найдена</div>} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
