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
      <footer className="bg-white text-stone-800 border-t border-stone-200 pt-12 pb-8 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-200 text-left">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-3.5">
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] flex items-center justify-center text-white text-base font-bold shadow-xs">
                  <FaCrown />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-extrabold tracking-tight text-stone-900 group-hover:text-[#B8860B] transition-colors">
                    {(info?.name || 'Grand Mahal').toUpperCase()}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8B6508] font-bold">
                    Luxury Wedding Venue & Convention Center
                  </span>
                </div>
              </NavLink>

              <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                {info?.shortDesc}
              </p>

              {/* Quick Actions Buttons */}
              <div className="pt-1 flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  onClick={onOpenEnquiry}
                  className="text-xs px-3.5 py-1.5 shadow-2xs"
                >
                  <FaCalendarAlt className="text-xs" /> Enquire Now
                </Button>
                <a
                  href={`tel:${info?.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 hover:text-[#B8860B] hover:border-[#B8860B] rounded-lg transition-colors shadow-2xs"
                >
                  <FaPhoneAlt className="text-[#B8860B] text-[10px]" /> Call Desk
                </a>
                <a
                  href={`https://wa.me/${info?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors shadow-2xs"
                >
                  <FaWhatsapp className="text-xs" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 border-l-2 border-[#B8860B] pl-2.5">
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs font-medium">
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
                  <NavLink to="/check-booking" className="text-[#8B6508] font-semibold hover:underline block py-0.5">
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
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 border-l-2 border-[#B8860B] pl-2.5">
                Event Services
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600 font-medium">
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
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 border-l-2 border-[#B8860B] pl-2.5">
                Contact & Portal
              </h4>
              <ul className="space-y-2.5 text-xs mb-4">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-[#B8860B] text-xs flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600">{info?.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-[#B8860B] text-xs flex-shrink-0" />
                  <a href={`tel:${info?.phone}`} className="hover:text-[#B8860B] transition-colors font-mono font-bold text-stone-900">
                    {info?.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaWhatsapp className="text-[#25D366] text-sm flex-shrink-0" />
                  <a href={`https://wa.me/${info?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors font-mono font-bold text-stone-900">
                    {info?.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-[#B8860B] text-xs flex-shrink-0" />
                  <a href={`mailto:${info?.email}`} className="hover:text-[#B8860B] transition-colors text-stone-600">
                    {info?.email}
                  </a>
                </li>
              </ul>

              {/* Demo Admin Access link */}
              <div className="pt-1">
                {isAdmin ? (
                  <NavLink
                    to="/admin"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    <FaUserShield className="text-xs" /> Admin Control Panel
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B6508] hover:underline cursor-pointer"
                  >
                    <FaUserShield className="text-xs" /> Admin Portal Login (Demo)
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-medium">
            <p>© 2026 {info?.name || 'Grand Mahal'}. All Rights Reserved.</p>
            <p>
              Royal Weddings & Luxury Conventions
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
