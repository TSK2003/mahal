import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaDirections, FaWhatsapp } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import GoogleMap from '../common/GoogleMap';

const ContactPreview = () => {
  const { info } = useMahalData();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Location & Contact"
        title="Visit Grand Mahal"
        description="Conveniently situated along Royal Palace Avenue, GST Highway with smooth wide approach roads for buses and luxury cars."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 glass-card rounded-lg p-6 sm:p-7 border border-stone-200 text-left flex flex-col justify-between space-y-5 shadow-xs bg-white">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-100 pb-3">
              Venue Reservation Desk
            </h3>

            <div className="space-y-4">
              {/* 1. Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Address</h4>
                  <p className="text-xs text-stone-700 mt-0.5 leading-relaxed font-medium">{info?.address}</p>
                </div>
              </div>

              {/* 2. Phone Number */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Phone Number</h4>
                  <p className="text-xs text-stone-900 mt-0.5 font-mono font-bold">{info?.phone}</p>
                  {info?.altPhone && (
                    <p className="text-[11px] text-stone-500 font-mono">{info.altPhone}</p>
                  )}
                </div>
              </div>

              {/* 3. Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Email Address</h4>
                  <p className="text-xs text-stone-700 mt-0.5 font-medium">{info?.email}</p>
                </div>
              </div>

              {/* 4. Business Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">Business Hours</h4>
                  <p className="text-xs text-stone-700 mt-0.5 font-medium">{info?.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={info?.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" icon={FaDirections} className="w-full justify-center text-xs py-2 shadow-xs">
                Google Maps
              </Button>
            </a>

            <a
              href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent('Hello! I would like to visit Grand Mahal.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" icon={FaWhatsapp} className="w-full justify-center text-xs py-2 border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Google Map */}
        <div className="lg:col-span-7 flex rounded-lg overflow-hidden shadow-xs border border-stone-200">
          <GoogleMap theme="light" className="w-full h-full min-h-[350px]" />
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
