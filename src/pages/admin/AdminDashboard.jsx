import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaHourglassHalf, FaRupeeSign, FaCheckCircle, 
  FaCalendarAlt, FaPlus, FaImages, FaEdit, FaWhatsapp, 
  FaPhoneAlt, FaArrowRight, FaCrown, FaCheck, FaBuilding
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';

const AdminDashboard = () => {
  const { info, bookings, gallery, packages } = useMahalData();

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
  const pendingBookings = bookings.filter(b => b.status === 'Pending');

  const totalRevenue = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  const totalAdvance = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (Number(curr.advancePaid) || 0), 0);

  const handleQuickStatusChange = (booking, newStatus) => {
    dataService.updateBooking({ ...booking, status: newStatus });
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Top Header Card */}
      <div className="glass-card rounded-lg p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B6508] uppercase tracking-wider mb-1">
            <FaCrown className="text-xs" /> Operations Dashboard
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            {info?.name || 'Grand Mahal'} Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time venue reservations, availability status, and revenue tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/admin/bookings"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#B8860B] hover:bg-[#9A7009] text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <FaPlus className="text-[10px]" /> New Booking
          </NavLink>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Bookings */}
        <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
              <FaCalendarCheck />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900">
            {totalBookings}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            <span className="text-emerald-700 font-bold">{confirmedBookings.length} Confirmed</span> • {pendingBookings.length} Pending
          </div>
        </div>

        {/* Metric 2: Pending Enquiries */}
        <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">Pending Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#8B6508] flex items-center justify-center text-sm">
              <FaHourglassHalf />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#8B6508]">
            {pendingBookings.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            Requires verification
          </div>
        </div>

        {/* Metric 3: Total Revenue Booked */}
        <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">Revenue Booked</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
              <FaRupeeSign />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            Active contracts
          </div>
        </div>

        {/* Metric 4: Advance Collected */}
        <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">Advance Received</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
              <FaCheckCircle />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            ₹{totalAdvance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            Settled in bank
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Bookings + Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Bookings Stream (Col 8) */}
        <div className="lg:col-span-8 glass-card rounded-lg p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Recent Bookings & Enquiries
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time booking transactions and customer entries.
              </p>
            </div>

            <NavLink
              to="/admin/bookings"
              className="text-xs text-[#8B6508] font-bold hover:underline flex items-center gap-1"
            >
              View All ({bookings.length}) <FaArrowRight className="text-[9px]" />
            </NavLink>
          </div>

          <div className="space-y-2.5">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="p-3.5 rounded-lg bg-stone-50/80 border border-stone-200 hover:border-stone-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#8B6508] px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                      {booking.id}
                    </span>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                      {booking.customerName}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-mono text-stone-700 font-medium">
                      <FaCalendarAlt className="text-[#B8860B] text-[10px]" /> {booking.eventDate} ({booking.timeSlot})
                    </span>
                    <span>• {booking.eventType}</span>
                    <span className="font-mono text-stone-900 font-bold">• ₹{Number(booking.totalAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : booking.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {booking.status}
                  </span>

                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => handleQuickStatusChange(booking, 'Confirmed')}
                      className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      Confirm
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-xs transition-colors border border-emerald-200"
                    title="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>

                  <a
                    href={`tel:${booking.phone}`}
                    className="w-7 h-7 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-white flex items-center justify-center text-xs transition-colors border border-stone-200"
                    title="Call"
                  >
                    <FaPhoneAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Controls & Status (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick CMS Shortcuts */}
          <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs space-y-3 bg-white">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              Management Shortcuts
            </h3>

            <div className="space-y-1.5">
              <NavLink
                to="/admin/calendar"
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-300 text-xs font-medium text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#8B6508]" /> Availability Calendar
                </span>
                <FaArrowRight className="text-[9px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/content"
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-300 text-xs font-medium text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2">
                  <FaEdit className="text-[#8B6508]" /> Website Profile & Specs
                </span>
                <FaArrowRight className="text-[9px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/gallery"
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-300 text-xs font-medium text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2">
                  <FaImages className="text-[#8B6508]" /> Photo Gallery ({gallery.length})
                </span>
                <FaArrowRight className="text-[9px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/content?tab=packages"
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-300 text-xs font-medium text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2">
                  <FaCrown className="text-[#8B6508]" /> Rental Packages ({packages.length})
                </span>
                <FaArrowRight className="text-[9px] text-stone-400" />
              </NavLink>
            </div>
          </div>

          {/* Venue Info Snapshot */}
          <div className="glass-card rounded-lg p-5 border border-stone-200 shadow-xs space-y-2.5 text-xs bg-white">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider border-b border-stone-100 pb-2">
              Venue Specs
            </h4>
            <div className="flex justify-between text-stone-600">
              <span>Main Hall Capacity:</span>
              <span className="font-semibold text-stone-900">1,200 Seats</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Dining Hall:</span>
              <span className="font-semibold text-stone-900">600 Seats</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>AC Guest Suites:</span>
              <span className="font-semibold text-stone-900">14 Deluxe Rooms</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Generator Backup:</span>
              <span className="font-semibold text-stone-900">250 KVA DG Set</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Contact Desk:</span>
              <span className="font-mono font-semibold text-[#8B6508]">{info?.phone}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
