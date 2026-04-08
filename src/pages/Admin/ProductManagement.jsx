import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
   Search,
   Plus,
   MoreHorizontal,
   Edit3,
   Trash2,
   Filter,
   LayoutGrid,
   List,
   ChevronLeft,
   ChevronRight,
   Package,
   X,
   Check,
   Loader2,
   AlertCircle
} from 'lucide-react';

const ProductManagement = () => {
   const { isDarkMode } = useOutletContext();
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingProduct, setEditingProduct] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [formData, setFormData] = useState({
      name: '',
      price: '',
      image: '',
      category: 'bouquets',
      type: 'flower',
      description: '',
      stock: 0,
      featured: false
   });
   const [error, setError] = useState(null);
   const [saving, setSaving] = useState(false);

   const categories = [
      { id: 'bouquets', name: 'Bouquets', icon: '🌸' },
      { id: 'plants', name: 'Plants', icon: '🌿' },
      { id: 'oils', name: 'Essential Oils', icon: '💧' },
      { id: 'tools', name: 'Tools', icon: '🛠️' }
   ];

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await fetch('http://localhost:5000/api/products');
         const data = await response.json();
         setProducts(data);
      } catch (err) {
         setError('Failed to load products');
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
      if (product) {
         setEditingProduct(product);
         setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category || 'bouquets',
            type: product.type || 'flower',
            description: product.description,
            stock: product.stock || 0,
            featured: product.featured || false
         });
      } else {
         setEditingProduct(null);
         setFormData({
            name: '',
            price: '',
            image: '',
            category: 'bouquets',
            type: 'flower',
            description: '',
            stock: 0,
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
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct 
         ? `http://localhost:5000/api/products/${editingProduct._id}`
         : 'http://localhost:5000/api/products';

      try {
         const response = await fetch(url, {
            method,
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
         });

         if (!response.ok) throw new Error('Failed to save product');

         await fetchProducts();
         setIsModalOpen(false);
      } catch (err) {
         setError(err.message);
      } finally {
         setSaving(false);
      }
   };

   const deleteProduct = async (id) => {
      if (!window.confirm('Are you sure you want to remove this botanical from the catalogue?')) return;
      
      const token = localStorage.getItem('userToken');
      try {
         const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
         });

         if (!response.ok) throw new Error('Failed to delete product');
         setProducts(products.filter(p => p._id !== id));
      } catch (err) {
         setError(err.message);
      }
   };

   const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-8 pb-20">
         {/* Page Header */}
         <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[3rem] border shadow-sm transition-all
            ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
            <div>
               <h1 className={`text-4xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Catalogue Management</h1>
               <p className={isDarkMode ? 'text-[#CBD5E1] text-sm mt-1' : 'text-slate-500 text-sm mt-1'}>Add, update or remove items from the global botanical marketplace.</p>
            </div>
            <button 
               onClick={() => openModal()}
               className="flex items-center gap-3 px-8 py-4 bg-[#F43F5E] text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all"
            >
               <Plus size={20} />
               Add New Product
            </button>
         </div>

         {/* Filtering & Search */}
         <div className={`p-6 rounded-[2rem] border shadow-sm flex flex-col md:flex-row gap-4 items-center transition-all
            ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
            <div className="relative flex-grow w-full">
               <Search className={isDarkMode ? 'absolute left-4 top-1/2 -translate-y-1/2 text-white/40' : 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'} size={18} />
               <input 
                  type="text" 
                  placeholder="Filter products by name or category..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-6 py-4 border-none rounded-2xl text-sm font-medium outline-none transition-all
                     ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
               />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
               <button className={`p-4 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><Filter size={20} /></button>
               <button className={`p-4 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><LayoutGrid size={20} /></button>
            </div>
         </div>

         {/* Products Table */}
         <div className={`rounded-[3rem] border shadow-sm overflow-hidden transition-all
            ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
            {loading ? (
               <div className="p-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="animate-spin text-[#2DD4BF]" size={40} />
                  <p className={`font-serif text-xl italic uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Tending the garden...</p>
               </div>
            ) : filteredProducts.length === 0 ? (
               <div className="p-20 text-center space-y-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${isDarkMode ? 'bg-white/5 text-white/20' : 'bg-slate-50 text-slate-200'}`}>
                     <Package size={40} />
                  </div>
                  <h3 className={`text-xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>No products found</h3>
                  <p className={isDarkMode ? 'text-white/40 text-sm' : 'text-slate-500 text-sm'}>Your search returned no results. Try another term.</p>
               </div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                     <thead>
                        <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b ${isDarkMode ? 'bg-white/[0.04] text-[#CBD5E1] border-white/5' : 'bg-slate-50/50 text-slate-400 border-slate-50'}`}>
                           <th className="px-10 py-6">Identity</th>
                           <th className="px-10 py-6 text-center">Price</th>
                           <th className="px-10 py-6 text-center">Stock</th>
                           <th className="px-10 py-6 text-center">Status</th>
                           <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className={isDarkMode ? 'divide-y divide-white/5' : 'divide-y divide-slate-50'}>
                        {filteredProducts.map((p) => (
                           <tr key={p._id} className={`transition-colors group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'}`}>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border relative group shadow-sm transition-all
                                       ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-100'}`}>
                                       <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                       {p.featured && (
                                          <div className="absolute top-1 left-1 bg-amber-400 w-2 h-2 rounded-full shadow-lg shadow-amber-400/50" />
                                       )}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                       <span className={`text-[15px] font-bold group-hover:text-[#2DD4BF] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</span>
                                       <span className={`text-[10px] font-black uppercase tracking-widest pr-4 border-r inline-block transition-all
                                          ${isDarkMode ? 'text-white/40 border-white/10' : 'text-slate-400 border-slate-100'}`}>
                                          {p.category}
                                       </span>
                                    </div>
                                 </div>
                              </td>
                              <td className={`px-10 py-6 text-center text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                 {p.price} DH
                              </td>
                              <td className="px-10 py-6 text-center">
                                 <span className={`text-[11px] font-black px-3 py-1 rounded-lg transition-all
                                    ${p.stock < 10 
                                      ? (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-500') 
                                      : (isDarkMode ? 'bg-white/5 text-white/50' : 'bg-slate-100 text-slate-600')}`}>
                                    {p.stock} in stock
                                 </span>
                              </td>
                              <td className="px-10 py-6 text-center">
                                 <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                                    ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                    <Check size={12} />
                                    Active
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <button 
                                       onClick={() => openModal(p)}
                                       className={`p-3 border rounded-xl transition-all shadow-sm
                                          ${isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white/60 hover:text-[#2DD4BF] hover:border-[#2DD4BF]/40' : 'bg-white border-slate-100 text-slate-600 hover:text-sage hover:border-sage'}`}
                                    >
                                       <Edit3 size={18} />
                                    </button>
                                    <button 
                                       onClick={() => deleteProduct(p._id)}
                                       className={`p-3 border rounded-xl transition-all shadow-sm
                                          ${isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white/60 hover:text-red-400 hover:border-red-400/40' : 'bg-white border-slate-100 text-slate-600 hover:text-red-500 hover:border-red-200'}`}
                                    >
                                       <Trash2 size={18} />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>

         {/* Product Modal (Add/Edit) */}
         <AnimatePresence>
            {isModalOpen && (
               <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
                  <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     exit={{ opacity: 0 }}
                     onClick={() => setIsModalOpen(false)}
                     className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
                  />
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0, y: 20 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.9, opacity: 0, y: 20 }}
                     className={`w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-[201] overflow-hidden transition-all
                        ${isDarkMode ? 'bg-[#141414]' : 'bg-white'}`}
                  >
                     <div className="p-8 lg:p-12 space-y-8">
                        <div className="flex items-center justify-between">
                           <div>
                              <h3 className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                 {editingProduct ? 'Update Botanical' : 'New Garden Entry'}
                              </h3>
                              <p className={`text-xs mt-1 italic ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Provide the details to enrich the catalogue collection.</p>
                           </div>
                           <button 
                              onClick={() => setIsModalOpen(false)}
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                                 ${isDarkMode ? 'bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10' : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                           >
                              <X size={24} />
                           </button>
                        </div>

                        {error && (
                           <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border transition-all
                              ${isDarkMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-100 text-red-600'}`}>
                              <AlertCircle size={18} />
                              {error}
                           </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Product Name</label>
                                 <input 
                                    required name="name" value={formData.name} onChange={handleInputChange}
                                    type="text" placeholder="e.g. White Serenity Lily"
                                    className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all
                                       ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Price (DH)</label>
                                 <input 
                                    required name="price" value={formData.price} onChange={handleInputChange}
                                    type="number" placeholder="450"
                                    className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all
                                       ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                                 />
                              </div>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Category</label>
                                 <select 
                                    name="category" value={formData.category} onChange={handleInputChange}
                                    className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all appearance-none
                                       ${isDarkMode ? 'bg-white/5 text-white focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                                 >
                                    {categories.map(c => (
                                       <option key={c.id} value={c.id} className={isDarkMode ? 'bg-[#141414] text-white' : 'bg-white text-slate-900'}>
                                          {c.name}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                              <div className="space-y-2">
                                 <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Stock Level</label>
                                 <input 
                                    name="stock" value={formData.stock} onChange={handleInputChange}
                                    type="number" placeholder="25"
                                    className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all
                                       ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Image URL</label>
                              <input 
                                 required name="image" value={formData.image} onChange={handleInputChange}
                                 type="text" placeholder="https://..."
                                 className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all
                                    ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                              />
                           </div>

                           <div className="space-y-2">
                              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Botanical Description</label>
                              <textarea 
                                 rows="3" name="description" value={formData.description} onChange={handleInputChange}
                                 placeholder="Tell us about the origins, care and scent..."
                                 className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-semibold outline-none transition-all resize-none
                                    ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
                              />
                           </div>

                           <div className={`flex items-center gap-3 p-4 rounded-2xl border border-dashed transition-all
                              ${isDarkMode ? 'bg-white/5 border-white/20' : 'bg-slate-50 border-slate-200'}`}>
                              <input 
                                 type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange}
                                 className="w-5 h-5 rounded-lg border-slate-200 text-[#F43F5E] focus:ring-[#F43F5E] cursor-pointer"
                              />
                              <label htmlFor="featured" className={`text-xs font-black uppercase tracking-widest cursor-pointer ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>Promote to Featured Selection</label>
                           </div>

                           <div className="pt-8">
                              <button 
                                 type="submit" disabled={saving}
                                 className="w-full py-5 bg-[#F43F5E] text-white rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                              >
                                 {saving ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                                 {editingProduct ? 'Save Botanical Changes' : 'Confirm New Entry'}
                              </button>
                           </div>
                        </form>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default ProductManagement;
