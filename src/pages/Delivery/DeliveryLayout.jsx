import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu,
  LogOut, 
  Map as MapIcon, 
  Package, 
  ShoppingBag, 
  CheckSquare, 
  History,
  Settings,
  Bell,
  User,
  Sun,
  Moon,
  ChevronRight,
  Navigation,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const DeliveryLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Live Map', icon: MapIcon, path: '/delivery' },
    { name: 'Available Orders', icon: Package, path: '/delivery/available' },
    { name: 'My Active Routes', icon: Navigation, path: '/delivery/active' },
    { name: 'Completed', icon: CheckSquare, path: '/delivery/completed' },
    { name: 'Earnings History', icon: History, path: '/delivery/history' },
    { name: 'Settings', icon: Settings, path: '/delivery/settings' },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Delivery';

  return (
    <div className={cn(
      "flex min-h-screen font-sans transition-colors duration-500",
      isDarkMode ? "bg-[#050505] text-white" : "bg-[#F8F9FA] text-slate-900"
    )}>
      
      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-all duration-500 flex flex-col overflow-hidden border-r shadow-2xl",
          isDarkMode ? "bg-[#090909] border-white/5 shadow-black/40" : "bg-white border-slate-100 shadow-black/5"
        )}
      >
        <div className="h-24 flex items-center px-7">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 transition-all",
              isDarkMode ? "bg-blue-600 shadow-blue-600/20" : "bg-blue-600 shadow-blue-600/20"
            )}>
              <Truck size={22} strokeWidth={2} />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xl font-serif font-black tracking-tighter italic">Track & Go</span>
                <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] mt-0.5", isDarkMode ? "text-blue-400" : "text-blue-600")}>Carrier Portal</p>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-grow px-4 py-8 space-y-3 overflow-y-auto no-scrollbar flex flex-col">
          <div className="flex-grow space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-500 group
                  ${isActive
                    ? `${isDarkMode ? 'bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.3)]' : 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'} font-black`
                    : `${isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
                `}
                end={item.path === '/delivery'}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={cn("shrink-0 transition-transform group-hover:scale-110", !isSidebarOpen && "mx-auto")} />
                    {isSidebarOpen && <span className="text-[13px] font-black uppercase tracking-[0.2em]">{item.name}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Special Terminal Item: Logout */}
          <div className="pt-4 border-t border-white/5 mt-auto">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full transition-all group font-black uppercase tracking-widest text-[11px]
                ${isDarkMode ? 'text-rose-500 hover:bg-rose-500/10' : 'text-red-500 hover:bg-red-50'}`}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", isDarkMode ? "bg-rose-500/10" : "bg-red-50")}>
                <LogOut size={22} className={cn("shrink-0 group-hover:-translate-x-1 transition-transform", !isSidebarOpen && "mx-auto")} />
              </div>
              {isSidebarOpen && <span>Go Offline</span>}
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-grow transition-all duration-700 flex flex-col w-full",
        isSidebarOpen ? "pl-[280px]" : "pl-[88px]"
      )}>
        <header className={cn(
          "h-24 transition-all duration-700 border-b flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30 backdrop-blur-2xl",
          isDarkMode ? "bg-[#050505]/80 border-white/5 shadow-2xl shadow-black/20" : "bg-[#F8F9FA]/80 border-slate-100 shadow-sm"
        )}>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "p-3.5 rounded-2xl transition-all border",
                isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-100 text-slate-800 shadow-sm"
              )}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <div className={cn("hidden lg:flex items-center gap-6", isDarkMode ? "text-white/40" : "text-slate-400")}>
              <div className="flex items-center gap-3">
                 <div className={cn("w-2 h-2 rounded-full", isDarkMode ? "bg-emerald-500" : "bg-blue-500")} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Logistic Hub</span>
              </div>
              <ChevronRight size={14} className="opacity-20" />
              <span className={cn("text-[12px] font-black uppercase tracking-widest text-slate-900", isDarkMode && "text-white")}>{activePage}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-3.5 rounded-2xl transition-all border",
                isDarkMode ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_20px_#10b98122]" : "bg-white border-slate-100 text-slate-800 shadow-sm"
              )}
            >
              {isDarkMode ? <Sun size={22} strokeWidth={1.5} /> : <Moon size={22} strokeWidth={1.5} />}
            </button>

            <div className={cn("hidden sm:flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all duration-700", isDarkMode ? "bg-[#10b98115] border-[#10b98130]" : "bg-blue-50 border-blue-100")}>
               <div className={cn("w-2 h-2 rounded-full animate-pulse", isDarkMode ? "bg-emerald-500" : "bg-blue-600")} />
               <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", isDarkMode ? "text-emerald-500" : "text-blue-700")}>Authenticated</span>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l dark:border-white/5 border-slate-100 transition-all duration-700">
               <div className="hidden lg:block text-right">
                 <p className={cn("text-[11px] font-black leading-none", isDarkMode ? "text-white" : "text-slate-900")}>Fast Carrier</p>
                 <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1 opacity-50", isDarkMode ? "text-white" : "text-slate-900")}>Carrier Ops 04</p>
               </div>
               <div className={cn(
                 "w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-700",
                 isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-100 text-slate-900 shadow-sm"
               )}>
                 <User size={20} />
               </div>
            </div>
          </div>
        </header>

        <div className="flex-grow p-8 lg:p-12 max-w-[1920px] mx-auto w-full">
           <Outlet context={{ isDarkMode }} />
        </div>
      </main>
    </div>
  );
};

export default DeliveryLayout;
