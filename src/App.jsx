import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ConferencePage from './pages/ConferencePage';
import GalleryPage from './pages/GalleryPage';
import VideosPage from './pages/VideosPage';
import PricePage from './pages/PricePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingStatusPage from './pages/BookingStatusPage';

// Admin Portal Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminContentManager from './pages/admin/AdminContentManager';
import AdminGalleryManager from './pages/admin/AdminGalleryManager';
import AdminVideosManager from './pages/admin/AdminVideosManager';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="conference" element={<ConferencePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="price" element={<PricePage />} />
          <Route path="check-booking" element={<BookingStatusPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Management Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="content" element={<AdminContentManager />} />
          <Route path="gallery" element={<AdminGalleryManager />} />
          <Route path="videos" element={<AdminVideosManager />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
