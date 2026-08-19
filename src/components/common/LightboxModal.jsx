import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LightboxModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          aria-label="Previous Image"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          aria-label="Next Image"
        >
          <FaChevronRight className="text-xl" />
        </button>

        {/* Main Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center rounded-lg overflow-hidden bg-black"
        >
          <img
            src={currentImage?.image}
            alt={currentImage?.title || 'Gallery Image'}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Caption Bar */}
          <div className="w-full bg-stone-900/90 text-white p-3.5 flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {currentImage?.category}
              </span>
              <h4 className="text-sm font-serif font-bold text-stone-100 mt-0.5">
                {currentImage?.title}
              </h4>
            </div>
            <div className="text-xs text-stone-400 font-mono">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
