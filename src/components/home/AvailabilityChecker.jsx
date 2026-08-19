import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaClock, FaCrown, FaCheck, FaTimes 
} from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="glass-card rounded-lg p-6 sm:p-8 border border-stone-200 shadow-xs text-left relative bg-white">
        <SectionTitle
          subtitle="Muhurtham Calendar"
          title="Live Hall Availability Checker"
          description="Select your proposed wedding or reception date to check Morning, Evening, and Full Day hall slot availability."
          align="left"
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Date Picker Input */}
          <div className="lg:col-span-4 space-y-3">
            <label className="block text-xs uppercase font-bold text-stone-700 tracking-wider">
              Select Proposed Event Date:
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2.5 text-stone-900 font-semibold text-sm focus:outline-none focus:border-[#B8860B] transition-colors cursor-pointer"
              />
              <FaCalendarAlt className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8860B] text-sm pointer-events-none" />
            </div>
            <p className="text-[11px] text-stone-500">
              * Prime dates for 2026 are subject to immediate booking verification.
            </p>
          </div>

          {/* Right: Slot Availability Badges */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Morning Slot */}
              <div className={`rounded-lg p-4 border text-center transition-all ${
                slotResult.availableSlots?.morning
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : 'bg-rose-50/80 border-rose-300'
              }`}>
                <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider mb-1">
                  <FaClock className={slotResult.availableSlots?.morning ? 'text-emerald-700' : 'text-rose-700'} />
                  <span className="text-stone-800">Morning Muhurtham</span>
                </div>
                <div className="text-[11px] text-stone-600 mb-2">5:00 AM – 2:00 PM</div>
                <div className="mb-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                    slotResult.availableSlots?.morning
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {slotResult.availableSlots?.morning ? <FaCheck className="text-[10px]" /> : <FaTimes className="text-[10px]" />}
                    <span>{slotResult.availableSlots?.morning ? 'Available' : 'Reserved'}</span>
                  </span>
                </div>
                {slotResult.availableSlots?.morning && (
                  <button
                    onClick={() => handleReserveSlot('Morning Slot (5 AM - 2 PM)')}
                    className="w-full py-1.5 rounded-md bg-white border border-emerald-400 text-emerald-800 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                  >
                    Reserve Morning
                  </button>
                )}
              </div>

              {/* Evening Slot */}
              <div className={`rounded-lg p-4 border text-center transition-all ${
                slotResult.availableSlots?.evening
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : 'bg-rose-50/80 border-rose-300'
              }`}>
                <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider mb-1">
                  <FaClock className={slotResult.availableSlots?.evening ? 'text-emerald-700' : 'text-rose-700'} />
                  <span className="text-stone-800">Evening Reception</span>
                </div>
                <div className="text-[11px] text-stone-600 mb-2">3:00 PM – 11:00 PM</div>
                <div className="mb-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                    slotResult.availableSlots?.evening
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {slotResult.availableSlots?.evening ? <FaCheck className="text-[10px]" /> : <FaTimes className="text-[10px]" />}
                    <span>{slotResult.availableSlots?.evening ? 'Available' : 'Reserved'}</span>
                  </span>
                </div>
                {slotResult.availableSlots?.evening && (
                  <button
                    onClick={() => handleReserveSlot('Evening Slot (3 PM - 11 PM)')}
                    className="w-full py-1.5 rounded-md bg-white border border-emerald-400 text-emerald-800 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                  >
                    Reserve Evening
                  </button>
                )}
              </div>

              {/* 24 Hours Full Day */}
              <div className={`rounded-lg p-4 border text-center transition-all ${
                slotResult.availableSlots?.fullDay
                  ? 'bg-amber-50/80 border-amber-300'
                  : 'bg-rose-50/80 border-rose-300'
              }`}>
                <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider mb-1">
                  <FaCrown className="text-[#8B6508]" />
                  <span className="text-stone-800">24-Hr Royal Wedding</span>
                </div>
                <div className="text-[11px] text-stone-600 mb-2">Full Day 24 Hours</div>
                <div className="mb-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                    slotResult.availableSlots?.fullDay
                      ? 'bg-[#B8860B] text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {slotResult.availableSlots?.fullDay ? <FaCheck className="text-[10px]" /> : <FaTimes className="text-[10px]" />}
                    <span>{slotResult.availableSlots?.fullDay ? 'Available' : 'Reserved'}</span>
                  </span>
                </div>
                {slotResult.availableSlots?.fullDay && (
                  <button
                    onClick={() => handleReserveSlot('24 Hours (Full Day)')}
                    className="w-full py-1.5 rounded-md bg-[#B8860B] hover:bg-[#9A7009] text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
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
