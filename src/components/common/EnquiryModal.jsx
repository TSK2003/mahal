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
      `🔖 *Ref ID:* ${submittedBooking?.id || 'Pending'}\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🎉 *Event:* ${formData.eventType}\n` +
      `📅 *Date:* ${formData.date || 'TBD'}\n` +
      `⏰ *Slot:* ${formData.timeSlot}\n` +
      `👥 *Guests:* ${formData.guests}\n` +
      `📝 *Notes:* ${formData.notes || 'None'}`;
    
    window.open(`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white border-2 border-[#B8860B]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          {!submittedBooking ? (
            <>
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8B6508] font-bold">
                  Royal Reservation Desk
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Reserve Venue Dates
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Fill out your details to check date availability and receive our official booking tariff.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98401 23456"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Event Type</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Tentative Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Preferred Time Slot</label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="24 Hours (Full Day)">24 Hours (Full Day)</option>
                      <option value="Morning Slot (5:00 AM - 2:00 PM)">Morning Slot (5 AM - 2 PM)</option>
                      <option value="Evening Slot (3:00 PM - 11:00 PM)">Evening Slot (3 PM - 11 PM)</option>
                      <option value="Full Day (8:00 AM - 6:00 PM)">Full Day (8 AM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Expected Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  >
                    <option value="Under 300 Guests">Under 300 Guests</option>
                    <option value="300 - 500 Guests">300 - 500 Guests</option>
                    <option value="500 - 1000 Guests">500 - 1,000 Guests</option>
                    <option value="1000+ Guests">1,000+ Guests (Full Capacity)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Special Requirements / Notes</label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="E.g., Special dining setup, extra guest rooms, AC hours..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full py-3.5 font-bold justify-center shadow-md">
                    Submit Reservation Request
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span>Or connect instantly:</span>
                  <a
                    href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent('Hello! I would like to enquire about booking dates at Grand Mahal.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                  >
                    <FaWhatsapp /> WhatsApp Chat
                  </a>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
                <FaCheckCircle />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                  Booking Enquiry Saved
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Enquiry Submitted!
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Your reference ID is <span className="text-[#8B6508] font-mono font-bold">{submittedBooking.id}</span>. Our reservation manager will contact you at <span className="text-stone-900 font-bold">{formData.phone}</span> within 2 hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs space-y-1.5 shadow-2xs">
                <div className="flex justify-between"><span className="text-stone-600">Name:</span> <span className="font-bold text-stone-900">{formData.name}</span></div>
                <div className="flex justify-between"><span className="text-stone-600">Date:</span> <span className="font-mono font-bold text-[#8B6508]">{formData.date || 'TBD'}</span></div>
                <div className="flex justify-between"><span className="text-stone-600">Event:</span> <span className="text-stone-900 font-medium">{formData.eventType}</span></div>
                <div className="flex justify-between"><span className="text-stone-600">Status:</span> <span className="text-amber-700 font-bold">Pending Review</span></div>
              </div>
              
              <div className="space-y-2.5 pt-2">
                <Button variant="primary" onClick={handleWhatsAppRedirect} className="w-full justify-center py-3 text-xs font-bold shadow-md">
                  <FaWhatsapp className="text-base" /> Send Details Directly to WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmittedBooking(null);
                    onClose();
                  }}
                  className="w-full justify-center py-2.5 text-xs"
                >
                  Close Window
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
