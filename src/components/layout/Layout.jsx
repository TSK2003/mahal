import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from '../common/FloatingButtons';
import EnquiryModal from '../common/EnquiryModal';

const Layout = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenEnquiry = (pkgName = '') => {
    setSelectedPackage(pkgName);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setSelectedPackage('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-between selection:bg-[#B8860B] selection:text-white">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('')} />

      <main className={`flex-grow ${location.pathname === '/' ? '' : 'pt-20'}`}>
        <Outlet context={{ onOpenEnquiry: handleOpenEnquiry }} />
      </main>

      <FloatingButtons />

      <Footer onOpenEnquiry={() => handleOpenEnquiry('')} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default Layout;
