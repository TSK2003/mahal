import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaDirections, FaWhatsapp } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import GoogleMap from '../common/GoogleMap';

const ContactPreview = () => {
  const { info } = useMahalData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Location & Contact"
        title="Visit Murugu Mahal"
        description="Conveniently situated along Grand Avenue Highway with smooth wide approach roads for buses and luxury cars."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Contact Details (Address, Phone Number, Email, Business Hours) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-[#C9A227]/30 text-left flex flex-col justify-between space-y-6 shadow-2xl">
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-100 mb-6 border-b border-stone-800 pb-4">
              Venue Reservation Desk
            </h3>

            <div className="space-y-5">
              {/* 1. Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider">Address</h4>
                  <p className="text-sm text-stone-200 mt-0.5 leading-relaxed">{info.address}</p>
                </div>
              </div>

              {/* 2. Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider">Phone Number</h4>
                  <p className="text-sm text-stone-200 mt-0.5 font-mono font-semibold">{info.phone}</p>
                  {info.altPhone && (
                    <p className="text-xs text-stone-400 font-mono">{info.altPhone}</p>
                  )}
                </div>
              </div>

              {/* 3. Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider">Email Address</h4>
                  <p className="text-sm text-stone-200 mt-0.5">{info.email}</p>
                </div>
              </div>

              {/* 4. Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider">Business Hours</h4>
                  <p className="text-sm text-stone-200 mt-0.5">{info.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={info.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" icon={FaDirections} className="w-full justify-center text-xs py-3 shadow-lg">
                Google Maps
              </Button>
            </a>

            <a
              href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent('Hello! I would like to visit Murugu Mahal.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" icon={FaWhatsapp} className="w-full justify-center text-xs py-3 border-[#25D366] text-[#25D366]">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Dark Styled Google Map */}
        <div className="lg:col-span-7 flex">
          <GoogleMap theme="dark" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
