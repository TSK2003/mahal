import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaTimes, FaUserShield, FaCheckCircle, FaArrowRight, FaSignInAlt, FaSignOutAlt 
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
      setError('Invalid credentials. You can use the 1-Click Quick Demo Login button below!');
    }
  };

  const handleLogout = () => {
    dataService.logoutAdmin();
    onClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white border-2 border-[#B8860B]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-[#B8860B] text-[#8B6508] flex items-center justify-center text-2xl mx-auto mb-3 shadow-sm">
              <FaUserShield />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#8B6508] font-bold">
              Grand Mahal Management
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              Admin Portal Login
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Manage live bookings, availability calendar, media gallery, and website components.
            </p>
          </div>

          {isAlreadyLoggedIn ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-3">
                <FaCheckCircle className="text-lg flex-shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold block">Admin Session Active</span>
                  <span>You are currently authenticated as the venue manager.</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    onClose();
                    navigate('/admin');
                  }}
                  icon={FaArrowRight}
                  className="w-full justify-center py-3 text-xs font-bold shadow-md"
                >
                  Enter Admin Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  icon={FaSignOutAlt}
                  className="w-full justify-center py-2.5 text-xs text-stone-600"
                >
                  Sign Out Session
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* ⚡ 1-Click Quick Demo Login Button */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-[#B8860B] space-y-2 text-center shadow-xs">
                <div className="text-xs font-bold text-[#8B6508] flex items-center justify-center gap-1.5">
                  <span>⚡</span> 1-Click Quick Demo Access
                </div>
                <p className="text-[11px] text-stone-600">
                  Instantly access the full Admin Portal without entering credentials:
                </p>
                <Button
                  variant="primary"
                  onClick={handleQuickDemoLogin}
                  icon={FaSignInAlt}
                  className="w-full justify-center py-3 text-xs font-bold shadow-md"
                >
                  ⚡ Quick Demo Login (1-Click)
                </Button>
              </div>

              <div className="flex items-center gap-3 text-stone-400 text-xs">
                <div className="flex-grow h-[1px] bg-stone-200" />
                <span className="text-[10px] uppercase font-bold text-stone-500">Or use credentials</span>
                <div className="flex-grow h-[1px] bg-stone-200" />
              </div>

              {/* Standard Form */}
              <form onSubmit={handleCredentialLogin} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Admin Email / Username</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@grandmahal.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold">{error}</p>
                )}

                <Button type="submit" variant="secondary" className="w-full py-2.5 text-xs font-bold">
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
