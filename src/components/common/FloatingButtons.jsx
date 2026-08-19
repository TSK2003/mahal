import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Md360 } from 'react-icons/md';
import useMahalData from '../../hooks/useMahalData';

const FloatingButtons = () => {
  const { info } = useMahalData();

  return (
    <div className="fixed inset-x-0 bottom-6 pointer-events-none z-50 px-4 sm:px-6 flex items-end justify-between">
      {/* Call Floating Button - Bottom Left */}
      <a
        href={`tel:${info.phone}`}
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-stone-900/90 backdrop-blur-md border border-[#C9A227]/50 text-[#C9A227] rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Call Us Now"
      >
        <div className="w-9 h-9 rounded-full bg-[#C9A227] text-stone-950 flex items-center justify-center text-lg font-bold">
          <FaPhoneAlt />
        </div>
        <span className="hidden sm:inline font-semibold text-xs text-stone-100 tracking-wider">
          CALL NOW
        </span>
      </a>

      {/* Floating Action Stack - Bottom Right */}
      <div className="flex flex-col items-end gap-3.5 pointer-events-none">
        
        {/* 1. 360° Virtual Tour Floating Button */}
        <div className="group relative flex items-center justify-end pointer-events-auto">
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-stone-950/95 border border-[#C9A227]/50 text-[#C9A227] text-xs font-semibold tracking-wider whitespace-nowrap shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-ping" />
            360° Virtual Tour
          </div>

          {/* Circular Button */}
          <a
            href={info.virtualTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="360° Virtual Tour"
            className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-[#DFBA51] via-[#C9A227] to-[#997A15] text-stone-950 shadow-[0_6px_25px_rgba(201,162,39,0.5)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 pulse-gold cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center leading-none">
              <Md360 className="text-2xl font-extrabold group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-[8px] font-extrabold tracking-tighter uppercase mt-0.5">360° TOUR</span>
            </div>
          </a>
        </div>

        {/* 2. WhatsApp Floating Button */}
        <div className="group relative flex items-center justify-end pointer-events-auto">
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-stone-950/95 border border-[#25D366]/50 text-[#25D366] text-xs font-semibold tracking-wider whitespace-nowrap shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            Chat on WhatsApp
          </div>

          {/* Circular WhatsApp Button */}
          <a
            href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(`Hello! I would like to enquire about booking dates at ${info.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 pulse-whatsapp cursor-pointer"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default FloatingButtons;
