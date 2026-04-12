import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Settings, 
  LogOut,
  Package,
  Star,
  ShieldCheck,
  ChevronRight,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const CustomerLayout = () => {
  const { isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: ShieldCheck, path: '/account' },
    { name: 'My Orders', icon: ShoppingBag, path: '/account/orders' },
    { name: 'Tracking', icon: Package, path: '/account/tracking' },
    { name: 'My Reviews', icon: Star, path: '/account/reviews' },
    { name: 'Favorites', icon: Heart, path: '/account/favorites' },
    { name: 'Support', icon: MessageCircle, path: '/account/support' },
    { name: 'Profile', icon: User, path: '/account/profile' },
  ];

  const activePage = menuItems.find(item => item.path === location.pathname)?.name || 'Account';

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-20 transition-colors duration-500",
      isDarkMode ? "bg-[#050505]" : "bg-[#FCFCFB]"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className={cn(
              "sticky top-32 p-8 rounded-[3rem] border shadow-2xl transition-all duration-700",
              isDarkMode ? "bg-[#0D0D0D] border-white/5 shadow-black" : "bg-white border-slate-100 shadow-slate-200/50"
            )}>
              {/* User Identity */}
              <div className="flex items-center gap-5 mb-10 pb-10 border-b border-white/5">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border transition-all",
                  isDarkMode ? "bg-white/5 border-white/10 text-emerald-500" : "bg-slate-50 border-slate-100 text-sage"
                )}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className={cn("text-lg font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>
                    {user?.name || 'Customer'}
                  </h3>
                  <p className="text-[13px] font-black uppercase tracking-widest opacity-40">Collector Level</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/account'}
                    className={({ isActive }) => cn(
                      "flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all duration-300 group",
                      isActive 
                        ? (isDarkMode ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-white shadow-xl")
                        : (isDarkMode ? "text-white/40 hover:bg-white/5 hover:text-white" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900")
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-4">
                          <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className="shrink-0 transition-transform group-hover:scale-110" />
                          <span className="text-[15px] font-black uppercase tracking-widest">{item.name}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />}
                      </>
                    )}
                  </NavLink>
                ))}

                <button
                  onClick={handleLogout}
                  className={cn(
                    "flex items-center gap-4 w-full px-5 py-4 rounded-2xl mt-8 transition-all duration-300 group",
                    isDarkMode ? "text-rose-500/40 hover:bg-rose-500/10 hover:text-rose-500" : "text-slate-300 hover:bg-rose-50 hover:text-rose-500"
                  )}
                >
                  <LogOut size={18} />
                  <span className="text-[15px] font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow min-w-0">
            {/* Context Header */}
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h1 className={cn(
                  "text-5xl font-serif font-black italic tracking-tighter leading-none mb-3",
                  isDarkMode ? "text-white" : "text-slate-900"
                )}>
                  {activePage}.
                </h1>
                <div className={cn(
                  "h-1 w-20 rounded-full",
                  isDarkMode ? "bg-emerald-500 shadow-[0_0_15px_#10b981]" : "bg-sage"
                )} />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-4">
                <button className={cn(
                  "lg:flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-[13px] font-black uppercase tracking-widest",
                  isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-100 text-slate-900 hover:border-slate-300 shadow-sm"
                )}>
                  <Bell size={16} /> Notifications
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet context={{ isDarkMode }} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
