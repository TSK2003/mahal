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
  const [savedSuccess, setSavedSuccess] = useState(false);

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
    dataService.addGalleryImage(newImage);
    setIsAddModalOpen(false);
    setNewImage({ title: '', category: 'Mandap', image: '' });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDeleteImage = (id) => {
    if (window.confirm("Remove this image from the gallery?")) {
      dataService.deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Photo Gallery Media Manager
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Add, categorize, and curate high-resolution photographs displayed in the public gallery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <FaCheckCircle /> Photo Added Live!
            </span>
          )}

          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={FaPlus}
            className="text-xs px-5 py-2.5 font-bold shadow-lg"
          >
            Add New Photo
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="glass-card rounded-2xl p-4 border border-stone-800 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase text-stone-400 font-semibold flex items-center gap-1 mr-2">
          <FaFilter className="text-[#C9A227]" /> Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#C9A227] text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-[#C9A227]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredImages.map((img) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl overflow-hidden border border-stone-800 hover:border-[#C9A227] group relative shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden bg-stone-950 relative">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

              {/* Action Buttons on Hover */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="w-8 h-8 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 hover:bg-red-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase font-bold text-[#C9A227] bg-stone-950/80 px-2 py-0.5 rounded border border-[#C9A227]/30">
                  {img.category}
                </span>
                <h4 className="text-xs font-serif font-bold text-stone-100 mt-1 truncate">
                  {img.title}
                </h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- ADD PHOTO MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-stone-900 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white bg-stone-800 p-2 rounded-full cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="mb-5">
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  Media Library
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100 mt-0.5">
                  Add New Gallery Photo
                </h3>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Photo Title / Caption *</label>
                  <input
                    type="text"
                    required
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="E.g., Grand Chandelier Entrance Arch"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Category *</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Mandap">Mandap & Stage</option>
                    <option value="Main Hall">Main Hall Seating</option>
                    <option value="Dining">Dining Hall</option>
                    <option value="Suites">Suites & Rooms</option>
                    <option value="Lighting">Lighting & Chandeliers</option>
                    <option value="Exterior">Exterior & Parking</option>
                    <option value="Decorations">Decorations & Arch</option>
                    <option value="Conference">Conference Setup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Image URL (Unsplash / Cloud Storage / CDN) *</label>
                  <input
                    type="url"
                    required
                    value={newImage.image}
                    onChange={(e) => setNewImage({ ...newImage, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono text-[11px] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                {newImage.image && (
                  <div className="mt-2">
                    <span className="block text-[10px] text-stone-400 mb-1">Preview:</span>
                    <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                      <img
                        src={newImage.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" className="px-6 py-2.5 font-bold">
                    Add Photo
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
