import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPhoneAlt, FaCrown, FaCheckCircle } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import heroVideo from '../../assets/WhatsApp Video 2026-08-04 at 15.43.25.mp4';

const Hero = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();
  const rawName = info?.name || 'Murugu Wedding Mahal';
  const nameParts = rawName.split(' ');
  const firstName = nameParts[0] || 'MURUGU';
  const restName = nameParts.slice(1).join(' ') || 'MAHAL';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32">
      {/* Background Video Stream occupying 100% viewport */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />
        </video>

        {/* Dark Luxury Overlay for optimal text readability */}
        <div className="absolute inset-0 bg-stone-950/65 z-10 backdrop-blur-[2px]" />

        {/* Smooth Luxury Gradient Transition into Next Section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0D0C0B] z-10 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-xs uppercase tracking-[0.2em] font-semibold mb-6 backdrop-blur-md shadow-lg"
        >
          <FaCrown className="text-sm" /> Premium Wedding Mahal & Convention Center
        </motion.div>

        {/* Mahal Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight text-stone-100 mb-4 leading-[1.1] drop-shadow-2xl"
        >
          {firstName} <span className="text-gold-gradient">{restName}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-2xl font-serif italic text-[#E5C158] mb-5 drop-shadow-md"
        >
          "{info?.tagline || 'Where Royal Traditions Meet Timeless Luxury'}"
        </motion.p>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl mx-auto text-xs sm:text-base text-stone-200 mb-8 leading-relaxed drop-shadow"
        >
          {info?.shortDesc || 'South India premier luxury wedding destination.'}
        </motion.p>

        {/* Features Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs text-stone-300"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 backdrop-blur-sm">
            <FaCheckCircle className="text-[#C9A227]" /> 1,200 Capacity AC Hall
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 backdrop-blur-sm">
            <FaCheckCircle className="text-[#C9A227]" /> 600 Dining Seats
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 backdrop-blur-sm">
            <FaCheckCircle className="text-[#C9A227]" /> 14 AC Suites
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 backdrop-blur-sm">
            <FaCheckCircle className="text-[#C9A227]" /> 250+ Car Parking
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

          <a href={`tel:${info?.phone || '+919876543210'}`}>
            <Button
              variant="secondary"
              icon={FaPhoneAlt}
              className="text-sm px-8 py-4 font-semibold backdrop-blur-md"
            >
              Call Desk: {info?.phone || '+91 98765 43210'}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-stone-400 text-xs">
        <span className="uppercase tracking-widest text-[10px] font-semibold text-stone-300">Explore Venue</span>
        <div className="w-5 h-8 border-2 border-stone-500 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <div className="w-1 h-2 bg-[#C9A227] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
