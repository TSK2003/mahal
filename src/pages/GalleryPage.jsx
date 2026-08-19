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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Royal Portfolio"
        title="Photo Gallery & Ambiance"
        description="Browse high-resolution photographs of real wedding mandaps, banquet hall seating, crystal chandelier decors, and dining setups."
      />

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
        <span className="text-xs uppercase text-stone-500 font-bold flex items-center gap-1 mr-1">
          <FaFilter className="text-[#B8860B] text-[10px]" /> Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#B8860B] text-white shadow-2xs font-bold'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden glass-card border border-stone-200 hover:border-stone-300 cursor-pointer shadow-xs bg-white"
          >
            <img
              src={img.image}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                {img.category}
              </span>
              <h4 className="text-white font-serif font-bold text-xs">
                {img.title}
              </h4>
              <div className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white text-[#8B6508] flex items-center justify-center text-[10px] shadow-xs">
                <FaExpand />
              </div>
            </div>
          </div>
        ))}
      </div>

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
