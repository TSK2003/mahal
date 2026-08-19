import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaFilter } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import LightboxModal from '../components/common/LightboxModal';
import useMahalData from '../hooks/useMahalData';

const CATEGORIES = ['All', 'Mandap', 'Main Hall', 'Dining', 'Suites', 'Lighting', 'Exterior', 'Decorations', 'Conference'];

const GalleryPage = () => {
  const { gallery } = useMahalData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = selectedCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === selectedCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Royal Portfolio"
        title="Photo Gallery & Ambiance"
        description="Browse high-resolution photographs of real wedding mandaps, banquet hall seating, crystal chandelier decors, and dining setups."
      />

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        <span className="text-xs uppercase text-stone-500 font-bold flex items-center gap-1.5 mr-2">
          <FaFilter className="text-[#B8860B]" /> Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#8B6508] text-white font-bold shadow-md scale-105'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#B8860B] hover:text-[#8B6508] shadow-xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-stone-200 hover:border-[#B8860B] cursor-pointer shadow-md hover:shadow-xl bg-white"
            >
              <img
                src={img.image}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                  {img.category}
                </span>
                <h4 className="text-white font-serif font-bold text-sm">
                  {img.title}
                </h4>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#8B6508] flex items-center justify-center text-xs shadow-md">
                  <FaExpand />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <LightboxModal
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};

export default GalleryPage;
