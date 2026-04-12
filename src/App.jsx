import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import MyOrders from './pages/Orders/MyOrders';
import MyFavorites from './pages/Favorites/MyFavorites';

import CustomerLayout from './pages/Account/CustomerLayout';
import CustomerDashboard from './pages/Account/CustomerDashboard';
import CustomerOrders from './pages/Account/CustomerOrders';
import CustomerFavorites from './pages/Account/CustomerFavorites';
import CustomerProfile from './pages/Account/CustomerProfile';
import CustomerTracking from './pages/Account/CustomerTracking';

import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import Customers from './pages/Admin/Customers';
import Deliveries from './pages/Admin/Deliveries';
import AdminSellers from './pages/Admin/AdminSellers';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminReviews from './pages/Admin/AdminReviews';
import AdminComplaints from './pages/Admin/AdminComplaints';
import AdminEarnings from './pages/Admin/AdminEarnings';
import AdminRequests from './pages/Admin/AdminRequests';

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
          
          {/* Customer Account Routes */}
          <Route path="/account" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="tracking" element={<CustomerTracking />} />
            <Route path="reviews" element={<div className="font-serif italic text-3xl opacity-30">Your reviews history...</div>} />
            <Route path="favorites" element={<CustomerFavorites />} />
            <Route path="support" element={<div className="font-serif italic text-3xl opacity-30">Concierge support...</div>} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>
          
          <Route path="/my-orders" element={<Navigate to="/account/orders" replace />} />
          <Route path="/favorites" element={<Navigate to="/account/favorites" replace />} />
          
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
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="earnings" element={<AdminEarnings />} />
            <Route path="requests" element={<AdminRequests />} />
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
