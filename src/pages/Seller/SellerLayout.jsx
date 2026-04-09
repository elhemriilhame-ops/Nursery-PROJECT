import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu,
  LogOut, 
  BarChart3, 
  Package, 
  ShoppingBag, 
  FileText, 
  Settings,
  Bell,
  User,
  Sun,
  Moon,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

// Hoisted Store Icon for stability
const Store = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/seller' },
    { name: 'My Products', icon: Package, path: '/seller/products' },
    { name: 'Client Orders', icon: ShoppingBag, path: '/seller/orders' },
    { name: 'Invoices', icon: FileText, path: '/seller/invoices' },
    { name: 'Store Settings', icon: Settings, path: '/seller/settings' },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Seller';

  return (
    <div className={cn(
      "flex min-h-screen font-sans transition-colors duration-500",
      isDarkMode ? "bg-[#090909] text-white" : "bg-[#FCFCFB] text-slate-900"
    )}>
      
      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-all duration-500 flex flex-col overflow-hidden border-r shadow-2xl",
          isDarkMode ? "bg-[#0D0D0D] border-white/5 shadow-black/40" : "bg-white border-slate-100 shadow-black/5"
        )}
      >
        <div className="h-24 flex items-center px-7">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 transition-all",
              isDarkMode ? "bg-amber-500 shadow-amber-500/20" : "bg-amber-600 shadow-amber-600/20"
            )}>
              <Store size={22} strokeWidth={2} />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xl font-serif font-black tracking-tighter italic">Nourplant.</span>
                <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] mt-0.5", isDarkMode ? "text-amber-400" : "text-amber-700")}>Merchant Console</p>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto no-scrollbar flex flex-col">
          <div className="flex-grow space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group
                  ${isActive
                    ? `${isDarkMode ? 'bg-amber-500 text-white shadow-[0_4px_25px_rgba(245,158,11,0.3)]' : 'bg-amber-600 text-white shadow-xl shadow-amber-600/20'} font-black`
                    : `${isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'}`}
                `}
                end={item.path === '/seller'}
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
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl w-full transition-all group font-black uppercase tracking-widest text-[11px]
                ${isDarkMode ? 'text-rose-500 hover:bg-rose-500/10' : 'text-red-600 hover:bg-red-50'}`}
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
        "flex-grow transition-all duration-500 min-h-screen flex flex-col",
        isSidebarOpen ? "lg:ml-[280px]" : "lg:ml-[88px]"
      )}>
        <header className={cn(
          "h-24 sticky top-0 z-40 backdrop-blur-2xl border-b flex items-center justify-between px-6 lg:px-12 transition-colors duration-500",
          isDarkMode ? "bg-[#090909]/80 border-white/5 shadow-2xl shadow-black/20" : "bg-[#FCFCFB]/80 border-slate-100 shadow-sm"
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
                 <div className={cn("w-2 h-2 rounded-full", isDarkMode ? "bg-amber-500" : "bg-amber-600")} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Merchant Hub</span>
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
                isDarkMode ? "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-[0_0_20px_#f59e0b22]" : "bg-white border-slate-100 text-slate-800 shadow-sm"
              )}
            >
              {isDarkMode ? <Sun size={22} strokeWidth={1.5} /> : <Moon size={22} strokeWidth={1.5} />}
            </button>

            <div className={cn("hidden sm:flex items-center pl-5 border-l ml-3 transition-colors duration-500", isDarkMode ? "border-white/5" : "border-slate-100")}>
               <div className="text-right mr-5">
                 <p className={cn("text-[12px] font-black tracking-tight leading-none text-slate-900", isDarkMode && "text-white")}>Nourplant Store</p>
                 <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] mt-1.5 text-amber-600", isDarkMode && "text-amber-400")}>Verified Merchant</p>
               </div>
               <div className={cn(
                 "w-12 h-12 rounded-2xl p-1 border group cursor-pointer transition-all shrink-0",
                 isDarkMode ? "bg-white/5 border-white/5 hover:border-amber-500" : "bg-white border-slate-200 hover:border-amber-600"
               )}>
                 <div className={cn("w-full h-full rounded-xl flex items-center justify-center transition-all", isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-500/10 text-amber-600")}>
                    <User size={22} strokeWidth={1.5} />
                 </div>
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

export default SellerLayout;
