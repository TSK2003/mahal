import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCrown, FaTachometerAlt, FaCalendarCheck, FaCalendarAlt, 
  FaEdit, FaImages, FaVideo, FaCog, FaSignOutAlt, 
  FaExternalLinkAlt, FaBars, FaTimes, FaPlus, FaBell 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';

const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, end: true },
  { name: 'Bookings & Invoices', path: '/admin/bookings', icon: FaCalendarCheck },
  { name: 'Availability Calendar', path: '/admin/calendar', icon: FaCalendarAlt },
  { name: 'Website Content CMS', path: '/admin/content', icon: FaEdit },
  { name: 'Photo Gallery', path: '/admin/gallery', icon: FaImages },
  { name: 'Video Showcase', path: '/admin/videos', icon: FaVideo },
  { name: 'Settings & Backup', path: '/admin/settings', icon: FaCog }
];

const AdminLayout = () => {
  const { info, bookings } = useMahalData();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  const handleLogout = () => {
    dataService.logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between z-30 sticky top-0 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6508] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <FaCrown />
          </div>
          <span className="font-serif font-bold text-sm text-stone-900">
            {info?.name || 'Grand Mahal'} Admin
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 cursor-pointer"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-stone-200 flex flex-col justify-between p-6 z-40 transition-transform duration-300 shadow-md ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] text-white flex items-center justify-center text-xl font-bold shadow-[0_4px_15px_rgba(184,134,11,0.3)]">
              <FaCrown />
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-base text-stone-900 block leading-tight">
                {(info?.name || 'Grand Mahal').toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B6508] font-bold">
                Admin Control Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-left">
            {ADMIN_NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = item.end 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-sm ${isActive ? 'text-white' : 'text-[#8B6508]'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.name.includes('Bookings') && pendingCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white shadow-xs">
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t border-stone-100">
          <NavLink
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B6508] hover:border-[#B8860B] text-xs font-bold transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaExternalLinkAlt className="text-xs" /> View Live Website
            </span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <FaSignOutAlt /> Sign Out Admin
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
