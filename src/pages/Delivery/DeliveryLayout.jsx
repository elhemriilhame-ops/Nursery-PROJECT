import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  User,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('deliveryDarkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('deliveryDarkMode', isDarkMode);
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
    { name: 'Live Map', icon: Map, path: '/delivery' },
    { name: 'Available Orders', icon: Package, path: '/delivery/available' },
    { name: 'My Active Routes', icon: Navigation, path: '/delivery/active' },
    { name: 'Completed', icon: CheckSquare, path: '/delivery/completed' },
    { name: 'Earnings History', icon: History, path: '/delivery/earnings' },
    { name: 'Settings', icon: Settings, path: '/delivery/settings' },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Delivery';

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#090909] text-white' : 'bg-[#F8F9FA] text-slate-900'}`}>
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 88,
          x: 0 
        }}
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col overflow-hidden border-r shadow-2xl
          ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black/40' : 'bg-white border-slate-100 shadow-black/5'}`}
      >
        <div className="h-24 flex items-center px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
              <Navigation size={26} fill="white" />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className={`text-2xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Track & Go</span>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-400'}`}>Carrier Portal</p>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group
                ${isActive
                  ? `${isDarkMode ? 'bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]' : 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'} font-bold`
                  : `${isDarkMode ? 'text-[#CBD5E1] hover:bg-white/5' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
              `}
              end={item.path === '/delivery'}
            >
              <item.icon size={22} className={`shrink-0 transition-transform group-hover:scale-110 ${isSidebarOpen ? '' : 'mx-auto'}`} />
              {isSidebarOpen && <span className="text-[15px] font-black">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={`p-6 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl w-full transition-all group overflow-hidden
              ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'}`}
          >
            <LogOut size={22} className={`shrink-0 group-hover:-translate-x-1 transition-transform ${isSidebarOpen ? '' : 'mx-auto'}`} />
            {isSidebarOpen && <span className="font-black text-[15px]">Go Offline</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 flex flex-col ${isSidebarOpen ? 'pl-[280px]' : 'pl-[88px]'} w-full`}>
        <header className={`h-24 transition-all duration-300 border-b flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 backdrop-blur-xl
          ${isDarkMode ? 'bg-[#090909]/80 border-white/5' : 'bg-[#F8F9FA]/80 border-slate-100'}`}>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-3 rounded-2xl transition-all shadow-sm border
                ${isDarkMode ? 'bg-[#141414] border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              <Menu size={22} />
            </button>

            <div className={`hidden lg:flex items-center gap-4 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Logistics</span>
              <ChevronRight size={14} />
              <span className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activePage}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-2xl transition-all border
                ${isDarkMode ? 'bg-blue-400/10 border-blue-400/20 text-blue-400' : 'bg-white border-slate-100 text-slate-800 shadow-sm'}`}
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border transition-all
               ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Connected</span>
            </div>
            
            <div className={`flex items-center gap-4 pl-4 border-l ml-2 ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="hidden sm:block text-right">
                <p className={`text-[13px] font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fast Carrier</p>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-1.5 opacity-80 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Van Unit 04</p>
              </div>
              <div className={`w-11 h-11 rounded-2xl p-1 border group cursor-pointer transition-all shrink-0
                ${isDarkMode ? 'bg-[#141414] border-white/10 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-600'}`}>
                <div className="w-full h-full rounded-xl bg-blue-500/10 overflow-hidden flex items-center justify-center">
                   <User size={22} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow p-6 lg:p-10 max-w-[1680px] mx-auto w-full">
           <Outlet context={{ isDarkMode }} />
        </div>
      </main>
    </div>
  );
};

export default DeliveryLayout;
