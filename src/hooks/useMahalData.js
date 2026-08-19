import { useState, useEffect } from 'react';
import { dataService, subscribeToDataChanges } from '../services/dataService';

export const useMahalData = () => {
  const [info, setInfo] = useState(dataService.getMahalInfo());
  const [facilities, setFacilities] = useState(dataService.getFacilities());
  const [events, setEvents] = useState(dataService.getFeaturedEvents());
  const [gallery, setGallery] = useState(dataService.getGalleryImages());
  const [videos, setVideos] = useState(dataService.getVideos());
  const [packages, setPackages] = useState(dataService.getPackages());
  const [testimonials, setTestimonials] = useState(dataService.getTestimonials());
  const [faqs, setFaqs] = useState(dataService.getFaqs());
  const [bookings, setBookings] = useState(dataService.getBookings());
  const [isAdmin, setIsAdmin] = useState(dataService.isAdminAuthenticated());

  const refreshAll = () => {
    setInfo(dataService.getMahalInfo());
    setFacilities(dataService.getFacilities());
    setEvents(dataService.getFeaturedEvents());
    setGallery(dataService.getGalleryImages());
    setVideos(dataService.getVideos());
    setPackages(dataService.getPackages());
    setTestimonials(dataService.getTestimonials());
    setFaqs(dataService.getFaqs());
    setBookings(dataService.getBookings());
    setIsAdmin(dataService.isAdminAuthenticated());
  };

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      refreshAll();
    });
    return () => unsubscribe();
  }, []);

  return {
    info,
    facilities,
    events,
    gallery,
    videos,
    packages,
    testimonials,
    faqs,
    bookings,
    isAdmin,
    refreshAll,
    dataService
  };
};

export default useMahalData;
