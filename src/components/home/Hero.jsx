import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPhoneAlt, FaCrown, FaCheckCircle } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import heroVideo from '../../assets/WhatsApp Video 2026-08-04 at 15.43.25.mp4';

const Hero = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();
  const rawName = info?.name || 'Grand Mahal';
  const nameParts = rawName.split(' ');
  const firstName = nameParts[0] || 'GRAND';
  const restName = nameParts.slice(1).join(' ') || 'MAHAL';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-28 sm:py-36">
      {/* Background Video Stream */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />
        </video>

        {/* Ethereal Translucent Milky White Overlay for contrast and warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/40 to-[#FAF8F5] z-10" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#B8860B]/50 text-[#8B6508] text-xs uppercase tracking-[0.2em] font-bold mb-6 backdrop-blur-md shadow-lg"
        >
          <FaCrown className="text-sm text-[#B8860B]" /> Premier Wedding Mahal & Convention Center
        </motion.div>

        {/* Mahal Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight text-white mb-4 leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
        >
          {firstName} <span className="text-[#FDF0A6]">{restName}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-2xl font-serif italic text-amber-100 mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          "{info?.tagline || 'Where Royal Traditions Meet Timeless Luxury'}"
        </motion.p>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl mx-auto text-xs sm:text-base text-stone-100 mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium"
        >
          {info?.shortDesc || "South India's premier luxury wedding destination and convention center."}
        </motion.p>

        {/* Features Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs text-stone-800 font-semibold"
        >
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B8860B]/40 shadow-md">
            <FaCheckCircle className="text-[#B8860B]" /> 1,200 Capacity AC Hall
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B8860B]/40 shadow-md">
            <FaCheckCircle className="text-[#B8860B]" /> 600 Dining Seats
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B8860B]/40 shadow-md">
            <FaCheckCircle className="text-[#B8860B]" /> 14 AC Suites
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B8860B]/40 shadow-md">
            <FaCheckCircle className="text-[#B8860B]" /> 250+ Car Parking
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            onClick={onOpenEnquiry}
            icon={FaCalendarCheck}
            className="text-sm px-9 py-4 font-bold shadow-2xl scale-105"
          >
            Enquire Dates
          </Button>

          <a href={`tel:${info?.phone || '+919840123456'}`}>
            <Button
              variant="secondary"
              icon={FaPhoneAlt}
              className="text-sm px-8 py-4 font-bold backdrop-blur-md"
            >
              Call Desk: {info?.phone || '+91 98401 23456'}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-stone-600 text-xs">
        <span className="uppercase tracking-widest text-[10px] font-bold text-stone-700">Explore Venue</span>
        <div className="w-5 h-8 border-2 border-[#B8860B] rounded-full flex justify-center p-1 bg-white/60 shadow-xs">
          <div className="w-1.5 h-2 bg-[#B8860B] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
