import React from 'react';
import { FaDirections, FaMapMarkerAlt } from 'react-icons/fa';
import { MAHAL_INFO } from '../../data/mahalData';

// Modular dark map themes for easy future updates
export const MAP_THEMES = {
  dark: "grayscale(100%) invert(92%) contrast(135%) hue-rotate(180deg) brightness(88%)",
  midnight: "grayscale(100%) invert(95%) contrast(150%) brightness(80%)",
  goldDark: "grayscale(80%) invert(90%) contrast(130%) sepia(20%) hue-rotate(170deg) brightness(90%)",
  standard: "none"
};

const GoogleMap = ({ theme = 'dark', className = '' }) => {
  const filterStyle = MAP_THEMES[theme] || MAP_THEMES.dark;

  return (
    <div className={`glass-card rounded-3xl overflow-hidden border border-stone-800/80 shadow-2xl relative flex flex-col justify-between ${className}`}>
      {/* Map Header Overlay */}
      <div className="p-4 px-6 bg-stone-900/90 border-b border-stone-800/80 text-left flex items-center justify-between z-10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C9A227]/15 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-xs">
            <FaMapMarkerAlt />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A227]">
              Google Maps Location (Dark Theme)
            </span>
            <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-100">
              Murugu Mahal
            </h4>
          </div>
        </div>
        <a
          href={MAHAL_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#C9A227] hover:text-[#DFBA51] flex items-center gap-1.5 font-semibold transition-colors px-3 py-1 rounded-lg bg-[#C9A227]/10 border border-[#C9A227]/30"
        >
          Directions <FaDirections />
        </a>
      </div>

      {/* Map Canvas with Dark Styling */}
      <div className="w-full flex-grow min-h-[380px] relative bg-stone-950">
        <iframe
          title="Murugu Mahal Dark Theme Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8524458376916!2d80.2078!3d13.0489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzU2LjEiTiA4MMKwMTInMjguMSJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
          className="w-full h-full min-h-[380px] border-0 rounded-b-3xl opacity-90 hover:opacity-100 transition-opacity duration-300"
          style={{ filter: filterStyle }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default GoogleMap;
