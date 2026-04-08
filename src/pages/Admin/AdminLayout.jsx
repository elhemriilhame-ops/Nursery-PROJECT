import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ShieldCheck,
  Store,
  User,
  Truck,
  Sun,
  Moon,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('adminDarkMode');
    return saved === 'true';
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('adminDarkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#090909';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FA';
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/admin' },
    { name: 'Catalogue', icon: Package, path: '/admin/products' },
    { name: 'Sellers', icon: Store, path: '/admin/sellers' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Deliveries', icon: Truck, path: '/admin/deliveries' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', type: 'order', icon: ShoppingCart, color: 'text-sage bg-sage/10' },
    { id: 2, title: 'New customer registered', time: '1 hour ago', type: 'user', icon: User, color: 'text-blue-500 bg-blue-500/10' },
    { id: 3, title: 'Delivery update', time: '2 hours ago', type: 'delivery', icon: Truck, color: 'text-amber-500 bg-amber-500/10' },
    { id: 4, title: 'System update', time: 'Yesterday', type: 'info', icon: Info, color: 'text-purple-500 bg-purple-500/10' },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Admin';

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#090909] text-white' : 'bg-[#F8F9FA] text-slate-900'}`}>
      
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {!isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 88,
          x: 0 
        }}
        className={`fixed top-0 left-0 h-full z-50 transition-colors duration-300 flex flex-col overflow-hidden border-r shadow-2xl
          ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100 shadow-black/5'}`}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sage rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sage/30 shrink-0">
              <ShieldCheck size={28} />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-2xl font-serif font-black tracking-tight text-sage">Garden</span>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-400'}`}>SaaS Central</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group
                ${isActive
                  ? `${isDarkMode ? 'bg-[#F43F5E] text-white shadow-[0_4px_20px_rgba(244,63,94,0.4)]' : 'bg-sage text-white shadow-xl shadow-sage/20'} font-bold`
                  : `${isDarkMode ? 'text-[#CBD5E1] hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50 hover:text-sage'}`}
              `}
            >
              <item.icon size={22} className={`shrink-0 transition-transform group-hover:scale-110 ${isSidebarOpen ? '' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="text-[15px]">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-50 bg-slate-50/50'}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl w-full transition-all group font-bold text-red-500 hover:bg-red-500/10`}
          >
            <LogOut size={22} className={`shrink-0 group-hover:-translate-x-1 transition-transform ${isSidebarOpen ? '' : 'mx-auto'}`} />
            {isSidebarOpen && <span className="text-[15px]">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[88px]'} min-h-screen flex flex-col`}>
        
        {/* Header */}
        <header className={`h-24 sticky top-0 z-40 backdrop-blur-xl border-b flex items-center justify-between px-6 lg:px-10 transition-colors duration-300
          ${isDarkMode ? 'bg-[#090909]/80 border-white/5 shadow-black/20' : 'bg-white/80 border-slate-100 shadow-sm shadow-black/5'}`}>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-3 rounded-2xl transition-all border
                ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100 shadow-sm text-slate-600'}`}
            >
              <Menu size={22} />
            </button>

            <div className={`hidden lg:flex items-center gap-4 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Management</span>
              <ChevronRight size={14} />
              <span className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activePage}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            {/* Search (Desktop) */}
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sage transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className={`w-48 lg:w-72 pl-12 pr-6 py-3 rounded-2xl text-[13px] font-semibold border-none outline-none focus:ring-4 transition-all
                  ${isDarkMode ? 'bg-[#141414] focus:bg-[#1A1A1A] focus:ring-white/20 text-white placeholder:text-white/60' : 'bg-slate-50 focus:bg-white focus:ring-sage/5 text-slate-900 placeholder:text-slate-400'}`}
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 rounded-2xl transition-all relative
                  ${isDarkMode ? 'bg-white/5 text-white' : 'bg-white border border-slate-100 shadow-sm text-slate-800 hover:bg-slate-50'}`}
              >
                <Bell size={22} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/10 ring-offset-black transition-all" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-4 w-80 rounded-3xl shadow-2xl z-50 overflow-hidden border
                        ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
                    >
                      <div className="p-6 border-b border-slate-100/10 flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[9px] font-black rounded-full">4 NEW</span>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto px-2 py-2">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`flex gap-4 p-4 rounded-2xl hover:bg-slate-50/5 transition-all cursor-pointer group`}>
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                              <notif.icon size={20} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold truncate group-hover:text-sage transition-colors">{notif.title}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest hover:bg-sage/10 hover:text-sage transition-all border-t border-slate-100/10">View All Notifications</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-2xl transition-all
                ${isDarkMode ? 'bg-amber-400/10 text-amber-400' : 'bg-slate-100 text-slate-800 shadow-sm'}`}
            >
              {isDarkMode ? <Sun size={22} className="fill-amber-400/20" /> : <Moon size={22} className="fill-slate-900/20" />}
            </button>

            {/* User Profile */}
            <div className={`flex items-center gap-4 pl-4 border-l ml-2 ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="hidden sm:block text-right">
                <p className={`text-[13px] font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Admin System</p>
                <p className="text-[10px] text-sage font-black uppercase tracking-widest mt-1.5 opacity-80">Super Admin</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white p-1 border group cursor-pointer hover:border-sage transition-all shadow-xl shadow-black/5 ring-4 ring-sage/5 shrink-0">
                <div className="w-full h-full rounded-xl bg-sage/10 overflow-hidden flex items-center justify-center">
                  <User size={22} className="text-sage" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Area */}
        <div className="flex-grow p-6 lg:p-10 max-w-[1680px] mx-auto w-full">
          <Outlet context={{ isDarkMode }} />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
