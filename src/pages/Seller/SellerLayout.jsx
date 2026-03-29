import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Settings, 
  LogOut, 
  Bell, 
  Menu,
  Store,
  FileText,
  User,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/seller' },
    { name: 'My Products', icon: Package, path: '/seller/products' },
    { name: 'My Orders', icon: ShoppingBag, path: '/seller/orders' },
    { name: 'Invoices & Fees', icon: FileText, path: '/seller/invoices' },
    { name: 'Settings', icon: Settings, path: '/seller/settings' },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen text-charcoal font-sans">
      <AnimatePresence mode='wait'>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
        <motion.aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-24'}
            bg-white border-r border-[#EEEEEE] transition-all duration-300 flex flex-col fixed h-full z-50 overflow-hidden shadow-2xl shadow-sage/5
          `}
        >
          <div className="p-8 flex items-center justify-between">
            {(isSidebarOpen || window.innerWidth < 1024) ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-600/40">
                  <Store size={24} />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-amber-600">Pro Portal</span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-600/20 mx-auto">
                 <Store size={24} />
              </div>
            )}
          </div>

          <nav className="flex-grow py-8 px-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-amber-600 text-white shadow-[0_8px_20px_rgba(217,119,6,0.25)]' 
                    : 'text-slate-800 hover:text-amber-600 hover:bg-amber-50'}
                `}
                end={item.path === '/seller'}
              >
                <div className={`${isSidebarOpen ? '' : 'mx-auto'} transition-transform group-hover:scale-110`}>
                   <item.icon size={22} strokeWidth={2} />
                </div>
                {isSidebarOpen && <span className="font-semibold text-[15px]">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

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

      <main className={`${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'} ml-0 flex-grow transition-all duration-300 bg-[#FCFCFB] w-full overflow-hidden flex flex-col`}>
        <header className="h-24 bg-white/60 backdrop-blur-xl border-b border-[#EEEEEE] flex items-center justify-between px-4 lg:px-10 sticky top-0 z-30 shadow-sm shadow-black/5">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white hover:bg-amber-50 rounded-2xl text-amber-600 transition-all shadow-sm border border-amber-600/10"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3 pr-4 lg:pr-6 border-r border-[#EEEEEE] hidden sm:flex">
              <button className="relative p-3 text-slate-800 hover:text-amber-600 transition-all hover:bg-amber-50 rounded-2xl">
                <Bell size={22} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[15px] font-bold text-slate-800 tracking-tight">Nourplant</p>
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest leading-none">Verified Seller</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white p-1 border-2 border-amber-600/10 shadow-lg shadow-black/5 group cursor-pointer hover:border-amber-600/40 transition-all shrink-0">
                <div className="w-full h-full rounded-xl bg-amber-50 overflow-hidden flex items-center justify-center">
                   <User size={20} className="text-amber-600 lg:w-6 lg:h-6" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-6rem)] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
