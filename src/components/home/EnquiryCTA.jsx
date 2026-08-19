import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const EnquiryCTA = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden my-12">
      {/* Background Parallax Banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
          alt="Royal Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold px-4 py-1.5 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30"
        >
          Check Date Availability & Lock Your Muhurtham
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-serif text-stone-100 leading-tight"
        >
          Book Your Dream Event at {info.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed"
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
            href={`tel:${info.phone}`}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-stone-900 border border-[#C9A227] text-stone-100 hover:text-[#C9A227] transition-all font-semibold text-sm shadow-xl"
          >
            <FaPhoneAlt className="text-[#C9A227]" />
            <span>Call Desk: {info.phone}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquiryCTA;
