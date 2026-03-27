import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic for simulation
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/admin' },
    { name: 'Catalogue', icon: Package, path: '/admin/products' },
    { name: 'Sellers', icon: Store, path: '/admin/sellers' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen text-charcoal font-sans">
      {/* Dynamic Sidebar */}
      <AnimatePresence mode='wait'>
        <motion.aside 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className={`${
            isSidebarOpen ? 'w-72' : 'w-24'
          } bg-white border-r border-[#EEEEEE] transition-all duration-500 flex flex-col fixed h-full z-50 overflow-hidden shadow-2xl shadow-sage/5`}
        >
          {/* Brand/Logo Section */}
          <div className="p-8 flex items-center justify-between">
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage/40">
                  <ShieldCheck size={24} />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-sage">Garden Admin</span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage/20 mx-auto">
                 <ShieldCheck size={24} />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow py-8 px-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-sage text-white shadow-[0_8px_20px_rgba(138,154,91,0.25)]' 
                    : 'text-slate-400 hover:text-sage hover:bg-sage/5'}
                `}
              >
                <div className={`${isSidebarOpen ? '' : 'mx-auto'} transition-transform group-hover:scale-110`}>
                   <item.icon size={22} strokeWidth={2} />
                </div>
                {isSidebarOpen && <span className="font-semibold text-[15px]">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Logout/Account Section at Bottom */}
          <div className="p-6 border-t border-[#EEEEEE]">
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-4 px-4 py-3.5 text-red-500/80 hover:bg-red-50 hover:text-red-600 rounded-2xl w-full transition-all group`}
            >
              <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
              {isSidebarOpen && <span className="font-bold text-[15px]">Logout</span>}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Container */}
      <main className={`${isSidebarOpen ? 'ml-72' : 'ml-24'} flex-grow transition-all duration-500 bg-[#FCFCFB]`}>
        {/* Superior Header */}
        <header className="h-24 bg-white/60 backdrop-blur-xl border-b border-[#EEEEEE] flex items-center justify-between px-10 sticky top-0 z-40 shadow-sm shadow-black/5">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-sage/10 rounded-2xl text-sage transition-all shadow-sm border border-sage/10"
            >
              <Menu size={22} />
            </button>
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage/60 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, customers..."
                className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-sage/5 focus:bg-white transition-all outline-none w-80 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-6 border-r border-[#EEEEEE]">
              <button className="relative p-3 text-slate-400 hover:text-sage transition-all hover:bg-sage/5 rounded-2xl">
                <Bell size={22} />
                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[15px] font-bold text-slate-800 tracking-tight">Admin System</p>
                <p className="text-[10px] text-sage font-bold uppercase tracking-widest leading-none">Full Access</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white p-1 border-2 border-sage/10 shadow-lg shadow-black/5 group cursor-pointer hover:border-sage/40 transition-all">
                <div className="w-full h-full rounded-xl bg-sage/5 overflow-hidden flex items-center justify-center">
                   <User size={24} className="text-sage" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Scroll-area */}
        <div className="p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-6rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
