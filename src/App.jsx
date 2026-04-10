import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Guides from './pages/Guides/Guides';
import GuideDetail from './pages/Guides/GuideDetail';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import Customers from './pages/Admin/Customers';
import Deliveries from './pages/Admin/Deliveries';
import AdminSellers from './pages/Admin/AdminSellers';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminReviews from './pages/Admin/AdminReviews';

import SellerLayout from './pages/Seller/SellerLayout';
import SellerDashboard from './pages/Seller/SellerDashboard';
import SellerProductManagement from './pages/Seller/SellerProductManagement';
import SellerOrders from './pages/Seller/SellerOrders';
import SellerInvoices from './pages/Seller/SellerInvoices';
import SellerSettings from './pages/Seller/SellerSettings';

import DeliveryLayout from './pages/Delivery/DeliveryLayout';
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard';
import DeliveryAvailable from './pages/Delivery/DeliveryAvailable';
import DeliveryActive from './pages/Delivery/DeliveryActive';
import DeliveryCompleted from './pages/Delivery/DeliveryCompleted';
import DeliveryEarnings from './pages/Delivery/DeliveryEarnings';
import DeliverySettings from './pages/Delivery/DeliverySettings';

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
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="sellers" element={<AdminSellers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="deliveries" element={<Deliveries />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* Seller Dashboard Routes */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProductManagement />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="invoices" element={<SellerInvoices />} />
            <Route path="settings" element={<SellerSettings />} />
          </Route>

          {/* Delivery Dashboard Routes */}
          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route index element={<DeliveryDashboard />} />
            <Route path="available" element={<DeliveryAvailable />} />
            <Route path="active" element={<DeliveryActive />} />
            <Route path="completed" element={<DeliveryCompleted />} />
            <Route path="earnings" element={<DeliveryEarnings />} />
            <Route path="settings" element={<DeliverySettings />} />
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
