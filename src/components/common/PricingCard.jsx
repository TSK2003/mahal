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
          ? 'bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-[#C9A227] shadow-[0_10px_40px_rgba(201,162,39,0.3)] scale-105 z-10'
          : 'glass-card border border-stone-800 hover:border-[#C9A227]/50'
      }`}
    >
      {/* Most Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DFBA51] to-[#997A15] text-stone-950 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <FaStar /> Most Popular Choice
        </div>
      )}

      <div>
        <div className="text-left mb-6">
          <span className="text-xs uppercase tracking-wider text-[#C9A227] font-semibold">
            {pkg.period}
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-100 mt-1">
            {pkg.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {pkg.tagline}
          </p>

          <div className="mt-4 pt-4 border-t border-stone-800">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-gold-gradient">
                {pkg.price}
              </span>
              <span className="text-xs text-stone-400">/ venue rental</span>
            </div>
            <span className="text-[11px] text-stone-500 italic block mt-0.5">* Taxes & custom decor extra</span>
          </div>
        </div>

        {/* Included Features */}
        <div className="space-y-3 mb-8 text-left">
          <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Included Amenities:</p>
          {pkg.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
              <FaCheckCircle className="text-[#C9A227] text-sm flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={pkg.popular ? 'primary' : 'secondary'}
        onClick={() => onEnquire && onEnquire(pkg.name)}
        className="w-full py-3.5 font-bold"
      >
        Enquire Package
      </Button>
    </motion.div>
  );
};

export default PricingCard;
