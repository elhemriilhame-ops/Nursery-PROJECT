import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { useTheme } from '@/context/ThemeContext';

export default function GlobalSearch({ isOpen, onClose }) {
  const { isDarkMode } = useTheme();
  const { products, guides, loading } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ products: [], guides: [] });
  const inputRef = useRef(null);
  const hasResults = results.products.length > 0 || results.guides.length > 0;

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults({ products: [], guides: [] });
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Filter results as user types
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setResults({ products: [], guides: [] });
      return;
    }
    const filteredProducts = products
      .filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
      .slice(0, 6);

    const filteredGuides = guides
      .filter(g =>
        g.title?.toLowerCase().includes(q) ||
        g.description?.toLowerCase().includes(q) ||
        g.author?.toLowerCase().includes(q)
      )
      .slice(0, 3);

    setResults({ products: filteredProducts, guides: filteredGuides });
  }, [query, products, guides]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-start pt-20 px-4 sm:px-6">

          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ zIndex: 201 }}
          >

            {/* ── Input Row ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
              {loading ? (
                <Loader2 size={22} className="text-sage animate-spin shrink-0" />
              ) : (
                <Search size={22} className="text-sage shrink-0" />
              )}
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, plants, guides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow bg-transparent text-lg text-slate-900 placeholder:text-slate-400 outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Results ── */}
            <div className="max-h-[65vh] overflow-y-auto">

              {/* No query yet – show prompt */}
              {!query && (
                <div className="py-12 text-center">
                  <Search size={36} className="mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-400 text-sm font-medium">
                    Start typing to search products & guides...
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-6 px-8">
                    {['Monstera', 'Roses', 'Lavender', 'Cactus', 'Essential Oils'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-500 hover:border-sage hover:text-sage transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query && !loading && !hasResults && (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-slate-50 mx-auto flex items-center justify-center">
                    <Search size={32} className="text-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-serif text-xl italic leading-none">
                      Aucun spécimen trouvé
                    </p>
                    <p className="text-slate-400 text-sm">
                      We couldn't find any matches for "<strong className="text-slate-600">{query}</strong>"
                    </p>
                  </div>
                  <Link 
                    to="/shop/all"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
                  >
                     Explore Full Boutique
                  </Link>
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-sage mb-3 px-2">
                    Products
                  </p>
                  <div className="space-y-1">
                    {results.products.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-sage/5 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-semibold text-slate-900 truncate group-hover:text-sage transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-slate-400 truncate">
                            {product.category} · {product.price} DH
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 group-hover:text-sage group-hover:translate-x-1 transition-all shrink-0"
                        />
                      </Link>
                    ))}
                    <Link
                      to="/shop/all"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-sage hover:text-sage/70 transition-colors"
                    >
                      View all products <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Divider */}
              {results.products.length > 0 && results.guides.length > 0 && (
                <div className="h-px bg-slate-100 mx-4" />
              )}

              {/* Guides */}
              {results.guides.length > 0 && (
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-amber-600 mb-3 px-2">
                    Botanical Guides
                  </p>
                  <div className="space-y-1">
                    {results.guides.map(guide => (
                      <Link
                        key={guide.id}
                        to={`/guides/${guide.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-amber-50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl border border-slate-100 bg-amber-50 flex items-center justify-center shrink-0">
                          <BookOpen size={22} className="text-amber-400" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-semibold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                            {guide.title}
                          </p>
                          <p className="text-sm text-slate-400 truncate">
                            {guide.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ── Footer ── */}
            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50/80">
              <p className="text-xs text-slate-400">Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[11px]">ESC</kbd> to close</p>
              <p className="text-xs text-slate-400">{results.products.length + results.guides.length} results</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
