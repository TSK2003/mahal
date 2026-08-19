import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import Button from './Button';

const PricingCard = ({ pkg, onEnquire }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        pkg.popular
          ? 'bg-white border-2 border-[#B8860B] shadow-[0_15px_40px_rgba(184,134,11,0.22)] scale-105 z-10'
          : 'glass-card border border-stone-200 hover:border-[#B8860B] bg-white shadow-md'
      }`}
    >
      {/* Most Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#8B6508] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <FaStar className="text-amber-200" /> Most Popular Choice
        </div>
      )}

      <div>
        <div className="text-left mb-6">
          <span className="text-xs uppercase tracking-wider text-[#8B6508] font-bold">
            {pkg.period}
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            {pkg.name}
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            {pkg.tagline}
          </p>

          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#8B6508]">
                {pkg.price}
              </span>
              <span className="text-xs text-stone-500 font-semibold">/ venue rental</span>
            </div>
            <span className="text-[11px] text-stone-500 italic block mt-0.5">* Taxes & custom decor extra</span>
          </div>
        </div>

        {/* Included Features */}
        <div className="space-y-3 mb-8 text-left">
          <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Included Amenities:</p>
          {(pkg.features || []).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-medium">
              <FaCheckCircle className="text-[#B8860B] text-sm flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={pkg.popular ? 'primary' : 'secondary'}
        onClick={() => onEnquire && onEnquire(pkg.name)}
        className="w-full py-3.5 font-bold shadow-md"
      >
        Enquire Package
      </Button>
    </motion.div>
  );
};

export default PricingCard;
