import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, FaCheckCircle, FaTimesCircle, 
  FaCalendarCheck, FaClock, FaCrown 
} from 'react-icons/fa';
import { dataService } from '../../services/dataService';
import Button from '../common/Button';

const AvailabilityChecker = ({ onOpenEnquiry }) => {
  // Default to a near future date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 20);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [checkDate, setCheckDate] = useState(defaultDateStr);
  const [result, setResult] = useState(dataService.checkDateAvailability(defaultDateStr));

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setCheckDate(newDate);
    setResult(dataService.checkDateAvailability(newDate));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-[#C9A227]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        {/* Decorative Top Glow */}
        <div className="absolute -top-10 right-10 w-48 h-48 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title & Date Selector */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold uppercase tracking-wider">
              <FaCrown className="text-[10px]" /> Live Hall Availability
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-100 leading-tight">
              Check Your Muhurtham Date
            </h3>

            <p className="text-xs text-stone-400 leading-relaxed">
              Select your proposed auspicious date to verify slot availability across our 1,200 capacity AC main hall and 600-seater dining hall.
            </p>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <FaCalendarAlt className="text-[#C9A227]" /> Select Proposed Event Date:
              </label>
              <input
                type="date"
                value={checkDate}
                onChange={handleDateChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 font-mono font-bold focus:outline-none focus:border-[#C9A227] shadow-inner"
              />
            </div>
          </div>

          {/* Right Column: Slot Status Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                <span className="text-xs font-bold text-stone-300 font-mono">Date: {checkDate}</span>
                {result.isAvailable ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <FaCheckCircle /> All Slots Open
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                    <FaClock /> Partially Booked
                  </span>
                )}
              </div>

              {/* Slots List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Morning Slot */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  result.availableSlots?.morning
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}>
                  <div>
                    <span className="font-bold block text-stone-100">Morning Slot</span>
                    <span className="text-[10px] opacity-80">5:00 AM - 2:00 PM</span>
                  </div>
                  <span className="font-bold text-[11px]">
                    {result.availableSlots?.morning ? '✓ AVAILABLE' : '✕ BOOKED'}
                  </span>
                </div>

                {/* Evening Slot */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  result.availableSlots?.evening
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/20 border-red-500/40 text-red-300'
                }`}>
                  <div>
                    <span className="font-bold block text-stone-100">Evening Slot</span>
                    <span className="text-[10px] opacity-80">3:00 PM - 11:00 PM</span>
                  </div>
                  <span className="font-bold text-[11px]">
                    {result.availableSlots?.evening ? '✓ AVAILABLE' : '✕ BOOKED'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => onOpenEnquiry(`Date Reservation: ${checkDate}`)}
                  icon={FaCalendarCheck}
                  className="w-full justify-center py-3 text-xs font-bold shadow-lg"
                >
                  Reserve Date ({checkDate})
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityChecker;
