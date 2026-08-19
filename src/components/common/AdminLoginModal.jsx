import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaTimes, FaUserShield, FaCheckCircle, FaArrowRight, FaSignInAlt, FaSignOutAlt, FaBolt 
} from 'react-icons/fa';
import { dataService } from '../../services/dataService';
import Button from './Button';

const AdminLoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@grandmahal.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isAlreadyLoggedIn = dataService.isAdminAuthenticated();

  const handleQuickDemoLogin = () => {
    dataService.loginAdmin();
    onClose();
    navigate('/admin');
  };

  const handleCredentialLogin = (e) => {
    e.preventDefault();
    if (
      (email === 'admin@grandmahal.com' || email === 'admin@murugumahal.com' || email === 'admin') &&
      (password === 'admin123' || password === '1234')
    ) {
      dataService.loginAdmin();
      onClose();
      navigate('/admin');
    } else {
      setError('Invalid credentials. You can use the Quick Demo Login button below.');
    }
  };

  const handleLogout = () => {
    dataService.logoutAdmin();
    onClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-md bg-white border border-stone-200 rounded-lg p-6 sm:p-7 shadow-xl text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer"
          >
            <FaTimes />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-lg mx-auto mb-2 shadow-2xs">
              <FaUserShield />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
              Grand Mahal Management
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
              Admin Portal Access
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage reservations, availability calendar, media gallery, and content.
            </p>
          </div>

          {isAlreadyLoggedIn ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2.5">
                <FaCheckCircle className="text-base flex-shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold block">Admin Session Active</span>
                  <span>You are authenticated as the venue manager.</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    onClose();
                    navigate('/admin');
                  }}
                  icon={FaArrowRight}
                  className="w-full justify-center py-2.5 text-xs font-semibold shadow-xs"
                >
                  Enter Admin Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  icon={FaSignOutAlt}
                  className="w-full justify-center py-2 text-xs text-stone-600"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 1-Click Quick Demo Login Button */}
              <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 space-y-1.5 text-center">
                <div className="text-xs font-bold text-[#8B6508] flex items-center justify-center gap-1.5">
                  <FaBolt className="text-xs" /> 1-Click Quick Demo Access
                </div>
                <p className="text-[11px] text-stone-600">
                  Instantly access the full Admin Portal without entering credentials:
                </p>
                <Button
                  variant="primary"
                  onClick={handleQuickDemoLogin}
                  icon={FaSignInAlt}
                  className="w-full justify-center py-2 text-xs font-semibold shadow-xs mt-1"
                >
                  Quick Demo Login (1-Click)
                </Button>
              </div>

              <div className="flex items-center gap-2.5 text-stone-400 text-xs">
                <div className="flex-grow h-[1px] bg-stone-200" />
                <span className="text-[10px] uppercase font-bold text-stone-400">Or use credentials</span>
                <div className="flex-grow h-[1px] bg-stone-200" />
              </div>

              {/* Standard Form */}
              <form onSubmit={handleCredentialLogin} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Admin Email / Username</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@grandmahal.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold">{error}</p>
                )}

                <Button type="submit" variant="secondary" className="w-full py-2 text-xs font-semibold">
                  Sign In with Password
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
