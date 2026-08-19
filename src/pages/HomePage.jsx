import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/home/Hero';
import QuickInfoBar from '../components/home/QuickInfoBar';
import AvailabilityChecker from '../components/home/AvailabilityChecker';
import OverviewSection from '../components/home/OverviewSection';
import FacilitiesSection from '../components/home/FacilitiesSection';
import ClientCarousel from '../components/home/ClientCarousel';
import FeaturedEvents from '../components/home/FeaturedEvents';
import GalleryPreview from '../components/home/GalleryPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import VideoPreview from '../components/home/VideoPreview';
import MahalDescription from '../components/home/MahalDescription';
import EnquiryCTA from '../components/home/EnquiryCTA';
import ContactPreview from '../components/home/ContactPreview';

const HomePage = () => {
  const { onOpenEnquiry } = useOutletContext();

  return (
    <div>
      <Hero onOpenEnquiry={() => onOpenEnquiry('')} />
      <QuickInfoBar />
      <AvailabilityChecker onOpenEnquiry={onOpenEnquiry} />
      <OverviewSection />
      <FacilitiesSection />
      <ClientCarousel />
      <FeaturedEvents onOpenEnquiry={onOpenEnquiry} />
      <GalleryPreview />
      <TestimonialsSection />
      <VideoPreview />
      <MahalDescription />
      <EnquiryCTA onOpenEnquiry={() => onOpenEnquiry('')} />
      <ContactPreview />
    </div>
  );
};

export default HomePage;
