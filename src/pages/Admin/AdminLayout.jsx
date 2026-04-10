import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu,
  LogOut, 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings,
  Bell,
  Search,
  User,
  Sun,
  Moon,
  ChevronRight,
  TrendingUp,
  Package,
  Store as StoreIcon,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

// Hoisted Custom Store Icon for stability
const Store = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const menuItems = [
    { name: 'Analytics', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Sellers', icon: Store, path: '/admin/sellers' },
    { name: 'Deliveries', icon: TrendingUp, path: '/admin/deliveries' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Reviews', icon: MessageSquare, path: '/admin/reviews' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const notifications = [
    { id: 1, title: 'New Seller Request', time: '5m ago', icon: Store },
    { id: 2, title: 'Inventory Alert', time: '12m ago', icon: Package },
    { id: 3, title: 'System Updated', time: '1h ago', icon: Settings },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Admin';

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
              isDarkMode ? "bg-emerald-500 shadow-emerald-500/20" : "bg-sage shadow-sage/20"
            )}>
              <Store size={22} strokeWidth={2} />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xl font-serif font-black tracking-tighter italic">Sunflowers.</span>
                <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] mt-0.5", isDarkMode ? "text-emerald-500" : "text-sage")}>Terminal Admin</p>
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
                  flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group
                  ${isActive
                    ? `${isDarkMode ? 'bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)]' : 'bg-sage text-white shadow-xl shadow-sage/20'} font-bold`
                    : `${isDarkMode ? 'text-[#CBD5E1] hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50 hover:text-sage'}`}
                `}
              >
                <item.icon size={22} className={`shrink-0 transition-transform group-hover:scale-110 ${isSidebarOpen ? '' : 'mx-auto'}`} />
                {isSidebarOpen && <span className="text-[14px] font-black uppercase tracking-widest">{item.name}</span>}
              </NavLink>
            ))}
          </div>

          {/* Bottom Logout Item */}
          <div className="pt-4 border-t border-white/5 mt-auto">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl w-full transition-all group font-black uppercase tracking-widest text-[11px]
                ${isDarkMode ? 'text-rose-500 hover:bg-rose-500/10' : 'text-red-600 hover:bg-red-50'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-rose-500/10' : 'bg-red-50'}`}>
                <LogOut size={20} className={`shrink-0 group-hover:-translate-x-1 transition-transform ${isSidebarOpen ? '' : 'mx-auto'}`} />
              </div>
              {isSidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-grow transition-all duration-300 min-h-screen flex flex-col",
        isSidebarOpen ? "lg:ml-[280px]" : "lg:ml-[88px]"
      )}>
        
        {/* Header */}
        <header className={cn(
          "h-24 sticky top-0 z-40 backdrop-blur-xl border-b flex items-center justify-between px-6 lg:px-10 transition-colors duration-300",
          isDarkMode ? "bg-[#090909]/80 border-white/5 shadow-black/20" : "bg-white/80 border-slate-100 shadow-sm shadow-black/5"
        )}>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "p-3 rounded-2xl transition-all border",
                isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-800 shadow-sm"
              )}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <div className={cn("hidden lg:flex items-center gap-5", isDarkMode ? "text-white/40" : "text-slate-400")}>
              <div className="flex items-center gap-3">
                 <div className={cn("w-1.5 h-1.5 rounded-full", isDarkMode ? "bg-emerald-500" : "bg-sage")} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neuralis Hub</span>
              </div>
              <ChevronRight size={14} className="opacity-20" />
              <span className={cn("text-[12px] font-black uppercase tracking-[0.2em]", isDarkMode ? "text-white" : "text-slate-900")}>{activePage}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button className={cn(
               "p-3 rounded-2xl transition-all border hidden sm:flex",
               isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900 shadow-sm"
            )}>
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  "p-3 rounded-2xl transition-all border relative",
                  isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900 shadow-sm"
                )}
              >
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500 border-2 border-inherit" />
                <Bell size={22} strokeWidth={1.5} />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className={cn(
                        "absolute top-full right-0 mt-4 w-80 rounded-[2rem] border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-50 p-6 overflow-hidden",
                        isDarkMode ? "bg-[#111111] border-white/10" : "bg-white border-slate-200"
                      )}
                    >
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Intelligence Stream</h4>
                      <div className="space-y-6">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="flex gap-4 items-start group cursor-pointer">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                              isDarkMode ? "bg-white/5 border-white/10 group-hover:border-emerald-500/50" : "bg-slate-50 border-slate-100 group-hover:border-sage/50"
                            )}>
                              <notif.icon size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12px] font-black truncate">{notif.title}</p>
                              <p className="text-[10px] opacity-40 mt-1 uppercase font-black tracking-widest">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className={cn(
                        "w-full py-4 text-[9px] font-black uppercase tracking-widest transition-all border-t mt-6",
                        isDarkMode ? "text-white/20 hover:text-white border-white/5" : "text-slate-400 hover:text-slate-900 border-slate-50"
                      )}>View Registry</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-3 rounded-2xl transition-all border",
                isDarkMode ? "bg-white/5 border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_#10b98122]" : "bg-slate-100 border-slate-100 text-slate-800 shadow-sm"
              )}
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* User Profile */}
            <div className={cn(
              "flex items-center gap-4 pl-4 border-l ml-2",
              isDarkMode ? "border-white/5" : "border-slate-100"
            )}>
              <div className="hidden sm:block text-right">
                <p className={cn("text-[12px] font-black tracking-tight leading-none", isDarkMode ? "text-white" : "text-slate-900")}>System Architecht</p>
                <p className={cn("text-[9px] font-black uppercase tracking-[0.25em] mt-1.5", isDarkMode ? "text-emerald-500" : "text-sage")}>Lvl 99 Admin</p>
              </div>
              <div className={cn(
                "w-11 h-11 rounded-2xl p-1 border group cursor-pointer transition-all shrink-0",
                isDarkMode ? "bg-white/5 border-white/5 hover:border-emerald-500" : "bg-white border-slate-200 hover:border-sage"
              )}>
                <div className={cn(
                  "w-full h-full rounded-xl flex items-center justify-center",
                  isDarkMode ? "bg-emerald-500/10 text-emerald-500" : "bg-sage/10 text-sage"
                )}>
                  <User size={22} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Flow */}
        <div className="flex-grow p-6 lg:p-10 max-w-[1920px] mx-auto w-full">
          <Outlet context={{ isDarkMode }} />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
