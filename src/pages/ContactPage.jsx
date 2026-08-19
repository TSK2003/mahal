import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaClock, FaDirections, FaWhatsapp, FaCheckCircle 
} from 'react-icons/fa';
import Button from '../components/common/Button';
import GoogleMap from '../components/common/GoogleMap';
import useMahalData from '../hooks/useMahalData';
import { dataService } from '../services/dataService';

const ContactPage = () => {
  const { info } = useMahalData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Royal Wedding',
    date: '',
    notes: ''
  });
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = dataService.addBooking({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.date || new Date().toISOString().split('T')[0],
      timeSlot: '24 Hours (Full Day)',
      packageBooked: 'Royal Wedding Package',
      guests: '500 - 1000 Guests',
      notes: formData.notes,
      status: 'Pending',
      totalAmount: 185000,
      advancePaid: 0,
      balanceDue: 185000
    });
    setSubmittedBooking(created);
  };

  const handleWhatsApp = () => {
    const text = `*New Contact Enquiry at Grand Mahal*\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Event: ${formData.eventType}\n` +
      `Date: ${formData.date || 'TBD'}\n` +
      `Message: ${formData.notes || 'None'}`;
    window.open(`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pb-16 font-sans">
      {/* Contact Hero Banner */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block text-[11px] uppercase tracking-wider text-[#8B6508] font-bold px-3 py-1 rounded-md bg-amber-50 border border-amber-200">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-stone-900">
            Contact & Venue Directions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Our reservation manager desk is open 7 days a week for venue walk-throughs, Muhurtham date enquiries, and custom catering quotes.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Contact Info Cards & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-6 glass-card rounded-lg p-6 sm:p-8 border border-stone-200 text-left space-y-6 flex flex-col justify-between shadow-xs bg-white">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6508]">
                  Venue Headquarters
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
                  {info?.name || 'Grand Mahal'}
                </h3>
              </div>

              <div className="space-y-4 pt-1">
                {/* 1. Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Address</h4>
                    <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">{info?.address}</p>
                  </div>
                </div>

                {/* 2. Phone Number */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Phone Number</h4>
                    <p className="text-xs text-stone-900 font-mono font-bold mt-0.5">{info?.phone}</p>
                    {info?.altPhone && <p className="text-[11px] text-stone-500 font-mono">{info.altPhone}</p>}
                  </div>
                </div>

                {/* 3. Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Email Address</h4>
                    <p className="text-xs text-stone-700 mt-0.5">{info?.email}</p>
                  </div>
                </div>

                {/* 4. Business Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Business Hours</h4>
                    <p className="text-xs text-stone-700 mt-0.5">{info?.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a href={`tel:${info?.phone}`}>
                <Button variant="primary" icon={FaPhoneAlt} className="w-full text-xs py-2 font-semibold shadow-2xs">
                  Call Now
                </Button>
              </a>

              <a
                href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent('Hello! I would like to enquire about Grand Mahal.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" icon={FaWhatsapp} className="w-full text-xs py-2 border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white">
                  WhatsApp
                </Button>
              </a>

              <a href={info?.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" icon={FaDirections} className="w-full text-xs py-2">
                  Directions
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map Component */}
          <div className="lg:col-span-6 flex rounded-lg overflow-hidden shadow-xs border border-stone-200">
            <GoogleMap theme="light" className="w-full h-full min-h-[350px]" />
          </div>

        </div>

        {/* Online Enquiry Form Section */}
        <div className="glass-card rounded-lg p-6 sm:p-8 border border-stone-200 text-left max-w-2xl mx-auto shadow-xs bg-white">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
              Instant Online Enquiry
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
              Send Us A Message
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Leave your contact info and our reservation supervisor will reach out with date availability.
            </p>
          </div>

          {!submittedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98401 23456"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  >
                    <option value="Royal Wedding">Traditional Wedding</option>
                    <option value="Grand Reception">Grand Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Corporate Conference">Corporate Conference</option>
                    <option value="Birthday Party">Birthday Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Proposed Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Message</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="How can we assist you with your wedding or event celebration?"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-2.5 font-semibold justify-center shadow-xs">
                Submit Enquiry
              </Button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-300 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mx-auto">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Enquiry Recorded (Ref: {submittedBooking.id})
              </h3>
              <p className="text-xs text-stone-600">
                Thank you <span className="font-bold text-[#8B6508]">{formData.name}</span>. Our event coordinator will call you back shortly.
              </p>
              <Button variant="primary" onClick={handleWhatsApp} className="mx-auto shadow-xs text-xs py-2">
                <FaWhatsapp className="text-sm" /> Send Details to WhatsApp
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
