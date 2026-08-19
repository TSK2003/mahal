import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaPrint, 
  FaFileCsv, FaWhatsapp, FaPhoneAlt, 
  FaCalendarAlt, FaTimes, FaCrown 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const AdminBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bookings, packages, info } = useMahalData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [viewInvoiceBooking, setViewInvoiceBooking] = useState(null);

  // Form State
  const initialForm = {
    customerName: '',
    phone: '',
    email: '',
    eventType: 'Royal Wedding',
    eventDate: '',
    timeSlot: '24 Hours (Full Day)',
    packageBooked: 'Royal Wedding Package',
    guests: '500 - 1000 Guests',
    totalAmount: 185000,
    advancePaid: 50000,
    status: 'Confirmed',
    notes: ''
  };
  const [formData, setFormData] = useState(initialForm);

  // Handle URL query for instant modal open
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsAddModalOpen(true);
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handlePackageChange = (e) => {
    const pkgName = e.target.value;
    const matchedPkg = packages.find(p => p.name === pkgName);
    setFormData({
      ...formData,
      packageBooked: pkgName,
      totalAmount: matchedPkg?.rawPrice || formData.totalAmount
    });
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    dataService.addBooking(formData);
    setIsAddModalOpen(false);
    setFormData(initialForm);
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    dataService.updateBooking(editingBooking);
    setEditingBooking(null);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm(`Are you sure you want to delete booking ${id}?`)) {
      dataService.deleteBooking(id);
    }
  };

  const handleExportCsv = () => {
    const headers = ["Booking ID", "Customer Name", "Phone", "Email", "Event Type", "Event Date", "Slot", "Package", "Guests", "Total Amount (INR)", "Advance (INR)", "Balance Due (INR)", "Status", "Created At"];
    const rows = filteredBookings.map(b => [
      b.id,
      `"${b.customerName}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${b.eventType}"`,
      b.eventDate,
      `"${b.timeSlot}"`,
      `"${b.packageBooked}"`,
      `"${b.guests}"`,
      b.totalAmount,
      b.advancePaid,
      b.balanceDue,
      b.status,
      b.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mahal_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesEvent = eventFilter === 'All' || b.eventType.toLowerCase().includes(eventFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesEvent;
  });

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Bookings & Reservations
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage client reservations, monitor payments, print booking slips, and check hall slot status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C9A227]/40 text-stone-300 hover:text-[#C9A227] text-xs font-semibold transition-all cursor-pointer"
          >
            <FaFileCsv /> Export CSV
          </button>

          <Button
            variant="primary"
            onClick={() => {
              setFormData(initialForm);
              setIsAddModalOpen(true);
            }}
            icon={FaPlus}
            className="text-xs px-5 py-2.5 font-bold shadow-lg"
          >
            Add New Booking
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, or BK-ID..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-[#C9A227]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 font-semibold uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-[#C9A227]"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 font-semibold uppercase">Event:</span>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-[#C9A227]"
            >
              <option value="All">All Event Types</option>
              <option value="Wedding">Wedding</option>
              <option value="Reception">Reception</option>
              <option value="Engagement">Engagement</option>
              <option value="Conference">Conference</option>
              <option value="Birthday">Birthday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950/90 border-b border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Ref ID</th>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Event & Date</th>
                <th className="p-4">Time Slot & Package</th>
                <th className="p-4">Payment Summary</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No bookings found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-900/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#C9A227]">
                      {b.id}
                      <span className="block text-[10px] text-stone-500 font-sans font-normal">{b.createdAt}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-stone-100">{b.customerName}</div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                        <a href={`tel:${b.phone}`} className="hover:text-[#C9A227] flex items-center gap-1 font-mono">
                          <FaPhoneAlt className="text-[9px]" /> {b.phone}
                        </a>
                      </div>
                      {b.email && (
                        <div className="text-[10px] text-stone-500 truncate max-w-[150px]">{b.email}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-stone-200">{b.eventType}</div>
                      <div className="text-xs text-[#C9A227] font-mono font-bold mt-0.5 flex items-center gap-1">
                        <FaCalendarAlt className="text-[10px]" /> {b.eventDate}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{b.guests}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-stone-300 font-medium">{b.timeSlot}</div>
                      <div className="text-[10px] text-[#C9A227] mt-0.5">{b.packageBooked}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-stone-100">₹{Number(b.totalAmount).toLocaleString('en-IN')}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">
                        Adv: ₹{Number(b.advancePaid).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-amber-400/80">
                        Due: ₹{Number(b.balanceDue).toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : b.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : b.status === 'Completed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      {/* Print Invoice */}
                      <button
                        onClick={() => setViewInvoiceBooking(b)}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-[#C9A227] text-stone-400 hover:text-stone-950 border border-stone-800 hover:border-[#C9A227] transition-all cursor-pointer"
                        title="View & Print Booking Slip"
                      >
                        <FaPrint className="text-xs" />
                      </button>

                      {/* Edit Booking */}
                      <button
                        onClick={() => setEditingBooking({ ...b })}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-[#C9A227] text-stone-400 hover:text-stone-950 border border-stone-800 hover:border-[#C9A227] transition-all cursor-pointer"
                        title="Edit Booking"
                      >
                        <FaEdit className="text-xs" />
                      </button>

                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.customerName}! Here is the confirmation for your event booking (${b.id}) on ${b.eventDate} at ${info.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all text-xs"
                        title="WhatsApp Message"
                      >
                        <FaWhatsapp />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-red-600 text-stone-400 hover:text-white border border-stone-800 hover:border-red-600 transition-all cursor-pointer"
                        title="Delete Booking"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD NEW BOOKING MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white bg-stone-800 p-2 rounded-full cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  New Reservation
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100 mt-0.5">
                  Add Event Booking
                </h3>
              </div>

              <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Customer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="E.g., Sundaram & Priya"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="customer@gmail.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Event Type *</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Royal Wedding">Royal Traditional Wedding</option>
                      <option value="Grand Reception">Grand Evening Reception</option>
                      <option value="Engagement">Engagement Ceremony</option>
                      <option value="Corporate Conference">Corporate Conference</option>
                      <option value="Birthday Party">Birthday / Gala Party</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Event Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Time Slot *</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="24 Hours (Full Day)">24 Hours (Full Day)</option>
                      <option value="Morning Slot (5:00 AM - 2:00 PM)">Morning Slot (5:00 AM - 2:00 PM)</option>
                      <option value="Evening Slot (3:00 PM - 11:00 PM)">Evening Slot (3:00 PM - 11:00 PM)</option>
                      <option value="Full Day (8:00 AM - 6:00 PM)">Full Day (8:00 AM - 6:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Package</label>
                    <select
                      value={formData.packageBooked}
                      onChange={handlePackageChange}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      {packages.map(p => (
                        <option key={p.id} value={p.name}>{p.name} ({p.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Total Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={formData.advancePaid}
                      onChange={(e) => setFormData({ ...formData, advancePaid: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Special Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="E.g., Mandap flower setup team arrival time, extra rooms..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" className="px-6 py-2.5 font-bold">
                    Save Booking Entry
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EDIT BOOKING MODAL --- */}
      <AnimatePresence>
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left"
            >
              <button
                onClick={() => setEditingBooking(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white bg-stone-800 p-2 rounded-full cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  Editing Reference: {editingBooking.id}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100 mt-0.5">
                  Update Booking Details
                </h3>
              </div>

              <form onSubmit={handleUpdateBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={editingBooking.customerName}
                      onChange={(e) => setEditingBooking({ ...editingBooking, customerName: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={editingBooking.phone}
                      onChange={(e) => setEditingBooking({ ...editingBooking, phone: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={editingBooking.eventDate}
                      onChange={(e) => setEditingBooking({ ...editingBooking, eventDate: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Total Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingBooking.totalAmount}
                      onChange={(e) => setEditingBooking({ ...editingBooking, totalAmount: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={editingBooking.advancePaid}
                      onChange={(e) => setEditingBooking({ ...editingBooking, advancePaid: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Reservation Status</label>
                    <select
                      value={editingBooking.status}
                      onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Time Slot</label>
                    <select
                      value={editingBooking.timeSlot}
                      onChange={(e) => setEditingBooking({ ...editingBooking, timeSlot: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="24 Hours (Full Day)">24 Hours (Full Day)</option>
                      <option value="Morning Slot (5:00 AM - 2:00 PM)">Morning Slot (5:00 AM - 2:00 PM)</option>
                      <option value="Evening Slot (3:00 PM - 11:00 PM)">Evening Slot (3:00 PM - 11:00 PM)</option>
                      <option value="Full Day (8:00 AM - 6:00 PM)">Full Day (8:00 AM - 6:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Special Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={editingBooking.notes}
                    onChange={(e) => setEditingBooking({ ...editingBooking, notes: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" className="px-6 py-2.5 font-bold">
                    Update Booking
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PRINTABLE INVOICE / BOOKING SLIP MODAL --- */}
      <AnimatePresence>
        {viewInvoiceBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-stone-950 border-2 border-[#C9A227] rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl my-8 text-left font-sans"
              id="printable-invoice"
            >
              {/* Close Button */}
              <button
                onClick={() => setViewInvoiceBooking(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 print:hidden cursor-pointer"
              >
                <FaTimes />
              </button>

              {/* Invoice Header */}
              <div className="text-center border-b border-[#C9A227]/40 pb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DFBA51] to-[#997A15] text-stone-950 flex items-center justify-center text-2xl font-bold mx-auto mb-2 shadow-lg">
                  <FaCrown />
                </div>
                <h2 className="text-2xl font-serif font-extrabold text-[#C9A227] tracking-wider">
                  {info.name.toUpperCase()}
                </h2>
                <p className="text-[11px] text-stone-300">{info.address}</p>
                <p className="text-[10px] text-stone-400 font-mono">Phone: {info.phone} | Email: {info.email}</p>
                <div className="mt-3 inline-block px-4 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 text-[#C9A227] text-xs font-bold uppercase tracking-widest">
                  Official Booking Confirmation Slip
                </div>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-stone-800 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase">Booking Reference:</span>
                  <div className="font-mono font-bold text-base text-[#C9A227]">{viewInvoiceBooking.id}</div>
                  <div className="text-[10px] text-stone-400 mt-1">Date Issued: {viewInvoiceBooking.createdAt}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase">Status:</span>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {viewInvoiceBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer & Event Details */}
              <div className="py-4 border-b border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Customer Name:</span>
                  <span className="font-bold text-stone-100">{viewInvoiceBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Contact Number:</span>
                  <span className="font-mono text-stone-200">{viewInvoiceBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Event Function:</span>
                  <span className="font-bold text-stone-100">{viewInvoiceBooking.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Reserved Date:</span>
                  <span className="font-mono font-bold text-[#C9A227]">{viewInvoiceBooking.eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Time Slot:</span>
                  <span className="text-stone-200">{viewInvoiceBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Package Inclusions:</span>
                  <span className="text-stone-200">{viewInvoiceBooking.packageBooked}</span>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="py-4 border-b border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Agreed Venue Tariff:</span>
                  <span className="font-mono font-bold text-stone-100">₹{Number(viewInvoiceBooking.totalAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Advance Payment Received:</span>
                  <span className="font-mono font-bold">(-) ₹{Number(viewInvoiceBooking.advancePaid).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#C9A227] pt-2 border-t border-stone-800">
                  <span>Balance Payable on Event Day:</span>
                  <span className="font-mono">₹{Number(viewInvoiceBooking.balanceDue).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Notes & Terms */}
              <div className="py-4 text-[10px] text-stone-400 space-y-1">
                <p className="font-semibold text-stone-300">Terms & Venue Guidelines:</p>
                <p>1. Central AC, 250 KVA generator backup, and 14 deluxe rooms provided as per package.</p>
                <p>2. Stage flower setup and catering teams must adhere strictly to arrival and departure timings.</p>
                {viewInvoiceBooking.notes && (
                  <p className="text-stone-300 italic pt-1">Notes: "{viewInvoiceBooking.notes}"</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-between gap-3 print:hidden border-t border-stone-800">
                <button
                  onClick={() => setViewInvoiceBooking(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>

                <Button
                  variant="primary"
                  onClick={() => window.print()}
                  icon={FaPrint}
                  className="px-6 py-2 text-xs font-bold"
                >
                  Print Receipt / PDF
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBookings;
