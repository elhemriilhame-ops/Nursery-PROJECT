import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
   Search,
   Plus,
   Edit3,
   Trash2,
   Filter,
   LayoutGrid,
   Package,
   X,
   Check,
   Loader2,
   AlertCircle,
   Image as ImageIcon,
   Sparkles,
   ArrowRight
} from 'lucide-react';
import { SELLER_PRODUCTS_DEMO } from '@/data/mockData';

const SellerProductManagement = () => {
   const { isDarkMode } = useOutletContext();
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingProduct, setEditingProduct] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [formData, setFormData] = useState({
      name: '',
      price: '',
      discount: '',
      image: '',
      category: 'Bouquets',
      type: 'Flowers',
      description: '',
      stock: 0,
      badge: 'IN STOCK',
      featured: false
   });
   const [error, setError] = useState(null);
   const [saving, setSaving] = useState(false);

   const categories = [
      'Bouquets', 'Dried Flowers', 'Rare Blooms', 'Indoor Plants', 'Trees', 'Succulents', 'Aromatherapy'
   ];

   const types = ['Flowers', 'Plants', 'Oils'];

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const token = localStorage.getItem('userToken');
         const response = await fetch('http://localhost:5000/api/products/seller', {
            headers: { 'Authorization': `Bearer ${token}` }
         });
         const data = await response.json();
         if (response.ok) {
            setProducts(data.length > 0 ? data : SELLER_PRODUCTS_DEMO);
         } else {
            setProducts(SELLER_PRODUCTS_DEMO);
            // Don't show error if we have demo data
         }
      } catch (err) {
         setProducts(SELLER_PRODUCTS_DEMO);
      } finally {
         setLoading(false);
      }
   };

   const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
   };

   const openModal = (product = null) => {
      setError(null);
      if (product) {
         setEditingProduct(product);
         setFormData({
            name: product.name,
            price: product.price,
            discount: product.discount || '',
            image: product.image,
            category: product.category,
            type: product.type,
            description: product.description || '',
            stock: product.stock || 0,
            badge: product.badge || (product.stock > 0 ? 'IN STOCK' : 'OUT STOCK'),
            featured: product.featured || false
         });
      } else {
         setEditingProduct(null);
         setFormData({
            name: '',
            price: '',
            discount: '',
            image: '',
            category: 'Bouquets',
            type: 'Flowers',
            description: '',
            stock: 0,
            badge: 'IN STOCK',
            featured: false
         });
      }
      setIsModalOpen(true);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      setError(null);
      
      const token = localStorage.getItem('userToken');
      // MOCK BEHAVIOR
      setTimeout(() => {
         if (editingProduct) {
            setProducts(products.map(p => p._id === editingProduct._id ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
         } else {
            const newProduct = { ...formData, _id: 'new-' + Date.now(), price: Number(formData.price), stock: Number(formData.stock) };
            setProducts([newProduct, ...products]);
         }
         setSaving(false);
         setIsModalOpen(false);
      }, 1000);
   };

   const deleteProduct = (id) => {
      if (!window.confirm('Delete this product?')) return;
      setProducts(products.filter(p => p._id !== id));
   };

   const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-12 pb-32">
         {/* Page Header */}
         <div className={`p-10 lg:p-14 rounded-[4rem] border transition-all duration-700 relative overflow-hidden
            ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'}`}>
            
            {/* Background Aura */}
            <div className={`absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px] transition-colors duration-700
              ${isDarkMode ? 'bg-emerald-500/10' : 'bg-amber-500/5'}`} />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-1 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-lg shadow-amber-500/20'}`} />
                     <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Supply Operations</span>
                  </div>
                  <h1 className={`text-5xl font-serif font-black tracking-tighter italic leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Inventory <br/> Registry.</h1>
                  <p className={`text-lg font-serif italic max-w-md ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Archive and curate your personal collection for the global marketplace.</p>
               </div>

               <button 
                  onClick={() => openModal()}
                  className={`group flex items-center gap-4 px-10 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl
                    ${isDarkMode 
                       ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' 
                       : 'bg-slate-900 text-white hover:bg-amber-600 shadow-slate-900/10'}`}
               >
                  <Plus size={20} strokeWidth={2.5} />
                  <span>INITIALIZE NEW ITEM</span>
               </button>
            </div>
         </div>

         {/* Search Bar */}
         <div className={`p-4 rounded-[2.5rem] border transition-all duration-700 flex items-center gap-4
            ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black/40' : 'bg-white border-slate-100'}`}>
            <div className="relative flex-grow">
               <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`} size={20} />
               <input 
                  type="text" 
                  placeholder="IDENTIFY ITEM BY NAME OR CATEGORY..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-16 pr-8 py-5 border-none rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.2em] outline-none transition-all
                     ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/10 focus:bg-white/10' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white shadow-inner'}`}
               />
            </div>
         </div>

         {/* Grid Flow */}
         {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-6">
               <div className={`w-16 h-16 border-4 border-t-emerald-500 border-r-transparent border-b-emerald-500 border-l-transparent rounded-full animate-spin`} />
               <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>Syncing Registry</p>
            </div>
         ) : filteredProducts.length === 0 ? (
            <div className={`py-40 text-center space-y-8 rounded-[4rem] border border-dashed transition-all
               ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'}`}>
               <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto transition-all duration-700
                  ${isDarkMode ? 'bg-white/5 text-white/5 shadow-inner' : 'bg-white text-slate-100 shadow-sm'}`}>
                  <Package size={52} />
               </div>
               <div className="space-y-2">
                  <h3 className={`text-2xl font-serif font-black italic tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>The Vault is Empty</h3>
                  <p className={`text-sm font-serif italic ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>Start your botanical legacy by adding your first masterpiece.</p>
               </div>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
               {filteredProducts.map((p, i) => (
                  <motion.div
                     key={p._id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className={`group rounded-[3.5rem] border p-4 transition-all duration-700 relative overflow-hidden
                        ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100 shadow-sm hover:shadow-2xl'}`}
                  >
                     <div className="aspect-[4/3] rounded-[2.8rem] overflow-hidden relative mb-8">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border transition-all
                               ${isDarkMode ? 'bg-black/60 text-white border-white/10' : 'bg-white/60 text-slate-900 border-slate-200'}`}>
                               {p.category}
                            </span>
                            {p.badge && (
                               <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border transition-all
                                  ${p.badge === 'OUT STOCK' ? 'bg-rose-500/90 text-white border-rose-500/30' : 
                                    p.badge === 'NEW' ? 'bg-amber-500/90 text-white border-amber-500/30' : 
                                    (isDarkMode ? 'bg-white/10 text-white border-white/20' : 'bg-slate-900/90 text-white border-transparent')}`}>
                                  {p.badge}
                               </span>
                            )}
                            {p.featured && (
                               <span className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-500/40 w-fit">
                                  <Sparkles size={14} fill="white" />
                               </span>
                            )}
                        </div>
                        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                            {p.discount > 0 && (
                               <span className="px-3 py-1 bg-amber-500 text-white rounded-xl text-[10px] font-black shadow-lg shadow-amber-500/40">-{p.discount}%</span>
                            )}
                            <span className={`px-6 py-2.5 rounded-2xl text-[14px] font-black backdrop-blur-3xl shadow-2xl transition-all
                                ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-slate-900 text-white shadow-slate-900/40'}`}>
                               {p.discount ? (p.price - (p.price * (p.discount/100))).toFixed(0) : p.price} DH
                            </span>
                        </div>
                     </div>

                     <div className="px-6 pb-6 space-y-6">
                        <div className="space-y-1">
                           <h3 className={`text-2xl font-serif font-black italic tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
                           <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{p.type} • Registry ID: {p._id.slice(-6)}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t transition-colors duration-700 ${isDarkMode ? 'border-white/5' : 'border-slate-50'}">
                           <div className="flex flex-col gap-1">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>STOCK LEVEL</span>
                              <span className={`text-[12px] font-black ${p.stock < 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}>{p.stock} UNITS</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <button 
                                 onClick={() => openModal(p)}
                                 className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border
                                    ${isDarkMode ? 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-emerald-500/50' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300'}`}
                              >
                                 <Edit3 size={18} strokeWidth={2.5} />
                              </button>
                              <button 
                                 onClick={() => deleteProduct(p._id)}
                                 className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border
                                    ${isDarkMode ? 'bg-white/5 border-white/5 text-rose-500/40 hover:text-rose-500 hover:border-rose-500/50' : 'bg-rose-50 border-rose-100 text-rose-400 hover:text-rose-600 hover:border-rose-200'}`}
                              >
                                 <Trash2 size={18} strokeWidth={2.5} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         )}

         {/* Product Modal */}
         <AnimatePresence>
            {isModalOpen && (
               <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
                  <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setIsModalOpen(false)}
                     className="fixed inset-0 bg-black/90 backdrop-blur-xl" 
                  />
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0, y: 30 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.9, opacity: 0, y: 30 }}
                     className={`w-full max-w-4xl rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative z-[1001] overflow-hidden overflow-y-auto max-h-[90vh] border transition-all duration-700
                        ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200'}`}
                  >
                     <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
                        <div className="flex items-center justify-between">
                           <div className="space-y-3">
                              <h3 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{editingProduct ? 'Update ' : 'Create '} <br/> Product Card</h3>
                              <div className={`h-1 w-20 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500'}`} />
                           </div>
                           <button 
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all border
                                 ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'}`}
                           >
                              <X size={28} strokeWidth={1.5} />
                           </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                           <div className="space-y-6">
                              <FormInput label="Specimen Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Damascus Rose" isDark={isDarkMode} />
                              <div className="grid grid-cols-2 gap-6">
                                 <FormInput label="Market Price (DH)" name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="450" isDark={isDarkMode} />
                                 <FormInput label="Discount (%)" name="discount" value={formData.discount} onChange={handleInputChange} type="number" placeholder="15" isDark={isDarkMode} />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <FormInput label="Registry Stock" name="stock" value={formData.stock} onChange={handleInputChange} type="number" placeholder="20" isDark={isDarkMode} />
                                 <FormSelect label="Badge Status" name="badge" value={formData.badge} onChange={handleInputChange} options={['NEW', 'IN STOCK', 'OUT STOCK']} isDark={isDarkMode} />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <FormSelect label="Category" name="category" value={formData.category} onChange={handleInputChange} options={categories} isDark={isDarkMode} />
                                 <FormSelect label="Specimen Type" name="type" value={formData.type} onChange={handleInputChange} options={types} isDark={isDarkMode} />
                              </div>
                           </div>
                           
                           <div className="space-y-6">
                              <FormInput icon={ImageIcon} label="Visual Portrait (URL)" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://source.unsplash..." isDark={isDarkMode} />
                              
                              <div className="space-y-4">
                                 <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-6 opacity-30 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Description</label>
                                 <textarea 
                                    rows="5" name="description" value={formData.description} onChange={handleInputChange}
                                    placeholder="Describe this product and its characteristics..."
                                    className={`w-full px-8 py-6 rounded-[2rem] text-[12px] font-black outline-none transition-all resize-none shadow-inner tracking-widest leading-relaxed
                                       ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/10 focus:bg-white/10' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white'}`}
                                 />
                              </div>

                              <div className="flex items-center gap-6 px-10 py-6 rounded-[2rem] border border-dashed transition-all
                                 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50' }">
                                 <input type="checkbox" name="featured" id="modal-feat" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 rounded-lg text-emerald-500 focus:ring-emerald-53" />
                                 <label htmlFor="modal-feat" className={`text-[11px] font-black uppercase tracking-[0.2em] cursor-pointer ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>MARKET SELECTION (FEATURED)</label>
                              </div>
                           </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                           <button 
                              type="submit" disabled={saving}
                              className={`w-full py-6 rounded-3xl font-black tracking-[0.4em] uppercase text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95
                                ${isDarkMode 
                                   ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' 
                                   : 'bg-slate-900 text-white hover:bg-amber-600 shadow-slate-900/10'}`}
                           >
                              {saving ? "SYNCING REGISTRY..." : (editingProduct ? "FINALIZE ARCHIVE UPDATE" : "PUBLISH TO MARKETPLACE")}
                              {!saving && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                           </button>
                        </div>
                     </form>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

function FormInput({ icon: Icon, label, name, value, onChange, type = "text", placeholder, isDark }) {
   return (
      <div className="space-y-4 group">
         <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-6 transition-colors duration-500
           ${isDark ? 'text-white/30 group-focus-within:text-emerald-500' : 'text-slate-400 group-focus-within:text-slate-900'}`}>{label}</label>
         <div className="relative">
            {Icon && <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isDark ? 'text-white/20 group-focus-within:text-emerald-500' : 'text-slate-300'}`} size={18} />}
            <input 
               required name={name} value={value} onChange={onChange}
               type={type} placeholder={placeholder}
               className={`w-full ${Icon ? 'pl-16' : 'px-8'} pr-8 py-5 rounded-[1.8rem] border-none outline-none transition-all font-black text-[12px] shadow-inner tracking-widest [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                  ${isDark ? 'bg-white/5 text-white placeholder:text-white/10 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-white shadow-slate-100'}`}
            />
         </div>
      </div>
   );
}

function FormSelect({ label, name, value, onChange, options, isDark }) {
   return (
      <div className="space-y-4">
         <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-6 opacity-30 ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</label>
         <select name={name} value={value} onChange={onChange} required 
            className={`w-full px-8 py-5 rounded-[1.8rem] border-none outline-none transition-all font-black text-[11px] uppercase tracking-widest appearance-none cursor-pointer
               ${isDark ? 'bg-white/5 text-white focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}>
            {options.map(o => (
               <option key={o} value={o} className={isDark ? 'bg-[#141414] text-white' : 'bg-white text-slate-900'}>{o}</option>
            ))}
         </select>
      </div>
   );
}

export default SellerProductManagement;
