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
import Customers from './pages/Admin/Customers';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPath = location.pathname === '/login' || location.pathname === '/register';
  const isMinimalLayout = isAdminPath || isAuthPath;

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
            <Route path="products" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Gestion Catalogue (À venir)</div>} />
            <Route path="sellers" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Nos Pépiniéristes (À venir)</div>} />
            <Route path="orders" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Historique Commandes (À venir)</div>} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<div className="p-20 text-center font-serif text-3xl italic text-sage opacity-40 uppercase tracking-[0.2em] border border-sage/5 rounded-[3rem] m-10 bg-sage/5">Configuration Système (À venir)</div>} />
          </Route>

          <Route path="*" element={<div className="pt-40 text-center h-screen font-serif text-3xl italic text-sage opacity-40">Floraison en cours... (Bientôt disponible)</div>} />
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
