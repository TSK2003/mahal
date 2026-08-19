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
  const [email, setEmail] = useState('admin@murugumahal.com');
  const [password, setPassword] = useState('admin123');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const isLoggedIn = dataService.isAdminAuthenticated();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');

    // Accept demo credentials or PIN 1234 / 123456
    if (
      (email === 'admin@murugumahal.com' && password === 'admin123') ||
      pin === '1234' ||
      pin === '123456' ||
      email.includes('admin')
    ) {
      dataService.loginAdmin();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        navigate('/admin');
      }, 700);
    } else {
      setError('Invalid credentials. Use demo login or PIN: 1234');
    }
  };

  const handleQuickDemoLogin = () => {
    dataService.loginAdmin();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      navigate('/admin');
    }, 500);
  };

  const handleLogout = () => {
    dataService.logoutAdmin();
    onClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-stone-900 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Top Gold Accent Light */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#C9A227]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
          >
            <FaTimes />
          </button>

          {isLoggedIn ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#C9A227]/20 border border-[#C9A227] text-[#C9A227] flex items-center justify-center text-3xl mx-auto shadow-lg">
                <FaUserShield />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  Administrator Session Active
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                  Murugu Mahal Admin Portal
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  You are logged in with full management permissions.
                </p>
              </div>

              <div className="pt-3 space-y-2.5">
                <Button
                  variant="primary"
                  onClick={() => {
                    onClose();
                    navigate('/admin');
                  }}
                  icon={FaArrowRight}
                  className="w-full justify-center py-3 text-sm font-bold"
                >
                  Enter Admin Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  icon={FaSignOutAlt}
                  className="w-full justify-center py-2.5 text-xs text-red-400 border-red-900/50 hover:bg-red-950/40"
                >
                  Logout Session
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DFBA51] to-[#997A15] text-stone-950 flex items-center justify-center text-2xl mx-auto mb-3 shadow-[0_0_20px_rgba(201,162,39,0.4)]">
                  <FaUserShield />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 text-[#C9A227] text-[11px] font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                  Demo Admin Access Mode
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-100">
                  Admin Portal Login
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Manage hall bookings, edit pricing, upload photos, and update all website components.
                </p>
              </div>

              {/* 1-Click Quick Demo Login Button */}
              <div className="mb-5 p-3.5 rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/30 text-center">
                <p className="text-[11px] text-stone-300 mb-2">
                  🚀 For immediate demo evaluation, click below:
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#DFBA51] via-[#C9A227] to-[#997A15] text-stone-950 font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaSignInAlt /> ⚡ 1-Click Quick Demo Login
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-stone-800"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase text-stone-500 font-semibold tracking-wider">
                  Or use credentials
                </span>
                <div className="flex-grow border-t border-stone-800"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-3.5 mt-2 text-left">
                <div>
                  <label className="block text-[11px] text-stone-300 font-medium mb-1">
                    Admin Email / Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-[#C9A227]"
                      placeholder="admin@murugumahal.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-300 font-medium mb-1">
                    Password / Quick PIN (1234)
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-[#C9A227]"
                      placeholder="admin123 or PIN 1234"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900/50">
                    {error}
                  </p>
                )}

                {isSuccess && (
                  <div className="flex items-center justify-center gap-2 text-xs text-[#C9A227] font-semibold py-1">
                    <FaCheckCircle /> Login successful! Redirecting...
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center py-3 text-xs font-bold"
                  >
                    Enter Management Console
                  </Button>
                </div>

                <p className="text-[10px] text-center text-stone-500 pt-1">
                  Default credentials: <span className="text-[#C9A227]">admin@murugumahal.com</span> / <span className="text-[#C9A227]">admin123</span> (or PIN <span className="text-[#C9A227]">1234</span>)
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
