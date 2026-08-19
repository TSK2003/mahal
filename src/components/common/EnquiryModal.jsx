import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from './Button';

const EnquiryModal = ({ isOpen, onClose, selectedPackage = '' }) => {
  const { info } = useMahalData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: selectedPackage || 'Royal Wedding',
    date: '',
    timeSlot: '24 Hours (Full Day)',
    guests: '500 - 1000 Guests',
    notes: ''
  });

  const [submittedBooking, setSubmittedBooking] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = dataService.addBooking({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.date || new Date().toISOString().split('T')[0],
      timeSlot: formData.timeSlot,
      packageBooked: formData.eventType.includes('Package') ? formData.eventType : 'Royal Wedding Package',
      guests: formData.guests,
      notes: formData.notes,
      status: 'Pending',
      totalAmount: 185000,
      advancePaid: 0,
      balanceDue: 185000
    });
    setSubmittedBooking(created);
  };

  const handleWhatsAppRedirect = () => {
    const text = `*New Event Booking Enquiry at Grand Mahal*\n\n` +
      `Ref ID: ${submittedBooking?.id || 'Pending'}\n` +
      `Name: ${formData.name || 'Not provided'}\n` +
      `Phone: ${formData.phone}\n` +
      `Event: ${formData.eventType}\n` +
      `Date: ${formData.date || 'TBD'}\n` +
      `Slot: ${formData.timeSlot}\n` +
      `Guests: ${formData.guests}\n` +
      `Notes: ${formData.notes || 'None'}`;
    
    window.open(`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-lg bg-white border border-stone-200 rounded-lg p-6 sm:p-7 shadow-xl my-8 text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer"
          >
            <FaTimes />
          </button>

          {!submittedBooking ? (
            <>
              <div className="text-center mb-5">
                <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
                  Royal Reservation Desk
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                  Reserve Venue Dates
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Fill out your details to check date availability and receive our official booking tariff.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98401 23456"
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Event Type</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="Royal Wedding">Traditional Wedding</option>
                      <option value="Grand Reception">Grand Reception</option>
                      <option value="Engagement">Engagement Ceremony</option>
                      <option value="Corporate Conference">Corporate Conference</option>
                      <option value="Birthday Party">Birthday / Sangeet</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Tentative Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Time Slot</label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="24 Hours (Full Day)">24 Hours (Full Day)</option>
                      <option value="Morning Slot (5:00 AM - 2:00 PM)">Morning Slot (5 AM - 2 PM)</option>
                      <option value="Evening Slot (3:00 PM - 11:00 PM)">Evening Slot (3 PM - 11 PM)</option>
                      <option value="Full Day (8:00 AM - 6:00 PM)">Full Day (8 AM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Expected Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  >
                    <option value="Under 300 Guests">Under 300 Guests</option>
                    <option value="300 - 500 Guests">300 - 500 Guests</option>
                    <option value="500 - 1000 Guests">500 - 1,000 Guests</option>
                    <option value="1000+ Guests">1,000+ Guests (Full Capacity)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Special Notes</label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="E.g., Special dining setup, extra guest rooms, AC hours..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="pt-1">
                  <Button type="submit" variant="primary" className="w-full py-2.5 font-semibold justify-center shadow-xs">
                    Submit Reservation Request
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span>Or connect directly:</span>
                  <a
                    href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent('Hello! I would like to enquire about booking dates at Grand Mahal.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <FaWhatsapp /> WhatsApp Chat
                  </a>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-300 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mx-auto shadow-2xs">
                <FaCheckCircle />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">
                  Enquiry Saved
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                  Request Submitted
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Reference ID: <span className="text-[#8B6508] font-mono font-bold">{submittedBooking.id}</span>. Our reservation manager will contact you at <span className="text-stone-900 font-bold">{formData.phone}</span>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-left text-xs space-y-1 shadow-2xs">
                <div className="flex justify-between"><span className="text-stone-500">Name:</span> <span className="font-semibold text-stone-900">{formData.name}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Date:</span> <span className="font-mono font-semibold text-[#8B6508]">{formData.date || 'TBD'}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Event:</span> <span className="text-stone-900">{formData.eventType}</span></div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Button variant="primary" onClick={handleWhatsAppRedirect} className="w-full justify-center py-2.5 text-xs font-semibold shadow-xs">
                  <FaWhatsapp className="text-sm" /> Send to WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmittedBooking(null);
                    onClose();
                  }}
                  className="w-full justify-center py-2 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
