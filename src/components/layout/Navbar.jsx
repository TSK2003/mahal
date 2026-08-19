import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCrown, FaBars, FaTimes, FaPhoneAlt, 
  FaCalendarCheck, FaUserShield, FaSearch 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';
import AdminLoginModal from '../common/AdminLoginModal';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Conference', path: '/conference' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Videos', path: '/videos' },
  { name: 'Price & Tariff', path: '/price' },
  { name: 'Check Status', path: '/check-booking' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = ({ onOpenEnquiry }) => {
  const { info, isAdmin } = useMahalData();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const [visible, setVisible] = useState(!isHomePage);
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setVisible(true);
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setVisible(true);
        setIsScrolled(true);
      } else {
        setVisible(false);
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-in-out transform ${
          visible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'glass-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Left */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFBA51] via-[#C9A227] to-[#997A15] flex items-center justify-center text-stone-950 text-xl font-bold shadow-[0_0_15px_rgba(201,162,39,0.5)] group-hover:scale-105 transition-transform">
              <FaCrown />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-xl font-extrabold tracking-wide text-stone-100 group-hover:text-[#C9A227] transition-colors leading-none">
                {info.name.toUpperCase()}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#C9A227] font-semibold mt-1">
                Luxury Wedding & Convention
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-stone-950/70 p-1.5 rounded-full border border-stone-800/80 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-stone-950 font-bold bg-gradient-to-r from-[#DFBA51] to-[#C9A227] shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Stack (Admin Login Button + Enquiry CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Demo Admin Login Button */}
            {isAdmin ? (
              <NavLink
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-stone-950 text-xs font-bold transition-all shadow-md"
              >
                <FaUserShield className="text-sm" />
                <span>Admin Portal</span>
              </NavLink>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 text-[#C9A227] hover:bg-[#C9A227] hover:text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <FaUserShield className="text-sm" />
                <span>Admin Demo</span>
              </button>
            )}

            <Button
              variant="primary"
              onClick={onOpenEnquiry}
              icon={FaCalendarCheck}
              className="text-xs px-4 py-2 font-bold shadow-lg"
            >
              Enquire
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAdmin ? (
              <NavLink
                to="/admin"
                className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40"
              >
                Admin
              </NavLink>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#C9A227]/20 text-[#C9A227] text-xs font-bold border border-[#C9A227]/40"
              >
                Admin
              </button>
            )}

            <Button
              variant="primary"
              onClick={onOpenEnquiry}
              className="text-xs px-3 py-1.5"
            >
              Enquire
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-200 hover:text-[#C9A227] bg-stone-900 border border-stone-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-stone-950/95 border-b border-[#C9A227]/30 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-2.5 text-left">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                        isActive
                          ? 'bg-[#C9A227] text-stone-950 font-bold shadow-md'
                          : 'text-stone-300 hover:bg-stone-900 hover:text-[#C9A227]'
                      }`}
                    >
                      {item.name}
                    </NavLink>
                  );
                })}

                <div className="pt-4 border-t border-stone-800 space-y-2.5">
                  {isAdmin ? (
                    <NavLink
                      to="/admin"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs shadow-md"
                    >
                      <FaUserShield /> Go to Admin Portal
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsAdminLoginModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] font-bold text-xs"
                    >
                      <FaUserShield /> Open Admin Demo Login
                    </button>
                  )}

                  <Button
                    variant="primary"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    className="w-full justify-center py-2.5 text-xs font-bold"
                  >
                    <FaCalendarCheck /> Enquire Dates
                  </Button>

                  <a
                    href={`tel:${info.phone}`}
                    className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#C9A227]"
                  >
                    <FaPhoneAlt /> Call Us: {info.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
