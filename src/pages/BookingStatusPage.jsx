import React, { useState } from 'react';
import { 
  FaSearch, FaPhoneAlt, FaPrint, 
  FaCheck, FaWhatsapp, FaInfoCircle, FaCheckCircle 
} from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import useMahalData from '../hooks/useMahalData';
import { dataService } from '../services/dataService';

const BookingStatusPage = () => {
  const { info } = useMahalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = dataService.getBookingByIdOrPhone(searchQuery);
    setSearchResult(found || null);
    setSearched(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans">
      <SectionTitle
        subtitle="Self-Service Portal"
        title="Check Booking & Muhurtham Status"
        description="Enter your 6-digit Booking Reference ID (e.g. BK-8901) or registered Mobile Number to track confirmation status and download your booking slip."
      />

      {/* Search Bar Container */}
      <div className="glass-card rounded-lg p-5 sm:p-6 border border-stone-200 shadow-xs max-w-2xl mx-auto mb-10 bg-white">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Booking ID (e.g. BK-8901) or Phone..."
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2.5 pl-9 text-stone-900 text-xs font-medium focus:outline-none focus:border-[#B8860B]"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
          </div>

          <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold shadow-xs">
            Verify Status
          </Button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 px-1">
          <span>Sample demo ID: <strong className="text-[#8B6508] cursor-pointer hover:underline" onClick={() => { setSearchQuery('BK-8901'); dataService.getBookingByIdOrPhone('BK-8901'); }}>BK-8901</strong> or <strong className="text-[#8B6508] cursor-pointer hover:underline" onClick={() => setSearchQuery('BK-8902')}>BK-8902</strong></span>
        </div>
      </div>

      {/* Search Results Display */}
      {searched && (
        <div className="max-w-3xl mx-auto">
          {searchResult ? (
            <div className="glass-card rounded-lg p-6 sm:p-8 border border-stone-200 shadow-sm text-left bg-white relative">
              {/* Status Header Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
                    Reservation Slip
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    {searchResult.customerName}
                  </h3>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Ref ID: {searchResult.id} • Registered {searchResult.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    searchResult.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : searchResult.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {searchResult.status === 'Confirmed' ? 'Confirmed' : 'Pending Review'}
                  </span>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-0.5">
                  <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-bold">Event & Date</span>
                  <span className="font-serif font-bold text-stone-900 text-xs block">{searchResult.eventType}</span>
                  <span className="text-[#8B6508] font-mono font-semibold">{searchResult.eventDate} ({searchResult.timeSlot})</span>
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-0.5">
                  <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-bold">Contact & Guests</span>
                  <span className="font-mono text-stone-900 font-bold block">{searchResult.phone}</span>
                  <span className="text-stone-600 font-medium">Capacity: {searchResult.guests}</span>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="rounded-lg border border-stone-200 overflow-hidden mb-4 text-xs">
                <div className="bg-stone-50 px-3.5 py-2 font-serif font-bold text-stone-800 flex justify-between border-b border-stone-200">
                  <span>Billing Component</span>
                  <span>Amount (INR)</span>
                </div>
                <div className="p-3.5 space-y-1.5 bg-white text-stone-700">
                  <div className="flex justify-between">
                    <span>Venue Package ({searchResult.packageBooked}):</span>
                    <span className="font-mono font-semibold text-stone-900">₹{Number(searchResult.totalAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Advance Payment Received:</span>
                    <span className="font-mono">- ₹{Number(searchResult.advancePaid || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-1.5 border-t border-stone-200 flex justify-between font-bold text-xs text-stone-900">
                    <span>Balance Due:</span>
                    <span className="font-mono text-[#8B6508]">₹{Number(searchResult.balanceDue || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {searchResult.notes && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-stone-700 mb-4">
                  <span className="font-bold text-[#8B6508] block mb-0.5">Notes:</span>
                  {searchResult.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <Button
                  variant="primary"
                  onClick={handlePrintSlip}
                  icon={FaPrint}
                  className="text-xs py-2 font-semibold shadow-xs"
                >
                  Print Receipt Slip
                </Button>

                <a
                  href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent(`Hello! Inquiring regarding my booking ${searchResult.id} (${searchResult.customerName}) at Grand Mahal.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
                >
                  <FaWhatsapp className="text-sm" /> Chat with Desk
                </a>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-lg p-8 border border-stone-200 text-center space-y-3 bg-white shadow-xs">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center text-xl mx-auto border border-rose-200">
                <FaInfoCircle />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                No Record Found for "{searchQuery}"
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Please double-check your 6-digit Booking ID or phone number. If you recently submitted an online enquiry, our reservation desk will assign an ID shortly.
              </p>
              <div className="pt-1">
                <a href={`tel:${info?.phone}`}>
                  <Button variant="secondary" icon={FaPhoneAlt} className="text-xs py-2">
                    Call Help Desk: {info?.phone}
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingStatusPage;
