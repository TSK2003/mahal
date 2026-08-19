import React from 'react';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const EnquiryCTA = ({ onOpenEnquiry }) => {
  const { info } = useMahalData();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden my-8 font-sans">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
          alt="Grand Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/75" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
        <span className="inline-block text-[11px] uppercase tracking-wider text-amber-200 font-bold px-3 py-1 rounded-md bg-white/10 border border-white/20">
          Check Date Availability & Lock Your Muhurtham
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
          Book Your Event at {info?.name || 'Grand Mahal'}
        </h2>

        <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
          Prime wedding dates for 2026 are filling up fast. Get in touch with our event reservation desk for instant date confirmation, custom catering options, and floor walk-throughs.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={onOpenEnquiry}
            icon={FaCalendarCheck}
            className="text-xs sm:text-sm px-6 py-3 font-semibold shadow-md"
          >
            Enquire Now
          </Button>

          <a
            href={`tel:${info?.phone || '+919840123456'}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 transition-all font-semibold text-xs shadow-md"
          >
            <FaPhoneAlt className="text-[#B8860B]" />
            <span>Call: {info?.phone || '+91 98401 23456'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnquiryCTA;
