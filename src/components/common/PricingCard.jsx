import React from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import Button from './Button';

const PricingCard = ({ pkg, onEnquire }) => {
  return (
    <div
      className={`relative rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 font-sans text-left ${
        pkg.popular
          ? 'bg-white border-2 border-[#B8860B] shadow-md z-10'
          : 'glass-card border border-stone-200 hover:border-stone-300 bg-white shadow-xs'
      }`}
    >
      {/* Most Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8860B] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs flex items-center gap-1">
          <FaStar className="text-amber-200 text-[10px]" /> Recommended
        </div>
      )}

      <div>
        <div className="mb-5">
          <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
            {pkg.period}
          </span>
          <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
            {pkg.name}
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            {pkg.tagline}
          </p>

          <div className="mt-3 pt-3 border-t border-stone-100">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-serif font-extrabold text-[#8B6508]">
                {pkg.price}
              </span>
              <span className="text-xs text-stone-500 font-medium">/ venue rental</span>
            </div>
            <span className="text-[10px] text-stone-500 italic block mt-0.5">* Taxes & custom decor extra</span>
          </div>
        </div>

        {/* Included Features */}
        <div className="space-y-2 mb-6">
          <p className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">Included Amenities:</p>
          {(pkg.features || []).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
              <FaCheckCircle className="text-[#B8860B] text-xs flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={pkg.popular ? 'primary' : 'secondary'}
        onClick={() => onEnquire && onEnquire(pkg.name)}
        className="w-full py-2.5 font-semibold text-xs shadow-xs"
      >
        Enquire Package
      </Button>
    </div>
  );
};

export default PricingCard;
