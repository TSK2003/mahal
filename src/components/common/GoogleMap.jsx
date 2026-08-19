import React from 'react';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';

const GoogleMap = ({ theme = 'light', className = '' }) => {
  const { info } = useMahalData();
  const mapsUrl = info?.googleMapsUrl || 'https://maps.google.com';

  return (
    <div className={`relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-stone-200 ${className}`}>
      {/* Embedded Google Map Iframe */}
      <iframe
        title="Grand Mahal Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124419.04351322055!2d80.06892548842774!3d12.965768800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f77864f1d43%3A0xe54e3cb484cfbc94!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full object-cover"
      />

      {/* Floating Info Tag on Map */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-[#B8860B]/40 p-4 rounded-2xl shadow-lg text-left max-w-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B6508] uppercase tracking-wider mb-1">
          <FaMapMarkerAlt /> {info?.name || 'Grand Mahal'}
        </div>
        <p className="text-[11px] text-stone-700 leading-tight mb-2.5 font-medium">
          {info?.address}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8B6508] hover:underline"
        >
          <FaDirections /> Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
};

export default GoogleMap;
