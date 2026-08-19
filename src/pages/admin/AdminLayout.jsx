import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaCrown, FaTachometerAlt, FaCalendarCheck, FaCalendarAlt, 
  FaEdit, FaImages, FaVideo, FaCog, FaSignOutAlt, 
  FaExternalLinkAlt, FaBars, FaTimes 
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
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between z-30 sticky top-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#B8860B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <FaCrown />
          </div>
          <span className="font-bold text-sm text-stone-900">
            {info?.name || 'Grand Mahal'} Admin
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 cursor-pointer"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar Navigation - Clean Zoho enterprise style */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-stone-200 flex flex-col justify-between p-4 z-40 transition-transform duration-200 shadow-xs ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2 py-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white flex items-center justify-center text-base font-bold shadow-xs">
              <FaCrown />
            </div>
            <div className="text-left">
              <span className="font-serif font-extrabold text-sm text-stone-900 block leading-tight">
                {(info?.name || 'Grand Mahal').toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#8B6508] font-bold">
                Admin Portal
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#B8860B] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`text-sm ${isActive ? 'text-white' : 'text-stone-500'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.name.includes('Bookings') && pendingCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500 text-white shadow-2xs">
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <NavLink
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B6508] hover:border-[#B8860B] text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaExternalLinkAlt className="text-xs text-stone-400" /> View Website
            </span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <FaSignOutAlt className="text-xs" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
