import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCrown, FaTachometerAlt, FaCalendarCheck, FaCalendarAlt, 
  FaEdit, FaImages, FaVideo, FaCog, FaSignOutAlt, 
  FaExternalLinkAlt, FaBars, FaTimes, FaPlus, FaBell, FaSearch 
} from 'react-icons/fa';
import { dataService } from '../../services/dataService';
import useMahalData from '../../hooks/useMahalData';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, exact: true },
  { name: 'All Bookings', path: '/admin/bookings', icon: FaCalendarCheck },
  { name: 'Event Calendar', path: '/admin/calendar', icon: FaCalendarAlt },
  { name: 'Website CMS', path: '/admin/content', icon: FaEdit },
  { name: 'Photo Gallery', path: '/admin/gallery', icon: FaImages },
  { name: 'Video Highlights', path: '/admin/videos', icon: FaVideo },
  { name: 'Settings & Backup', path: '/admin/settings', icon: FaCog }
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { info, bookings } = useMahalData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth
  useEffect(() => {
    if (!dataService.isAdminAuthenticated()) {
      // Auto-authenticate for smooth demo or allow explicit logout
      dataService.loginAdmin();
    }
  }, []);

  const handleLogout = () => {
    dataService.logoutAdmin();
    navigate('/');
  };

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#0A0908] text-stone-100 flex">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-stone-950 border-r border-[#C9A227]/25 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-stone-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFBA51] to-[#997A15] text-stone-950 flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(201,162,39,0.4)]">
                <FaCrown />
              </div>
              <div className="text-left">
                <h1 className="font-serif font-extrabold text-sm text-stone-100 tracking-wide leading-none">
                  MURUGU MAHAL
                </h1>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold">
                  Admin Control Portal
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-stone-400 hover:text-white p-1"
            >
              <FaTimes />
            </button>
          </div>

          {/* Pending Alerts Pill */}
          {pendingCount > 0 && (
            <div className="mx-4 my-3 p-2.5 rounded-xl bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[#C9A227] font-semibold">
                <FaBell className="animate-bounce" /> {pendingCount} Pending Bookings
              </span>
              <NavLink
                to="/admin/bookings"
                className="text-[10px] bg-[#C9A227] text-stone-950 font-bold px-2 py-0.5 rounded-md hover:bg-white transition-colors"
              >
                Review
              </NavLink>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1.5 text-left">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#DFBA51] to-[#C9A227] text-stone-950 font-bold shadow-lg shadow-[#C9A227]/20 scale-[1.02]'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-[#C9A227]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-base flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.name === 'All Bookings' && pendingCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950">
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800/80 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C9A227]/40 text-xs font-semibold text-stone-300 hover:text-[#C9A227] transition-all"
          >
            <FaExternalLinkAlt className="text-xs" /> View Live Public Site
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/30 transition-all cursor-pointer"
          >
            <FaSignOutAlt /> Exit Admin Portal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            >
              <FaBars className="text-lg" />
            </button>
            <div className="text-left">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A227]">
                Management Console
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-stone-100 leading-tight">
                {info.name} Admin
              </h2>
            </div>
          </div>

          {/* Quick Action + Live Site Button */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/admin/bookings?action=new"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#C9A227] text-stone-950 font-bold text-xs shadow-md hover:bg-white transition-colors"
            >
              <FaPlus /> <span className="hidden sm:inline">Add Booking</span>
            </NavLink>

            <NavLink
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#C9A227] text-xs font-semibold transition-colors"
            >
              <FaExternalLinkAlt className="text-xs" /> <span className="hidden sm:inline">Public Site</span>
            </NavLink>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
