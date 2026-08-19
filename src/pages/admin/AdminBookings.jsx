import React, { useState } from 'react';
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
  const { bookings, info } = useMahalData();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [selectedEventType, setSelectedEventType] = useState('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'Royal Wedding',
    eventDate: new Date().toISOString().split('T')[0],
    timeSlot: '24 Hours (Full Day)',
    packageBooked: 'Royal Wedding Package',
    guests: '800 - 1,000',
    totalAmount: 185000,
    advancePaid: 50000,
    status: 'Confirmed',
    notes: ''
  });

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesEvent = selectedEventType === 'All' || b.eventType === selectedEventType;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  // Handle Save (Add or Edit)
  const handleSaveBooking = (e) => {
    e.preventDefault();
    if (isEditModalOpen && currentBooking) {
      dataService.updateBooking({
        ...currentBooking,
        ...formData,
        totalAmount: Number(formData.totalAmount) || 0,
        advancePaid: Number(formData.advancePaid) || 0,
        balanceDue: (Number(formData.totalAmount) || 0) - (Number(formData.advancePaid) || 0)
      });
      setIsEditModalOpen(false);
    } else {
      dataService.addBooking({
        ...formData,
        totalAmount: Number(formData.totalAmount) || 0,
        advancePaid: Number(formData.advancePaid) || 0
      });
      setIsAddModalOpen(false);
    }
  };

  const handleOpenEdit = (booking) => {
    setCurrentBooking(booking);
    setFormData({
      customerName: booking.customerName || '',
      phone: booking.phone || '',
      email: booking.email || '',
      eventType: booking.eventType || 'Royal Wedding',
      eventDate: booking.eventDate || '',
      timeSlot: booking.timeSlot || '24 Hours (Full Day)',
      packageBooked: booking.packageBooked || 'Royal Wedding Package',
      guests: booking.guests || '',
      totalAmount: booking.totalAmount || 0,
      advancePaid: booking.advancePaid || 0,
      status: booking.status || 'Confirmed',
      notes: booking.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleOpenInvoice = (booking) => {
    setCurrentBooking(booking);
    setIsInvoiceModalOpen(true);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking contract?')) {
      dataService.deleteBooking(id);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ["ID,Customer Name,Phone,Email,Event Type,Event Date,Time Slot,Package,Guests,Total (INR),Advance (INR),Balance (INR),Status,Notes"];
    const rows = bookings.map(b => 
      `"${b.id}","${b.customerName}","${b.phone}","${b.email || ''}","${b.eventType}","${b.eventDate}","${b.timeSlot}","${b.packageBooked || ''}","${b.guests || ''}",${b.totalAmount || 0},${b.advancePaid || 0},${b.balanceDue || 0},"${b.status}","${(b.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `grand_mahal_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            Reservation & Billing Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            Bookings & Client Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExportCsv}
            icon={FaFileCsv}
            className="text-xs py-2.5 bg-white text-stone-800 border-stone-300 shadow-xs"
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              setFormData({
                customerName: '',
                phone: '',
                email: '',
                eventType: 'Royal Wedding',
                eventDate: new Date().toISOString().split('T')[0],
                timeSlot: '24 Hours (Full Day)',
                packageBooked: 'Royal Wedding Package',
                guests: '800 - 1,000',
                totalAmount: 185000,
                advancePaid: 50000,
                status: 'Confirmed',
                notes: ''
              });
              setIsAddModalOpen(true);
            }}
            icon={FaPlus}
            className="text-xs py-2.5 font-bold shadow-md"
          >
            Add New Booking
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, phone, or Ref ID..."
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 pl-10 text-stone-900 text-xs font-medium focus:outline-none focus:border-[#B8860B]"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
        </div>

        {/* Status Pill Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#B8860B] text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card rounded-2xl border border-stone-200 overflow-hidden shadow-md bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-4 py-3.5">Ref ID</th>
                <th className="px-4 py-3.5">Customer / Contact</th>
                <th className="px-4 py-3.5">Event Date & Slot</th>
                <th className="px-4 py-3.5">Event Type</th>
                <th className="px-4 py-3.5">Total (INR)</th>
                <th className="px-4 py-3.5">Advance</th>
                <th className="px-4 py-3.5">Balance</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#8B6508]">
                      {b.id}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-serif font-bold text-stone-900 text-sm">{b.customerName}</div>
                      <div className="font-mono text-stone-500 text-[11px]">{b.phone}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-stone-800">{b.eventDate}</div>
                      <div className="text-[11px] text-stone-500">{b.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{b.eventType}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-stone-900">
                      ₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-emerald-700 font-semibold">
                      ₹{Number(b.advancePaid || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#8B6508] font-bold">
                      ₹{Number(b.balanceDue || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : b.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenInvoice(b)}
                          title="Print Booking Slip / Tax Invoice"
                          className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-[#B8860B] hover:text-white transition-colors cursor-pointer"
                        >
                          <FaPrint />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(b)}
                          title="Edit Booking"
                          className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          title="Delete Booking"
                          className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-stone-500">
                    No bookings found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Booking Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border-2 border-[#B8860B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left text-xs"
            >
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="border-b border-stone-200 pb-4 mb-6">
                <span className="text-xs uppercase font-bold text-[#8B6508]">
                  {isEditModalOpen ? 'Update Existing Contract' : 'Create New Booking'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                  {isEditModalOpen ? `Edit Booking (${currentBooking?.id})` : 'New Hall Reservation'}
                </h3>
              </div>

              <form onSubmit={handleSaveBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Customer / Family Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. S. Ramaswamy & Family"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98401 23456"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="Royal Wedding">Traditional Wedding</option>
                      <option value="Grand Reception">Grand Reception</option>
                      <option value="Engagement">Engagement Ceremony</option>
                      <option value="Corporate Conference">Corporate Conference</option>
                      <option value="Birthday Party">Birthday / Sangeet</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Package Selected</label>
                    <input
                      type="text"
                      value={formData.packageBooked}
                      onChange={(e) => setFormData({ ...formData, packageBooked: e.target.value })}
                      placeholder="e.g. Royal Wedding Package"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Event Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="24 Hours (Full Day)">24 Hours (Full Day)</option>
                      <option value="Morning Slot (5:00 AM - 2:00 PM)">Morning Slot (5 AM - 2 PM)</option>
                      <option value="Evening Slot (3:00 PM - 11:00 PM)">Evening Slot (3 PM - 11 PM)</option>
                      <option value="Full Day (8:00 AM - 6:00 PM)">Full Day (8 AM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Total Contract Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-mono font-bold focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={formData.advancePaid}
                      onChange={(e) => setFormData({ ...formData, advancePaid: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-mono font-bold focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Special Notes / Catering / Rooms</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. 10 extra deluxe rooms, moving head stage lighting, generator diesel billing..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <Button type="submit" variant="primary" className="flex-1 py-3 font-bold">
                    {isEditModalOpen ? 'Save Changes' : 'Create Booking Entry'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    className="py-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Printable Booking Slip / Tax Invoice Modal */}
      <AnimatePresence>
        {isInvoiceModalOpen && currentBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white text-stone-900 rounded-3xl p-8 sm:p-10 shadow-2xl my-8 text-left font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer print:hidden"
              >
                <FaTimes />
              </button>

              {/* Printable Header */}
              <div className="flex items-start justify-between border-b-2 border-[#B8860B] pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#B8860B] text-white flex items-center justify-center font-bold text-sm">
                      <FaCrown />
                    </div>
                    <span className="font-serif font-extrabold text-2xl tracking-wide text-stone-900">
                      {info?.name || 'GRAND MAHAL'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 max-w-xs leading-relaxed">
                    {info?.address}
                  </p>
                  <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                    Phone: {info?.phone} • Email: {info?.email}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest text-[#8B6508] font-bold block">
                    TAX INVOICE / BOOKING SLIP
                  </span>
                  <div className="text-lg font-mono font-bold text-stone-900 mt-1">
                    {currentBooking.id}
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    Date: {currentBooking.createdAt || new Date().toISOString().split('T')[0]}
                  </span>
                </div>
              </div>

              {/* Customer & Event Details */}
              <div className="grid grid-cols-2 gap-6 text-xs mb-6">
                <div className="space-y-1">
                  <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Client Details:</span>
                  <div className="font-serif font-bold text-stone-900 text-sm">{currentBooking.customerName}</div>
                  <div className="font-mono text-stone-700 font-semibold">{currentBooking.phone}</div>
                  {currentBooking.email && <div className="text-stone-600">{currentBooking.email}</div>}
                </div>

                <div className="space-y-1 text-right">
                  <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Event Schedule:</span>
                  <div className="font-serif font-bold text-stone-900 text-sm">{currentBooking.eventType}</div>
                  <div className="font-mono text-[#8B6508] font-bold">{currentBooking.eventDate}</div>
                  <div className="text-stone-600">{currentBooking.timeSlot}</div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden mb-6 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-100 text-stone-800 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{currentBooking.packageBooked || 'Venue Rental Package'}</div>
                        <div className="text-stone-500 text-[11px]">Includes AC Auditorium (1,200 capacity), Dining Hall (600 seats), Deluxe Guest Suites & Valet Parking</div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-stone-900">
                        ₹{Number(currentBooking.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-stone-50 border-t border-stone-200 font-mono">
                    <tr>
                      <td className="p-3 font-bold text-stone-700">Total Contract Value:</td>
                      <td className="p-3 text-right font-bold text-stone-900">
                        ₹{Number(currentBooking.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="text-emerald-700 font-bold">
                      <td className="p-3">Advance Received:</td>
                      <td className="p-3 text-right">
                        - ₹{Number(currentBooking.advancePaid || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-[#B8860B] text-sm font-bold text-[#8B6508]">
                      <td className="p-3">Balance Amount Due:</td>
                      <td className="p-3 text-right">
                        ₹{Number(currentBooking.balanceDue || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Terms & Conditions */}
              <div className="text-[10px] text-stone-500 space-y-1 mb-8">
                <p>1. Balance payment must be settled 7 days prior to event date.</p>
                <p>2. Electricity DG set diesel fuel charges are calculated based on actual running meter hours.</p>
                <p>3. Kitchen hygiene protocols must be maintained by the catering agency.</p>
              </div>

              {/* Print Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200 print:hidden">
                <Button
                  variant="primary"
                  onClick={() => window.print()}
                  icon={FaPrint}
                  className="py-2.5 text-xs font-bold"
                >
                  Print Official Receipt
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="py-2.5 text-xs"
                >
                  Close
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
