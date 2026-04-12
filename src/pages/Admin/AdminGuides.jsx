import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import {
  BookOpen, Plus, Pencil, Trash2, X, Save, Loader2,
  Image as ImageIcon, User, Tag, AlignLeft, FileText, Calendar
} from 'lucide-react';

const BASE_URL = 'http://127.0.0.1:5000';
const CATEGORIES = ['Growth', 'Aesthetics', 'Heritage'];
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80';

const emptyForm = {
  title: '', description: '', content: '', image: '',
  author: '', category: 'Growth', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
};

export default function AdminGuides() {
  const { isDarkMode } = useOutletContext();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${BASE_URL}/api/guides`);
      setGuides(data);
    } catch (err) {
      setError('Could not load guides. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuides(); }, []);

  const openAdd = () => {
    setEditingGuide(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (guide) => {
    setEditingGuide(guide);
    setForm({
      title: guide.title || '',
      description: guide.description || '',
      content: guide.content || '',
      image: guide.image || '',
      author: guide.author || '',
      category: guide.category || 'Growth',
      date: guide.date || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingGuide(null);
    setForm(emptyForm);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingGuide && editingGuide._id) {
        await axios.put(`${BASE_URL}/api/guides/${editingGuide._id}`, form);
      } else {
        await axios.post(`${BASE_URL}/api/guides`, form);
      }
      await fetchGuides();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed. Check all fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    setDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/api/guides/${deleteTarget._id}`);
      setGuides(prev => prev.filter(g => g._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const field = isDarkMode
    ? 'bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500'
    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sage';

  return (
    <div className={`min-h-screen p-6 lg:p-10 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif font-black italic tracking-tight">Botanical Guides</h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
            {guides.length} guide{guides.length !== 1 ? 's' : ''} in the registry
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} /> Add Guide
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-medium">
          {error}
        </div>
      )}

      {/* ── Loading ── */}
      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="animate-spin text-emerald-500" size={36} />
        </div>
      ) : guides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <BookOpen size={48} className="opacity-20" />
          <p className="opacity-40 font-serif italic text-xl">No guides yet. Add your first one!</p>
        </div>
      ) : (
        /* ── Guides Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {guides.map(guide => (
            <motion.div
              key={guide._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border overflow-hidden transition-all group hover:shadow-xl
                ${isDarkMode ? 'bg-[#141414] border-white/5 hover:border-white/10' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={imgErrors[guide._id] ? FALLBACK_IMG : guide.image}
                  alt={guide.title}
                  onError={() => setImgErrors(p => ({ ...p, [guide._id]: true }))}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                  ${guide.category === 'Growth' ? 'bg-emerald-500 text-white' :
                    guide.category === 'Aesthetics' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white'}`}>
                  {guide.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`font-serif font-bold text-lg italic leading-snug mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {guide.title}
                </h3>
                <p className={`text-sm line-clamp-2 mb-4 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                  {guide.description}
                </p>
                <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
                  <span className="flex items-center gap-1.5"><User size={12} /> {guide.author}</span>
                  <span>{guide.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className={`flex border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <button
                  onClick={() => openEdit(guide)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors
                    ${isDarkMode ? 'text-white/50 hover:text-emerald-400 hover:bg-emerald-500/5' : 'text-slate-500 hover:text-sage hover:bg-sage/5'}`}
                >
                  <Pencil size={15} /> Edit
                </button>
                <div className={`w-px ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`} />
                <button
                  onClick={() => setDeleteTarget(guide)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors
                    ${isDarkMode ? 'text-white/50 hover:text-rose-400 hover:bg-rose-500/5' : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50'}`}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════
          Add / Edit Modal
      ════════════════════════════════ */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl
                ${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white border border-slate-100'}`}
            >
              {/* Modal Header */}
              <div className={`sticky top-0 flex items-center justify-between px-8 py-6 border-b z-10
                ${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-slate-100'}`}>
                <h2 className="text-xl font-serif font-black italic">
                  {editingGuide ? 'Edit Guide' : 'New Guide'}
                </h2>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-black/10 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-8 space-y-6">

                {/* Title */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                    <FileText size={13} /> Title *
                  </label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Caring for Your Monstera"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${field}`} />
                </div>

                {/* Description */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                    <AlignLeft size={13} /> Short Description *
                  </label>
                  <textarea required rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="A brief summary shown in the guide cards..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors resize-none ${field}`} />
                </div>

                {/* Content */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                    <BookOpen size={13} /> Full Content * (Markdown supported)
                  </label>
                  <textarea required rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="Write the full guide content here. You can use **bold**, *italic*, ## Headings..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors resize-y font-mono text-sm ${field}`} />
                </div>

                {/* Image URL */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                    <ImageIcon size={13} /> Image URL *
                  </label>
                  <input required value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${field}`} />
                  {form.image && (
                    <div className="mt-2 w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
                      <img src={form.image} alt="preview" className="w-full h-full object-cover"
                        onError={e => { e.target.src = FALLBACK_IMG; }} />
                    </div>
                  )}
                </div>

                {/* Row: Author + Category + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                      <User size={13} /> Author *
                    </label>
                    <input required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                      placeholder="e.g. Elena Rossi"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${field}`} />
                  </div>
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                      <Tag size={13} /> Category *
                    </label>
                    <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${field}`}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                      <Calendar size={13} /> Date *
                    </label>
                    <input required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      placeholder="April 12, 2026"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${field}`} />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button type="button" onClick={closeModal}
                    className={`flex-1 py-4 rounded-2xl font-bold text-sm border transition-colors
                      ${isDarkMode ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 shadow-lg shadow-emerald-500/20">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : editingGuide ? 'Save Changes' : 'Add Guide'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════
          Delete Confirm Modal
      ════════════════════════════════ */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center
                ${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white border border-slate-100'}`}
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={28} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-black italic mb-2">Delete Guide?</h3>
              <p className={`text-sm mb-8 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                "<strong>{deleteTarget.title}</strong>" will be permanently removed from the registry.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)}
                  className={`flex-1 py-3 rounded-2xl border font-bold text-sm transition-colors
                    ${isDarkMode ? 'border-white/10 text-white/50 hover:bg-white/5' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-colors disabled:opacity-60">
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
