import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Guides from './pages/Guides/Guides';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import Customers from './pages/Admin/Customers';
import Deliveries from './pages/Admin/Deliveries';

import SellerLayout from './pages/Seller/SellerLayout';
import SellerDashboard from './pages/Seller/SellerDashboard';
import SellerProductManagement from './pages/Seller/SellerProductManagement';
import SellerOrders from './pages/Seller/SellerOrders';

import DeliveryLayout from './pages/Delivery/DeliveryLayout';
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isSellerPath = location.pathname.startsWith('/seller');
  const isDeliveryPath = location.pathname.startsWith('/delivery');
  const isAuthPath = location.pathname === '/login' || location.pathname === '/register';
  const isMinimalLayout = isAdminPath || isSellerPath || isDeliveryPath || isAuthPath;

  return (
    <div className="flex flex-col min-h-screen selection:bg-sage/20 selection:text-sage">
      {!isMinimalLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="sellers" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Our Sellers (Coming Soon)</div>} />
            <Route path="orders" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Order History (Coming Soon)</div>} />
            <Route path="deliveries" element={<Deliveries />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">System Configuration (Coming Soon)</div>} />
          </Route>

          {/* Seller Dashboard Routes */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProductManagement />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="invoices" element={<div className="p-20 text-center font-serif text-3xl italic text-amber-600 opacity-40 uppercase tracking-[0.2em] border border-amber-600/5 rounded-[3rem] m-10 bg-amber-600/5">Invoices & Fees (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-20 text-center font-serif text-3xl italic text-amber-600 opacity-40 uppercase tracking-[0.2em] border border-amber-600/5 rounded-[3rem] m-10 bg-amber-600/5">Store Settings (Coming Soon)</div>} />
          </Route>

          {/* Delivery Dashboard Routes */}
          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route index element={<DeliveryDashboard />} />
            <Route path="available" element={<div className="p-20 text-center font-serif text-3xl italic text-blue-600 opacity-40 uppercase tracking-[0.2em] border border-blue-600/5 rounded-[3rem] m-10 bg-blue-600/5">Available Radar (Coming Soon)</div>} />
            <Route path="active" element={<div className="p-20 text-center font-serif text-3xl italic text-blue-600 opacity-40 uppercase tracking-[0.2em] border border-blue-600/5 rounded-[3rem] m-10 bg-blue-600/5">Active Navigations (Coming Soon)</div>} />
            <Route path="completed" element={<div className="p-20 text-center font-serif text-3xl italic text-blue-600 opacity-40 uppercase tracking-[0.2em] border border-blue-600/5 rounded-[3rem] m-10 bg-blue-600/5">Completed Runs (Coming Soon)</div>} />
            <Route path="earnings" element={<div className="p-20 text-center font-serif text-3xl italic text-blue-600 opacity-40 uppercase tracking-[0.2em] border border-blue-600/5 rounded-[3rem] m-10 bg-blue-600/5">Earnings History (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-20 text-center font-serif text-3xl italic text-blue-600 opacity-40 uppercase tracking-[0.2em] border border-blue-600/5 rounded-[3rem] m-10 bg-blue-600/5">Profile Settings (Coming Soon)</div>} />
          </Route>

          <Route path="*" element={<div className="pt-40 text-center h-screen font-serif text-3xl italic text-sage opacity-40">Blooming in progress... (Coming Soon)</div>} />
        </Routes>
      </main>
      {!isMinimalLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
