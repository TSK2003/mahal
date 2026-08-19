import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaCrown, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, 
  FaFacebookF, FaInstagram, FaYoutube, FaMapMarkedAlt, FaCalendarAlt, 
  FaUserShield, FaSearch 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import AdminLoginModal from '../common/AdminLoginModal';

const Footer = ({ onOpenEnquiry }) => {
  const { info, isAdmin } = useMahalData();
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-stone-950 text-stone-300 border-t border-[#C9A227]/30 pt-16 pb-12 relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-left">
            
            {/* Col 1: Brand Info (Spans 2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFBA51] via-[#C9A227] to-[#997A15] flex items-center justify-center text-stone-950 text-xl font-bold shadow-[0_0_15px_rgba(201,162,39,0.5)]">
                  <FaCrown />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-wide text-stone-100 group-hover:text-[#C9A227] transition-colors">
                    {info.name.toUpperCase()}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A227] font-semibold">
                    Luxury Wedding Venue & Convention Center
                  </span>
                </div>
              </NavLink>

              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                {info.shortDesc}
              </p>

              {/* Quick Actions Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  onClick={onOpenEnquiry}
                  className="text-xs px-4 py-2"
                >
                  <FaCalendarAlt /> Enquire Now
                </Button>
                <a
                  href={`tel:${info.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-200 hover:text-[#C9A227] hover:border-[#C9A227] rounded-full transition-colors"
                >
                  <FaPhoneAlt className="text-[#C9A227]" /> Call Desk
                </a>
                <a
                  href={`https://wa.me/${info.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366]/10 border border-[#25D366]/40 text-xs font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full transition-colors"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-[#C9A227] pl-3">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <NavLink to="/" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Home Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/conference" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Conference Hall
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Photo Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/videos" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Video Showcase
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/price" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Packages & Price
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/check-booking" className="text-[#C9A227] font-semibold hover:underline block py-0.5">
                    Check Booking Status
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="hover:text-[#C9A227] transition-colors block py-0.5">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-[#C9A227] pl-3">
                Event Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="text-stone-300">Royal Traditional Weddings</li>
                <li className="text-stone-300">Grand Evening Receptions</li>
                <li className="text-stone-300">Engagement Ceremonies</li>
                <li className="text-stone-300">Birthday Galas & Sangeet</li>
                <li className="text-stone-300">Corporate Conferences & AGMs</li>
                <li className="text-stone-300">Naming Ceremonies</li>
                <li className="text-stone-300">Anniversary Galas</li>
              </ul>
            </div>

            {/* Col 4: Contact Information & Admin */}
            <div>
              <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-[#C9A227] pl-3">
                Contact & Portal
              </h4>
              <ul className="space-y-3 text-xs mb-6">
                <li className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="text-[#C9A227] text-sm flex-shrink-0 mt-0.5" />
                  <span className="text-stone-400">{info.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaPhoneAlt className="text-[#C9A227] text-sm flex-shrink-0" />
                  <a href={`tel:${info.phone}`} className="hover:text-[#C9A227] transition-colors font-mono">
                    {info.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaWhatsapp className="text-[#25D366] text-base flex-shrink-0" />
                  <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors font-mono">
                    {info.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaEnvelope className="text-[#C9A227] text-sm flex-shrink-0" />
                  <a href={`mailto:${info.email}`} className="hover:text-[#C9A227] transition-colors">
                    {info.email}
                  </a>
                </li>
              </ul>

              {/* Demo Admin Access link */}
              <div className="pt-2">
                {isAdmin ? (
                  <NavLink
                    to="/admin"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline"
                  >
                    <FaUserShield /> Open Admin Control Panel
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A227] hover:underline cursor-pointer"
                  >
                    <FaUserShield /> Open Admin Portal Login (Demo)
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© 2026 {info.name}. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <span className="text-[#C9A227]">♥</span> for Royal Weddings & Celebrations
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
