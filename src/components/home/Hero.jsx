import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaPhoneAlt, FaStar, 
  FaShieldAlt, FaUsers, FaArrowRight, FaCrown, FaCheck 
} from 'react-icons/fa';
import { Md360 } from 'react-icons/md';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const Hero = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F8F9FA]">
      {/* Background Soft Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-100/60 via-amber-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-7">
        
        {/* Top Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#B8860B]/40 text-[#8B6508] shadow-xs text-xs font-semibold uppercase tracking-wider"
        >
          <FaCrown className="text-xs text-[#B8860B]" />
          <span>Royal Wedding & Convention Center • Established {info?.establishedYear || 2012}</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.1]">
            Experience Royal Splendor at{' '}
            <span className="text-gold-gradient block mt-1">
              {info?.name || 'Grand Mahal'}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-stone-600 max-w-3xl mx-auto font-sans font-normal leading-relaxed pt-2">
            South India's premier air-conditioned wedding palace, featuring a 1,200-seat grand auditorium, 600-seat banquet dining hall, 14 luxury guest suites, and ample car parking.
          </p>
        </motion.div>

        {/* Key Feature Chips (Zoho Style 8px rounded badges) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs text-stone-700 font-medium"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <FaCheck className="text-emerald-600 text-xs" />
            <span>1,200 Guest Capacity</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <FaCheck className="text-emerald-600 text-xs" />
            <span>600 Seater Dining Hall</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <FaCheck className="text-emerald-600 text-xs" />
            <span>14 AC Deluxe Suites</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <FaCheck className="text-emerald-600 text-xs" />
            <span>250 KVA DG Backup</span>
          </div>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-3"
        >
          <Button
            variant="primary"
            onClick={onOpenEnquiry}
            icon={FaCalendarCheck}
            className="text-sm px-6 py-3 font-semibold shadow-xs"
          >
            Check Date Availability
          </Button>

          <a
            href={info?.virtualTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-stone-300 hover:border-[#B8860B] text-stone-800 hover:text-[#8B6508] font-semibold text-xs transition-all shadow-xs"
          >
            <Md360 className="text-lg text-[#B8860B]" />
            <span>360° Virtual Tour</span>
          </a>

          <a
            href={`tel:${info?.phone}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-all border border-stone-200 shadow-xs"
          >
            <FaPhoneAlt className="text-xs text-[#B8860B]" />
            <span>Direct Call Desk</span>
          </a>
        </motion.div>

        {/* Hero Bottom Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-lg overflow-hidden border border-stone-300 shadow-sm mt-8"
        >
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80"
            alt="Grand Mahal Main Auditorium Stage"
            className="w-full h-[320px] sm:h-[440px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-6 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Auditorium & Stage Setup
              </span>
              <h3 className="text-white font-serif font-bold text-lg sm:text-xl">
                Grand Traditional Wedding & Reception Mandap
              </h3>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
