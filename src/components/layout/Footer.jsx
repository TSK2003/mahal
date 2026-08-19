import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaCrown, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, 
  FaCalendarAlt, FaUserShield 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import AdminLoginModal from '../common/AdminLoginModal';

const Footer = ({ onOpenEnquiry }) => {
  const { info, isAdmin } = useMahalData();
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-white text-stone-800 border-t border-[#B8860B]/30 pt-16 pb-12 relative overflow-hidden shadow-inner">
        {/* Decorative Top Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200 text-left">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] flex items-center justify-center text-white text-xl font-bold shadow-[0_4px_15px_rgba(184,134,11,0.3)]">
                  <FaCrown />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-extrabold tracking-wide text-stone-900 group-hover:text-[#B8860B] transition-colors">
                    {(info?.name || 'Grand Mahal').toUpperCase()}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#8B6508] font-bold">
                    Luxury Wedding Venue & Convention Center
                  </span>
                </div>
              </NavLink>

              <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                {info?.shortDesc}
              </p>

              {/* Quick Actions Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  onClick={onOpenEnquiry}
                  className="text-xs px-4 py-2 shadow-sm"
                >
                  <FaCalendarAlt /> Enquire Now
                </Button>
                <a
                  href={`tel:${info?.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-50 border border-stone-300 text-xs font-bold text-stone-800 hover:text-[#B8860B] hover:border-[#B8860B] rounded-full transition-colors shadow-2xs"
                >
                  <FaPhoneAlt className="text-[#B8860B]" /> Call Desk
                </a>
                <a
                  href={`https://wa.me/${info?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-full transition-colors shadow-2xs"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider mb-4 border-l-2 border-[#B8860B] pl-3">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <NavLink to="/" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Home Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/conference" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Conference Hall
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Photo Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/videos" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Video Showcase
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/price" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Packages & Price
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/check-booking" className="text-[#8B6508] font-bold hover:underline block py-0.5">
                    Check Booking Status
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="text-stone-600 hover:text-[#B8860B] transition-colors block py-0.5">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider mb-4 border-l-2 border-[#B8860B] pl-3">
                Event Services
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 font-medium">
                <li>Royal Traditional Weddings</li>
                <li>Grand Evening Receptions</li>
                <li>Engagement Ceremonies</li>
                <li>Birthday Galas & Sangeet</li>
                <li>Corporate Conferences & AGMs</li>
                <li>Naming Ceremonies</li>
                <li>Anniversary Galas</li>
              </ul>
            </div>

            {/* Col 4: Contact Information & Admin */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider mb-4 border-l-2 border-[#B8860B] pl-3">
                Contact & Portal
              </h4>
              <ul className="space-y-3 text-xs mb-6">
                <li className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="text-[#B8860B] text-sm flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600">{info?.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaPhoneAlt className="text-[#B8860B] text-sm flex-shrink-0" />
                  <a href={`tel:${info?.phone}`} className="hover:text-[#B8860B] transition-colors font-mono font-bold text-stone-900">
                    {info?.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaWhatsapp className="text-[#25D366] text-base flex-shrink-0" />
                  <a href={`https://wa.me/${info?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors font-mono font-bold text-stone-900">
                    {info?.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaEnvelope className="text-[#B8860B] text-sm flex-shrink-0" />
                  <a href={`mailto:${info?.email}`} className="hover:text-[#B8860B] transition-colors text-stone-600">
                    {info?.email}
                  </a>
                </li>
              </ul>

              {/* Demo Admin Access link */}
              <div className="pt-2">
                {isAdmin ? (
                  <NavLink
                    to="/admin"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    <FaUserShield /> Open Admin Control Panel
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#8B6508] hover:underline cursor-pointer"
                  >
                    <FaUserShield /> Open Admin Portal Login (Demo)
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
            <p>© 2026 {info?.name || 'Grand Mahal'}. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <span className="text-[#B8860B]">♥</span> for Royal Weddings & Celebrations
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Demo Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
      />
    </>
  );
};

export default Footer;
