import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const EnquiryCTA = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden my-12">
      {/* Background Parallax Banner with Soft White Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
          alt="Grand Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/80 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs uppercase tracking-[0.25em] text-amber-200 font-bold px-4 py-1.5 rounded-full bg-white/10 border border-white/30 backdrop-blur-md"
        >
          Check Date Availability & Lock Your Muhurtham
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif text-white leading-tight"
        >
          Book Your Dream Event at {info?.name || 'Grand Mahal'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed"
        >
          Prime wedding dates for 2026 are filling up fast. Get in touch with our event reservation desk for instant date confirmation, custom catering options, and floor walk-throughs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-5"
        >
          <Button
            variant="primary"
            onClick={onOpenEnquiry}
            icon={FaCalendarCheck}
            className="text-base px-9 py-4 font-bold shadow-2xl scale-105"
          >
            Enquire Now
          </Button>

          <a
            href={`tel:${info?.phone || '+919840123456'}`}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-stone-900 border-2 border-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all font-bold text-sm shadow-xl"
          >
            <FaPhoneAlt className="text-[#B8860B]" />
            <span>Call Desk: {info?.phone || '+91 98401 23456'}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquiryCTA;
