import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Settings, 
  User, 
  Store, 
  Bell, 
  Shield, 
  CreditCard,
  ChevronRight,
  Sparkles,
  Save,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SellerSettings() {
  const { isDarkMode } = useOutletContext();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Store Identity');

  const sections = [
    { title: 'Store Identity', icon: Store, description: 'Manage your botanical gallery branding and presence.', formTitle: 'Gallery Branding', formSubtitle: 'Visual Identity' },
    { title: 'Personal Archive', icon: User, description: 'Keeper of the artisan: name, contact and identity.', formTitle: 'General Profile', formSubtitle: 'Operational Essentials' },
    { title: 'Aura Notifications', icon: Bell, description: 'Configure how the marketplace whispers to you.', formTitle: 'Communication Settings', formSubtitle: 'Alert Preferences' },
    { title: 'Vault Security', icon: Shield, description: 'Password rituals and authentication scrolls.', formTitle: 'Authentication', formSubtitle: 'Security Credentials' },
    { title: 'Payout Vessels', icon: CreditCard, description: 'Manage your bank transfers and withdrawal paths.', formTitle: 'Banking Details', formSubtitle: 'Financial Routing' },
  ];

  const activeSection = sections.find(s => s.title === activeTab);

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
           <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>System Config</span>
        </div>
        <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Artisan <br />Configurations
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Settings Categories */}
         <div className="space-y-6">
            {sections.map((section, idx) => (
               <motion.div 
                 key={section.title}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 onClick={() => setActiveTab(section.title)}
                 className={`p-8 rounded-[2.5rem] border group cursor-pointer transition-all duration-500 hover:scale-[1.02]
                   ${isDarkMode 
                      ? (activeTab === section.title ? 'bg-[#1a1a1a] border-emerald-500/50 shadow-emerald-500/10 shadow-2xl' : 'bg-[#141414] border-white/5 hover:border-emerald-500/30' )
                      : (activeTab === section.title ? 'bg-slate-50 border-sage shadow-xl shadow-sage/10' : 'bg-white border-slate-100 hover:border-sage' )}`}
               >
                  <div className="flex items-center gap-6">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110
                       ${activeTab === section.title 
                          ? (isDarkMode ? 'bg-emerald-500 text-white' : 'bg-sage text-white')
                          : (isDarkMode ? 'bg-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-slate-50 text-sage group-hover:bg-sage group-hover:text-white')}`}>
                        <section.icon size={26} />
                     </div>
                     <div className="flex-1">
                        <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{section.title}</h3>
                        <p className={`text-[11px] font-black uppercase tracking-widest mt-1 ${activeTab === section.title ? 'opacity-80' : 'opacity-40'}`}>{section.description}</p>
                     </div>
                     <ChevronRight size={20} className={`transition-all ${activeTab === section.title ? 'opacity-100 translate-x-2 text-emerald-500' : 'opacity-20 group-hover:opacity-100 group-hover:translate-x-2'}`} />
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Form Preview Area */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className={`p-12 rounded-[4rem] border shadow-2xl relative overflow-hidden h-fit
             ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black' : 'bg-slate-50 border-slate-100'}`}
         >
            {/* Background Aura */}
            {isDarkMode && <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />}

            <div className="relative z-10 space-y-10 text-white">
               <div className="space-y-2">
                  <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeSection?.formTitle}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    {activeSection?.formSubtitle}
                  </p>
               </div>

               <div className="space-y-8">
                  {/* Dynamic Form Content */}
                  {activeTab === 'Store Identity' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Boutique Name</label>
                           <input type="text" defaultValue={user?.vendorInfo?.storeName || user?.storeName || "Nour Plant Gallery"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Brand Tagline</label>
                           <input type="text" defaultValue={user?.vendorInfo?.description || "Pure essence of nature"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Market Specialty</label>
                           <select defaultValue={user?.specialty || "plants"} className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all appearance-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`}>
                             <option value="plants">Nursery & Plants</option>
                             <option value="flowers">Flowers & Bouquets</option>
                             <option value="oils">Botanical Extracts</option>
                           </select>
                        </div>
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>City / Operating Zone</label>
                           <input type="text" defaultValue={user?.vendorInfo?.location || user?.location || "Agadir Center"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                      </div>

                      <div className="space-y-4">
                         <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Commercial Register N°</label>
                         <input type="text" defaultValue={user?.commercialRegister || "RC-AGD-45892"} 
                           className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Personal Archive' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Artisan Name</label>
                           <input type="text" defaultValue={user?.name || "Julian Thorne"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Email Address</label>
                           <input type="email" defaultValue={user?.email || "thorne@sanctuary.botany"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Phone Number</label>
                           <input type="tel" defaultValue={user?.phone || "0612345678"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                        <div className="space-y-4">
                           <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>National ID (CIN)</label>
                           <input type="text" defaultValue={user?.cin || "AB123456"} 
                             className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Aura Notifications' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                         <div>
                            <p className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>New Orders Alerts</p>
                            <p className="text-[10px] font-bold opacity-40 uppercase">Receive an email immediately</p>
                         </div>
                         <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500 rounded-sm cursor-pointer" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                         <div>
                            <p className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Customer Messages</p>
                            <p className="text-[10px] font-bold opacity-40 uppercase">Daily digest of inquiries</p>
                         </div>
                         <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500 rounded-sm cursor-pointer" />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Vault Security' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-4">
                         <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Current Password</label>
                         <input type="password" placeholder="••••••••" 
                           className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                      </div>
                      <div className="space-y-4">
                         <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>New Ritual (Password)</label>
                         <input type="password" placeholder="Enter new password" 
                           className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Payout Vessels' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-4">
                         <label className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bank IBAN</label>
                         <input type="text" defaultValue="MA59 0011 2233 4455 6677" 
                           className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-sage'}`} />
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-8 space-y-4">
                     <Button className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-[1.02]
                       ${isDarkMode ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}>
                        <Save size={16} className="mr-3" /> Save Changes
                     </Button>
                     {activeTab === 'Personal Archive' && (
                       <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-rose-500 transition-all flex items-center justify-center gap-3">
                          <Trash2 size={14} /> Deactivate Account
                       </button>
                     )}
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
