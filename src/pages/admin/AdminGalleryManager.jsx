import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaTrash, FaFilter, 
  FaTimes, FaCheckCircle 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const CATEGORIES = ['All', 'Mandap', 'Main Hall', 'Dining', 'Suites', 'Lighting', 'Exterior', 'Decorations', 'Conference'];

const AdminGalleryManager = () => {
  const { gallery } = useMahalData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Mandap',
    image: ''
  });

  const filteredImages = selectedCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === selectedCategory);

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImage.image || !newImage.title) return;

    dataService.addGalleryImage(newImage);
    setNewImage({ title: '', category: 'Mandap', image: '' });
    setIsAddModalOpen(false);
    setSaveMessage('Photo added successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteImage = (id) => {
    if (window.confirm('Delete this photo from the public gallery?')) {
      dataService.deleteGalleryImage(id);
      setSaveMessage('Photo removed.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            High-Definition Media Asset Library
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            Photo Gallery Manager ({gallery.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <FaCheckCircle /> {saveMessage}
            </span>
          )}

          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={FaPlus}
            className="text-xs py-2.5 font-bold shadow-md"
          >
            Add New Photo
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1.5 mr-2">
          <FaFilter className="text-[#B8860B]" /> Category:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#B8860B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-[#B8860B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="glass-card rounded-2xl overflow-hidden border border-stone-200 hover:border-[#B8860B] transition-all shadow-md group relative flex flex-col justify-between bg-white"
          >
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/95 text-[#8B6508] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#B8860B]/30 shadow-xs">
                {img.category}
              </span>

              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center text-xs shadow-md transition-colors cursor-pointer"
                title="Delete Photo"
              >
                <FaTrash />
              </button>
            </div>

            <div className="p-4 text-left">
              <h4 className="font-serif font-bold text-stone-900 text-xs truncate">
                {img.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border-2 border-[#B8860B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-xs"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="border-b border-stone-200 pb-3 mb-5">
                <span className="text-xs uppercase font-bold text-[#8B6508]">Gallery CMS</span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Upload Photo Link</h3>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Photo Title / Caption *</label>
                  <input
                    type="text"
                    required
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="e.g. Royal Stage Flower Arch"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Image URL (Unsplash / CDN / Cloudinary) *</label>
                  <input
                    type="url"
                    required
                    value={newImage.image}
                    onChange={(e) => setNewImage({ ...newImage, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                {newImage.image && (
                  <div className="aspect-video rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img src={newImage.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <Button type="submit" variant="primary" className="flex-1 py-3 font-bold">
                    Publish Photo
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="py-3">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGalleryManager;
