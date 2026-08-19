import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LightboxModal = ({ images = [], currentIndex, onClose, onPrev, onNext }) => {
  if (currentIndex === null || currentIndex < 0 || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-stone-300 hover:text-white bg-stone-900/80 border border-stone-700 w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Prev button */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-stone-300 hover:text-[#C9A227] bg-stone-900/80 border border-stone-700 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        {/* Next button */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-stone-300 hover:text-[#C9A227] bg-stone-900/80 border border-stone-700 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
        >
          <FaChevronRight className="text-xl" />
        </button>

        {/* Main Content Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        >
          <div className="relative overflow-hidden rounded-xl border border-[#C9A227]/30 shadow-2xl bg-stone-900">
            <img
              src={currentImage?.image}
              alt={currentImage?.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-t-xl"
            />

            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-left">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  {currentImage?.category}
                </span>
                <h4 className="text-stone-100 font-serif font-bold text-lg mt-0.5">
                  {currentImage?.title}
                </h4>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
