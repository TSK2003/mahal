import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExpand, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import LightboxModal from '../common/LightboxModal';
import useMahalData from '../../hooks/useMahalData';

const GalleryPreview = () => {
  const { gallery } = useMahalData();
  const previewImages = gallery.slice(0, 8);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Visual Splendor"
        title="Royal Gallery Preview"
        description="A glimpse into the stunning floral decors, chandelier lighting, and grand setups hosted at Murugu Mahal."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {previewImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-stone-800 hover:border-[#C9A227] cursor-pointer shadow-lg"
          >
            <img
              src={img.image}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A227]">
                {img.category}
              </span>
              <h4 className="text-stone-100 font-serif font-bold text-sm">
                {img.title}
              </h4>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 border border-[#C9A227] text-[#C9A227] flex items-center justify-center text-xs">
                <FaExpand />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <NavLink to="/gallery">
          <Button variant="primary" icon={FaArrowRight} className="px-8 py-3.5">
            View Full Gallery ({gallery.length}+ Photos)
          </Button>
        </NavLink>
      </div>

      <LightboxModal
        images={previewImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : previewImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < previewImages.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
};

export default GalleryPreview;
