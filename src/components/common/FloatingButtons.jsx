import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Md360 } from 'react-icons/md';
import useMahalData from '../../hooks/useMahalData';

const FloatingButtons = () => {
  const { info } = useMahalData();

  return (
    <div className="fixed inset-x-0 bottom-5 pointer-events-none z-50 px-4 sm:px-6 flex items-end justify-between font-sans">
      {/* Call Floating Button - Bottom Left */}
      <a
        href={`tel:${info?.phone || '+919840123456'}`}
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 bg-white border border-stone-300 text-[#8B6508] rounded-lg shadow-md hover:border-[#B8860B] hover:shadow-lg transition-all"
        aria-label="Call Us Now"
      >
        <div className="w-7 h-7 rounded-md bg-[#B8860B] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
          <FaPhoneAlt />
        </div>
        <span className="hidden sm:inline font-bold text-xs text-stone-900 tracking-wider">
          CALL NOW
        </span>
      </a>

      {/* Floating Action Stack - Bottom Right */}
      <div className="flex flex-col items-end gap-2.5 pointer-events-none">
        
        {/* 1. 360° Virtual Tour Floating Button */}
        <div className="group relative flex items-center justify-end pointer-events-auto">
          {/* Tooltip */}
          <div className="absolute right-full mr-2.5 px-2.5 py-1 rounded-md bg-stone-900 text-amber-200 text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            360° Virtual Tour
          </div>

          {/* Circular Button */}
          <a
            href={info?.virtualTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="360° Virtual Tour"
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#B8860B] text-white shadow-md hover:bg-[#9A7009] transition-all cursor-pointer"
          >
            <Md360 className="text-xl font-bold" />
          </a>
        </div>

        {/* 2. WhatsApp Floating Button */}
        <div className="group relative flex items-center justify-end pointer-events-auto">
          {/* Tooltip */}
          <div className="absolute right-full mr-2.5 px-2.5 py-1 rounded-md bg-stone-900 text-emerald-300 text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            Chat on WhatsApp
          </div>

          {/* Circular WhatsApp Button */}
          <a
            href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent(`Hello! I would like to enquire about booking dates at ${info?.name || 'Grand Mahal'}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#25D366] text-white shadow-md hover:bg-[#1EBE5D] transition-all cursor-pointer"
          >
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default FloatingButtons;
