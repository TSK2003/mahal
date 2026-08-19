import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaCheckCircle, 
  FaCalendarCheck, FaClock, FaCrown 
} from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { dataService } from '../../services/dataService';

const AvailabilityChecker = ({ onOpenEnquiry }) => {
  const [selectedDate, setSelectedDate] = useState('2026-09-12');
  const [slotResult, setSlotResult] = useState(() => dataService.checkDateAvailability('2026-09-12'));

  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    setSelectedDate(dateVal);
    const res = dataService.checkDateAvailability(dateVal);
    setSlotResult(res);
  };

  const handleReserveSlot = (slotName) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`Reservation Request: ${selectedDate} (${slotName})`);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-[#B8860B]/30 shadow-xl text-left relative overflow-hidden bg-white/95">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

        <SectionTitle
          subtitle="Auspicious Muhurtham Dates"
          title="Live Hall Availability Checker"
          description="Select your proposed wedding or reception date to check Morning, Evening, and Full Day hall slot availability."
          align="left"
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Date Picker Input */}
          <div className="lg:col-span-4 space-y-4">
            <label className="block text-xs uppercase font-bold text-stone-700 tracking-wider">
              Select Proposed Event Date:
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full bg-amber-50/50 border-2 border-[#B8860B]/40 rounded-2xl px-4 py-3.5 text-stone-900 font-serif font-bold text-base sm:text-lg focus:outline-none focus:border-[#B8860B] transition-colors cursor-pointer shadow-inner"
              />
              <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8860B] text-lg pointer-events-none" />
            </div>
            <p className="text-xs text-stone-500">
              * Prime wedding dates for 2026 are subject to immediate booking verification.
            </p>
          </div>

          {/* Right: Slot Availability Badges */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Morning Slot */}
              <div className={`rounded-2xl p-5 border text-center transition-all ${
                slotResult.availableSlots?.morning
                  ? 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                  : 'bg-rose-50/90 border-rose-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
                  <FaClock className={slotResult.availableSlots?.morning ? 'text-emerald-600' : 'text-rose-600'} />
                  <span className="text-stone-800">Morning Muhurtham</span>
                </div>
                <div className="text-xs text-stone-600 mb-3">5:00 AM – 2:00 PM</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  slotResult.availableSlots?.morning
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {slotResult.availableSlots?.morning ? '✓ Available' : '✕ Reserved'}
                </span>
                {slotResult.availableSlots?.morning && (
                  <button
                    onClick={() => handleReserveSlot('Morning Slot (5 AM - 2 PM)')}
                    className="w-full py-2 rounded-xl bg-white border border-emerald-400 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-xs"
                  >
                    Reserve Morning
                  </button>
                )}
              </div>

              {/* Evening Slot */}
              <div className={`rounded-2xl p-5 border text-center transition-all ${
                slotResult.availableSlots?.evening
                  ? 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                  : 'bg-rose-50/90 border-rose-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
                  <FaClock className={slotResult.availableSlots?.evening ? 'text-emerald-600' : 'text-rose-600'} />
                  <span className="text-stone-800">Evening Reception</span>
                </div>
                <div className="text-xs text-stone-600 mb-3">3:00 PM – 11:00 PM</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  slotResult.availableSlots?.evening
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {slotResult.availableSlots?.evening ? '✓ Available' : '✕ Reserved'}
                </span>
                {slotResult.availableSlots?.evening && (
                  <button
                    onClick={() => handleReserveSlot('Evening Slot (3 PM - 11 PM)')}
                    className="w-full py-2 rounded-xl bg-white border border-emerald-400 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-xs"
                  >
                    Reserve Evening
                  </button>
                )}
              </div>

              {/* 24 Hours Full Day */}
              <div className={`rounded-2xl p-5 border text-center transition-all ${
                slotResult.availableSlots?.fullDay
                  ? 'bg-amber-50/90 border-[#B8860B]/40 shadow-sm'
                  : 'bg-rose-50/90 border-rose-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
                  <FaCrown className="text-[#B8860B]" />
                  <span className="text-stone-800">24-Hr Royal Wedding</span>
                </div>
                <div className="text-xs text-stone-600 mb-3">Full Day 24 Hours</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  slotResult.availableSlots?.fullDay
                    ? 'bg-[#B8860B] text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {slotResult.availableSlots?.fullDay ? '★ Available' : '✕ Reserved'}
                </span>
                {slotResult.availableSlots?.fullDay && (
                  <button
                    onClick={() => handleReserveSlot('24 Hours (Full Day)')}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-xs font-bold hover:shadow-md transition-all cursor-pointer"
                  >
                    Book Full Day
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityChecker;
