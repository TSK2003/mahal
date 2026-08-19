import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaHourglassHalf, FaRupeeSign, FaCheckCircle, 
  FaCalendarAlt, FaPlus, FaImages, FaEdit, FaWhatsapp, 
  FaPhoneAlt, FaArrowRight, FaCrown 
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
    <div className="space-y-8 text-left">
      {/* Top Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#B8860B]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B6508] uppercase tracking-wider mb-1">
            <FaCrown /> Executive Operations Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900">
            {info?.name || 'Grand Mahal'} Overview
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage your Muhurtham reservations, slot availability, hall pricing, and customer billing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/admin/bookings"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
          >
            <FaPlus /> New Booking Entry
          </NavLink>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Bookings */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 border border-stone-200 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">Total Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">
              <FaCalendarCheck />
            </div>
          </div>
          <div className="text-3xl font-serif font-extrabold text-stone-900">
            {totalBookings}
          </div>
          <div className="text-xs text-stone-600 mt-1 font-medium">
            <span className="text-emerald-700 font-bold">{confirmedBookings.length} Confirmed</span> • {pendingBookings.length} Pending
          </div>
        </motion.div>

        {/* Metric 2: Pending Enquiries */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 border border-stone-200 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">Pending Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8B6508] flex items-center justify-center text-lg">
              <FaHourglassHalf />
            </div>
          </div>
          <div className="text-3xl font-serif font-extrabold text-[#8B6508]">
            {pendingBookings.length}
          </div>
          <div className="text-xs text-stone-600 mt-1 font-medium">
            Require phone/slot verification
          </div>
        </motion.div>

        {/* Metric 3: Total Revenue Booked */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 border border-stone-200 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">Revenue Booked</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">
              <FaRupeeSign />
            </div>
          </div>
          <div className="text-3xl font-serif font-extrabold text-stone-900">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-700 font-bold mt-1">
            Across active event contracts
          </div>
        </motion.div>

        {/* Metric 4: Advance Collected */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 border border-stone-200 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">Advance Collected</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-lg">
              <FaCheckCircle />
            </div>
          </div>
          <div className="text-3xl font-serif font-extrabold text-stone-900">
            ₹{totalAdvance.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-stone-600 mt-1 font-medium">
            Received in bank / cash
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid: Recent Bookings + Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Bookings Stream (Col 8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-5 bg-white">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Recent Bookings & Enquiries
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Real-time booking transactions submitted through website or manual entry.
              </p>
            </div>

            <NavLink
              to="/admin/bookings"
              className="text-xs text-[#8B6508] font-bold hover:underline flex items-center gap-1"
            >
              View All ({bookings.length}) <FaArrowRight className="text-[10px]" />
            </NavLink>
          </div>

          <div className="space-y-3.5">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B8860B] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#8B6508] px-2 py-0.5 rounded bg-amber-100 border border-[#B8860B]/30">
                      {booking.id}
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">
                      {booking.customerName}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 font-medium">
                    <span className="flex items-center gap-1 font-mono text-stone-800">
                      <FaCalendarAlt className="text-[#B8860B]" /> {booking.eventDate} ({booking.timeSlot})
                    </span>
                    <span>{booking.eventType}</span>
                    <span className="font-mono text-stone-900 font-bold">₹{Number(booking.totalAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
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
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      Confirm
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-xs transition-colors"
                  >
                    <FaWhatsapp />
                  </a>

                  <a
                    href={`tel:${booking.phone}`}
                    className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-white flex items-center justify-center text-xs transition-colors"
                  >
                    <FaPhoneAlt />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Controls & Status (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick CMS Shortcuts */}
          <div className="glass-card rounded-3xl p-6 border border-stone-200 shadow-md space-y-4 bg-white">
            <h3 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Quick Management Shortcuts
            </h3>

            <div className="space-y-2.5">
              <NavLink
                to="/admin/calendar"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B8860B] text-xs font-bold text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-[#8B6508]" /> View Availability Calendar
                </span>
                <FaArrowRight className="text-[10px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/content"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B8860B] text-xs font-bold text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <FaEdit className="text-[#8B6508]" /> Edit Website Profile & Specs
                </span>
                <FaArrowRight className="text-[10px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B8860B] text-xs font-bold text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <FaImages className="text-[#8B6508]" /> Manage Photo Gallery ({gallery.length})
                </span>
                <FaArrowRight className="text-[10px] text-stone-400" />
              </NavLink>

              <NavLink
                to="/admin/content?tab=packages"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#B8860B] text-xs font-bold text-stone-800 transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <FaCrown className="text-[#8B6508]" /> Edit Rental Packages ({packages.length})
                </span>
                <FaArrowRight className="text-[10px] text-stone-400" />
              </NavLink>
            </div>
          </div>

          {/* Venue Info Snapshot */}
          <div className="glass-card rounded-3xl p-6 border border-stone-200 shadow-md space-y-3 text-xs bg-white">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-100 pb-2">
              Current Venue Information
            </h4>
            <div className="flex justify-between text-stone-600">
              <span>Main Hall Capacity:</span>
              <span className="font-bold text-stone-900">1,200 Seats</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Dining Hall:</span>
              <span className="font-bold text-stone-900">600 Seats</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>AC Guest Suites:</span>
              <span className="font-bold text-stone-900">14 Deluxe Rooms</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Generator Backup:</span>
              <span className="font-bold text-stone-900">250 KVA DG Set</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Contact Desk:</span>
              <span className="font-mono font-bold text-[#8B6508]">{info?.phone}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
