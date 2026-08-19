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
    <div className="min-h-screen bg-[#0D0C0B] text-stone-100 flex flex-col justify-between selection:bg-[#C9A227] selection:text-stone-950">
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
