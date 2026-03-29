import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Menu,
  LogOut, 
  Map, 
  Package, 
  CheckSquare, 
  History, 
  Settings,
  Navigation,
  Bell,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Live Map', icon: Map, path: '/delivery' },
    { name: 'Available Orders', icon: Package, path: '/delivery/available' },
    { name: 'My Active Routes', icon: Navigation, path: '/delivery/active' },
    { name: 'Completed', icon: CheckSquare, path: '/delivery/completed' },
    { name: 'Earnings History', icon: History, path: '/delivery/earnings' },
    { name: 'Settings', icon: Settings, path: '/delivery/settings' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
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
            bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-50 overflow-hidden shadow-2xl shadow-blue-500/5
          `}
        >
          <div className="p-8 flex items-center justify-between border-b border-slate-100">
            {(isSidebarOpen || window.innerWidth < 1024) ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/40">
                  <Navigation size={22} fill="currentColor" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-blue-600">Track & Go</span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 mx-auto">
                 <Navigation size={24} fill="currentColor" />
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
                    ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)]' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}
                `}
                end={item.path === '/delivery'}
              >
                <div className={`${isSidebarOpen ? '' : 'mx-auto'} transition-transform group-hover:scale-110`}>
                   <item.icon size={22} strokeWidth={2} />
                </div>
                {isSidebarOpen && <span className="font-bold text-[14px]">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-200">
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-4 px-4 py-3.5 text-red-500/80 hover:bg-red-50 hover:text-red-600 rounded-2xl w-full transition-all group`}
            >
              <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
              {isSidebarOpen && <span className="font-bold text-[14px]">Go Offline</span>}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      <main className={`${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'} ml-0 flex-grow transition-all duration-300 bg-slate-50 w-full overflow-hidden flex flex-col`}>
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-30 shadow-sm shadow-blue-900/5">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white hover:bg-blue-50 rounded-2xl text-blue-600 transition-all shadow-sm border border-blue-100"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Receiving Locations</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[15px] font-bold text-slate-800 tracking-tight">Fast Track Carrier</p>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest leading-none">Vehicle: Van</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white p-1 border-2 border-blue-100 shadow-lg shadow-blue-900/10 group cursor-pointer hover:border-blue-300 transition-all shrink-0">
                <div className="w-full h-full rounded-xl bg-blue-50 overflow-hidden flex items-center justify-center">
                   <User size={20} className="text-blue-600 lg:w-6 lg:h-6" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-6rem)] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DeliveryLayout;
