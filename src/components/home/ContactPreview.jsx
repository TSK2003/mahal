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
        title="Visit Grand Mahal"
        description="Conveniently situated along Royal Palace Avenue, GST Highway with smooth wide approach roads for buses and luxury cars."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-stone-200 text-left flex flex-col justify-between space-y-6 shadow-xl bg-white">
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
              Venue Reservation Desk
            </h3>

            <div className="space-y-5">
              {/* 1. Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#8B6508] tracking-wider">Address</h4>
                  <p className="text-sm text-stone-700 mt-0.5 leading-relaxed font-medium">{info?.address}</p>
                </div>
              </div>

              {/* 2. Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#8B6508] tracking-wider">Phone Number</h4>
                  <p className="text-sm text-stone-900 mt-0.5 font-mono font-bold">{info?.phone}</p>
                  {info?.altPhone && (
                    <p className="text-xs text-stone-500 font-mono">{info.altPhone}</p>
                  )}
                </div>
              </div>

              {/* 3. Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#8B6508] tracking-wider">Email Address</h4>
                  <p className="text-sm text-stone-700 mt-0.5 font-medium">{info?.email}</p>
                </div>
              </div>

              {/* 4. Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#8B6508] tracking-wider">Business Hours</h4>
                  <p className="text-sm text-stone-700 mt-0.5 font-medium">{info?.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={info?.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" icon={FaDirections} className="w-full justify-center text-xs py-3 shadow-md">
                Google Maps
              </Button>
            </a>

            <a
              href={`https://wa.me/${info?.whatsapp}?text=${encodeURIComponent('Hello! I would like to visit Grand Mahal.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" icon={FaWhatsapp} className="w-full justify-center text-xs py-3 border-[#25D366] text-emerald-700 hover:bg-[#25D366] hover:text-white">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Google Map */}
        <div className="lg:col-span-7 flex rounded-3xl overflow-hidden shadow-xl border border-stone-200">
          <GoogleMap theme="light" className="w-full h-full min-h-[380px]" />
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
