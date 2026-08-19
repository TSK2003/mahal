import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCrown, FaPhoneAlt, FaCalendarCheck, FaUserShield, 
  FaBars, FaTimes, FaSignInAlt, FaCheckCircle, FaStar
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../common/Button';
import AdminLoginModal from '../common/AdminLoginModal';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Overview', path: '/about' },
  { name: 'Facilities', path: '/#facilities' },
  { name: 'Events', path: '/#events' },
  { name: 'Conference', path: '/conference' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Videos', path: '/videos' },
  { name: 'Pricing', path: '/price' },
  { name: 'Check Status', path: '/check-booking' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = ({ onOpenEnquiry }) => {
  const { info, isAdmin } = useMahalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickDemoLogin = () => {
    dataService.loginAdmin();
    navigate('/admin');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled || location.pathname !== '/'
            ? 'glass-nav py-2.5 shadow-xs'
            : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Brand */}
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] flex items-center justify-center text-white text-base font-bold shadow-xs">
                <FaCrown />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 group-hover:text-[#B8860B] transition-colors leading-tight">
                  {(info?.name || 'Grand Mahal').toUpperCase()}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8B6508] font-bold">
                  Luxury Convention & Wedding Mahal
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-2.5 py-1.5 rounded-md text-xs font-semibold tracking-normal transition-colors ${
                      isActive && link.path !== '/#facilities' && link.path !== '/#events'
                        ? 'text-[#8B6508] bg-amber-50'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {/* Demo Admin Access Button */}
              {isAdmin ? (
                <NavLink
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-2xs"
                  title="Open Admin Management Portal"
                >
                  <FaCheckCircle className="text-emerald-600 text-xs" />
                  <span>Admin Panel</span>
                </NavLink>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 hover:border-[#B8860B] text-stone-800 hover:text-[#8B6508] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                  title="Login to Demo Admin Panel"
                >
                  <FaUserShield className="text-[#B8860B] text-xs" />
                  <span>Admin Demo</span>
                </button>
              )}

              {/* Live Enquiry CTA */}
              <Button
                variant="primary"
                onClick={onOpenEnquiry}
                icon={FaCalendarCheck}
                className="text-xs px-3.5 py-2 font-semibold shadow-xs"
              >
                Check Date
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-800 text-[11px] font-semibold"
              >
                <FaUserShield className="text-[#B8860B]" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-stone-100 text-stone-800 hover:text-[#B8860B] focus:outline-none transition-colors border border-stone-200 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-nav border-t border-stone-200 px-4 pt-3 pb-6 space-y-2 text-left bg-white shadow-lg">
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-2">
              <Button
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                icon={FaCalendarCheck}
                className="w-full text-xs py-2.5 font-semibold justify-center"
              >
                Check Date Availability
              </Button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleQuickDemoLogin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                <FaSignInAlt className="text-xs text-[#B8860B]" /> Quick Admin Demo Login
              </button>

              <a
                href={`tel:${info?.phone || '+919840123456'}`}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-xs"
              >
                <FaPhoneAlt className="text-xs text-[#B8860B]" /> Call Desk: {info?.phone || '+91 98401 23456'}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Admin Demo Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
