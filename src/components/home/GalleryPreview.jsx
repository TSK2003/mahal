import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaExpand, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import LightboxModal from '../common/LightboxModal';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const GalleryPreview = () => {
  const { gallery } = useMahalData();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const previewImages = gallery.slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionTitle
          subtitle="Visual Tour"
          title="Photo Gallery Highlights"
          description="Explore our grand mandap stages, high ceiling chandeliers, dining halls, and exterior illuminations."
          align="left"
          className="mb-0"
        />

        <NavLink to="/gallery" className="hidden sm:block">
          <Button variant="secondary" icon={FaArrowRight}>
            View Full Gallery
          </Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {previewImages.map((img, idx) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3.5 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                {img.category}
              </span>
              <h4 className="text-white font-serif font-bold text-xs">
                {img.title}
              </h4>
              <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-white text-[#8B6508] flex items-center justify-center text-[10px] shadow-xs">
                <FaExpand />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <NavLink to="/gallery">
          <Button variant="secondary" icon={FaArrowRight} className="w-full justify-center">
            View Full Gallery
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
