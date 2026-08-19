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
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#C9A227]/30 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold">
            <FaCrown /> Live Venue Management
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-100">
            Welcome to {info.name} Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            Real-time management for wedding dates, hall availability slots, pricing packages, customer invoices, and live website content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <NavLink
            to="/admin/bookings?action=new"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#DFBA51] to-[#C9A227] text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
          >
            <FaPlus /> New Booking Entry
          </NavLink>
          <NavLink
            to="/admin/calendar"
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-[#C9A227]/40 text-stone-200 text-xs font-semibold transition-all"
          >
            <FaCalendarAlt className="text-[#C9A227]" /> View Calendar
          </NavLink>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-5 border border-stone-800 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center text-lg">
              <FaCalendarCheck />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-serif font-extrabold text-stone-100">
              {totalBookings}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              <span className="text-emerald-400 font-semibold">{confirmedBookings.length} Confirmed</span> • {pendingBookings.length} Pending
            </p>
          </div>
        </motion.div>

        {/* Confirmed Dates */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-5 border border-stone-800 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
              Confirmed Events
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-lg">
              <FaCheckCircle />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-serif font-extrabold text-emerald-400">
              {confirmedBookings.length}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              High-demand wedding muhurtham dates locked
            </p>
          </div>
        </motion.div>

        {/* Pending Enquiries */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-5 border border-stone-800 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
              Action Required
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg">
              <FaHourglassHalf className={pendingBookings.length > 0 ? 'animate-spin' : ''} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-serif font-extrabold text-amber-400">
              {pendingBookings.length}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              Pending client date enquiries awaiting callback
            </p>
          </div>
        </motion.div>

        {/* Estimated Revenue */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-5 border border-[#C9A227]/30 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
              Total Booking Value
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg font-bold">
              <FaRupeeSign />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              ₹{totalAdvance.toLocaleString('en-IN')} advance collected
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Bar */}
      <div className="glass-card rounded-2xl p-5 border border-stone-800">
        <h4 className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider mb-3">
          Quick Management Shortcuts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <NavLink
            to="/admin/bookings?action=new"
            className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-[#C9A227]/40 flex items-center gap-3 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center text-sm">
              <FaPlus />
            </div>
            <div>
              <span className="block text-xs font-bold text-stone-200">New Booking</span>
              <span className="block text-[10px] text-stone-500">Add manual entry</span>
            </div>
          </NavLink>

          <NavLink
            to="/admin/gallery"
            className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-[#C9A227]/40 flex items-center gap-3 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center text-sm">
              <FaImages />
            </div>
            <div>
              <span className="block text-xs font-bold text-stone-200">Add Photos</span>
              <span className="block text-[10px] text-stone-500">{gallery.length} Images live</span>
            </div>
          </NavLink>

          <NavLink
            to="/admin/content?tab=packages"
            className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-[#C9A227]/40 flex items-center gap-3 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center text-sm">
              <FaEdit />
            </div>
            <div>
              <span className="block text-xs font-bold text-stone-200">Edit Tariff</span>
              <span className="block text-[10px] text-stone-500">{packages.length} Packages</span>
            </div>
          </NavLink>

          <NavLink
            to="/admin/content?tab=profile"
            className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-[#C9A227]/40 flex items-center gap-3 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center text-sm">
              <FaCrown />
            </div>
            <div>
              <span className="block text-xs font-bold text-stone-200">Mahal Profile</span>
              <span className="block text-[10px] text-stone-500">Contact & Info</span>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Recent Bookings & Pending Enquiries */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-100">
              Recent Bookings & Enquiries
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Review customer reservation details and approve or update status.
            </p>
          </div>

          <NavLink
            to="/admin/bookings"
            className="text-xs font-semibold text-[#C9A227] hover:underline flex items-center gap-1.5"
          >
            View All ({bookings.length}) <FaArrowRight className="text-[10px]" />
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Ref ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Event & Date</th>
                <th className="p-3.5">Slot</th>
                <th className="p-3.5">Total / Advance</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {bookings.slice(0, 6).map((booking) => (
                <tr key={booking.id} className="hover:bg-stone-900/60 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#C9A227]">
                    {booking.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-100">{booking.customerName}</div>
                    <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                      <a href={`tel:${booking.phone}`} className="hover:text-[#C9A227] flex items-center gap-1">
                        <FaPhoneAlt className="text-[9px]" /> {booking.phone}
                      </a>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-stone-200">{booking.eventType}</div>
                    <div className="text-[11px] text-[#C9A227] font-mono">{booking.eventDate}</div>
                  </td>
                  <td className="p-3.5 text-stone-400">
                    {booking.timeSlot}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-stone-100">₹{Number(booking.totalAmount).toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-emerald-400">Adv: ₹{Number(booking.advancePaid).toLocaleString('en-IN')}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : booking.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : booking.status === 'Completed'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    {booking.status === 'Pending' ? (
                      <button
                        onClick={() => handleQuickStatusChange(booking, 'Confirmed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 text-[11px] font-semibold border border-emerald-500/40 transition-all cursor-pointer"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickStatusChange(booking, 'Completed')}
                        className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition-all cursor-pointer"
                      >
                        Mark Done
                      </button>
                    )}

                    <a
                      href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${booking.customerName}! Regarding your booking ${booking.id} at Murugu Mahal on ${booking.eventDate}: `)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs"
                      title="WhatsApp Customer"
                    >
                      <FaWhatsapp />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
