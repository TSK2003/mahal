import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaCalendarCheck, FaPhoneAlt, FaPrint, 
  FaCrown, FaCheckCircle, FaWhatsapp, FaInfoCircle 
} from 'react-icons/fa';
import useMahalData from '../hooks/useMahalData';
import { dataService } from '../services/dataService';
import Button from '../components/common/Button';

const BookingStatusPage = () => {
  const { info } = useMahalData();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundBooking, setFoundBooking] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const result = dataService.getBookingByIdOrPhone(query);
    setFoundBooking(result || null);
    setSearched(true);
  };

  return (
    <div className="pb-20">
      {/* Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-stone-950 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold px-4 py-1.5 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30">
            Self-Service Reservation Portal
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-stone-100">
            Check Booking Status
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Enter your 6-digit Booking Reference ID (e.g. <span className="font-mono text-[#C9A227]">BK-8901</span>) or registered 10-digit mobile number to view reservation confirmation and download your booking slip.
          </p>
        </div>
      </section>

      {/* Search Input Container */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="glass-card rounded-3xl p-6 sm:p-8 border border-[#C9A227]/40 shadow-2xl space-y-4 text-left">
          <label className="block text-xs text-stone-300 font-medium">
            Enter Booking Reference ID or Mobile Number:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g., BK-8901 or 9840123456"
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="py-3.5 px-8 text-xs font-bold whitespace-nowrap justify-center shadow-lg"
            >
              Verify Status
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-stone-400">
            <span>💡 Try demo reference:</span>
            <button
              type="button"
              onClick={() => { setQuery('BK-8901'); }}
              className="text-[#C9A227] hover:underline font-mono font-bold cursor-pointer"
            >
              BK-8901
            </button>
            <span>or</span>
            <button
              type="button"
              onClick={() => { setQuery('BK-8902'); }}
              className="text-[#C9A227] hover:underline font-mono font-bold cursor-pointer"
            >
              BK-8902
            </button>
          </div>
        </form>

        {/* Results View */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              {foundBooking ? (
                <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#C9A227] text-left space-y-6 shadow-2xl">
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
                    <div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A227]">
                        Verified Reservation Found
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-stone-100 mt-0.5">
                        {foundBooking.customerName}
                      </h3>
                      <p className="text-xs text-stone-400 font-mono">Reference: {foundBooking.id}</p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
                          foundBooking.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        <FaCheckCircle /> {foundBooking.status} Reservation
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 uppercase">Event Occasion</span>
                      <span className="font-bold text-stone-100 block text-sm mt-0.5">{foundBooking.eventType}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 uppercase">Reserved Date & Slot</span>
                      <span className="font-bold text-[#C9A227] font-mono block text-sm mt-0.5">
                        {foundBooking.eventDate} ({foundBooking.timeSlot})
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 uppercase">Selected Package</span>
                      <span className="font-semibold text-stone-200 block mt-0.5">{foundBooking.packageBooked}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 uppercase">Guest Capacity Setup</span>
                      <span className="font-semibold text-stone-200 block mt-0.5">{foundBooking.guests}</span>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Total Venue Tariff:</span>
                      <span className="font-bold text-stone-100 font-mono">₹{Number(foundBooking.totalAmount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Advance Received:</span>
                      <span className="font-bold font-mono">₹{Number(foundBooking.advancePaid).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[#C9A227] font-bold pt-2 border-t border-stone-800 text-sm">
                      <span>Balance Due on Event Day:</span>
                      <span className="font-mono">₹{Number(foundBooking.balanceDue).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button
                      variant="primary"
                      onClick={() => window.print()}
                      icon={FaPrint}
                      className="text-xs px-6 py-3 font-bold"
                    >
                      Print Booking Slip
                    </Button>

                    <a
                      href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(`Hello Murugu Mahal! I have a question regarding my booking ${foundBooking.id} for ${foundBooking.eventDate}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366] hover:text-white transition-all"
                    >
                      <FaWhatsapp className="text-sm" /> Chat with Event Desk
                    </a>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-3xl p-8 border border-stone-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mx-auto">
                    <FaInfoCircle />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-100">
                    No Booking Record Found
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    We could not find a reservation matching "<span className="text-stone-200 font-mono">{query}</span>". Please double-check your booking reference or contact our reservation desk.
                  </p>
                  <a
                    href={`tel:${info.phone}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A227] hover:underline pt-2"
                  >
                    <FaPhoneAlt /> Call Desk: {info.phone}
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default BookingStatusPage;
