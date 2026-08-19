import { 
  DEFAULT_MAHAL_INFO, 
  DEFAULT_FACILITIES, 
  DEFAULT_FEATURED_EVENTS, 
  DEFAULT_GALLERY_IMAGES, 
  DEFAULT_VIDEOS, 
  DEFAULT_PACKAGES, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_FAQS, 
  DEFAULT_BOOKINGS 
} from '../data/mahalData';

const STORAGE_KEYS = {
  INFO: 'mahal_info_v2',
  FACILITIES: 'mahal_facilities_v2',
  EVENTS: 'mahal_events_v2',
  GALLERY: 'mahal_gallery_v2',
  VIDEOS: 'mahal_videos_v2',
  PACKAGES: 'mahal_packages_v2',
  TESTIMONIALS: 'mahal_testimonials_v2',
  FAQS: 'mahal_faqs_v2',
  BOOKINGS: 'mahal_bookings_v2'
};

// Event listener for cross-component reactivity
const LISTENERS = new Set();
export const subscribeToDataChanges = (callback) => {
  LISTENERS.add(callback);
  return () => LISTENERS.delete(callback);
};

const notifyListeners = () => {
  LISTENERS.forEach((callback) => {
    try {
      callback();
    } catch (e) {
      console.error("Listener notification error:", e);
    }
  });
};

const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(item);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
    }
    if (typeof fallback === 'object' && fallback !== null) {
      return { ...fallback, ...parsed };
    }
    return parsed;
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
};

// --- DATA SERVICE API ---

export const dataService = {
  // Mahal Profile
  getMahalInfo: () => getStorageItem(STORAGE_KEYS.INFO, DEFAULT_MAHAL_INFO),
  updateMahalInfo: (updatedInfo) => {
    setStorageItem(STORAGE_KEYS.INFO, updatedInfo);
    return updatedInfo;
  },

  // Facilities
  getFacilities: () => getStorageItem(STORAGE_KEYS.FACILITIES, DEFAULT_FACILITIES),
  saveFacilities: (facilities) => {
    setStorageItem(STORAGE_KEYS.FACILITIES, facilities);
    return facilities;
  },
  addFacility: (facility) => {
    const list = getStorageItem(STORAGE_KEYS.FACILITIES, DEFAULT_FACILITIES);
    const newFacility = { ...facility, id: Date.now() };
    const updated = [newFacility, ...list];
    setStorageItem(STORAGE_KEYS.FACILITIES, updated);
    return updated;
  },
  deleteFacility: (id) => {
    const list = getStorageItem(STORAGE_KEYS.FACILITIES, DEFAULT_FACILITIES);
    const updated = list.filter(item => item.id !== id);
    setStorageItem(STORAGE_KEYS.FACILITIES, updated);
    return updated;
  },

  // Events
  getFeaturedEvents: () => getStorageItem(STORAGE_KEYS.EVENTS, DEFAULT_FEATURED_EVENTS),
  saveFeaturedEvents: (events) => {
    setStorageItem(STORAGE_KEYS.EVENTS, events);
    return events;
  },
  addFeaturedEvent: (event) => {
    const list = getStorageItem(STORAGE_KEYS.EVENTS, DEFAULT_FEATURED_EVENTS);
    const newEvent = { ...event, id: event.id || `event-${Date.now()}` };
    const updated = [newEvent, ...list];
    setStorageItem(STORAGE_KEYS.EVENTS, updated);
    return updated;
  },
  deleteFeaturedEvent: (id) => {
    const list = getStorageItem(STORAGE_KEYS.EVENTS, DEFAULT_FEATURED_EVENTS);
    const updated = list.filter(item => item.id !== id);
    setStorageItem(STORAGE_KEYS.EVENTS, updated);
    return updated;
  },

  // Gallery
  getGalleryImages: () => getStorageItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY_IMAGES),
  saveGalleryImages: (images) => {
    setStorageItem(STORAGE_KEYS.GALLERY, images);
    return images;
  },
  addGalleryImage: (image) => {
    const list = getStorageItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY_IMAGES);
    const newImage = { ...image, id: Date.now() };
    const updated = [newImage, ...list];
    setStorageItem(STORAGE_KEYS.GALLERY, updated);
    return updated;
  },
  deleteGalleryImage: (id) => {
    const list = getStorageItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY_IMAGES);
    const updated = list.filter(img => img.id !== id);
    setStorageItem(STORAGE_KEYS.GALLERY, updated);
    return updated;
  },

  // Videos
  getVideos: () => getStorageItem(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS),
  saveVideos: (videos) => {
    setStorageItem(STORAGE_KEYS.VIDEOS, videos);
    return videos;
  },
  addVideo: (video) => {
    const list = getStorageItem(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
    const newVideo = { ...video, id: Date.now() };
    const updated = [newVideo, ...list];
    setStorageItem(STORAGE_KEYS.VIDEOS, updated);
    return updated;
  },
  deleteVideo: (id) => {
    const list = getStorageItem(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
    const updated = list.filter(vid => vid.id !== id);
    setStorageItem(STORAGE_KEYS.VIDEOS, updated);
    return updated;
  },

  // Packages
  getPackages: () => getStorageItem(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES),
  savePackages: (packages) => {
    setStorageItem(STORAGE_KEYS.PACKAGES, packages);
    return packages;
  },

  // Testimonials
  getTestimonials: () => getStorageItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),
  saveTestimonials: (testimonials) => {
    setStorageItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
    return testimonials;
  },
  addTestimonial: (testimonial) => {
    const list = getStorageItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    const newTestimonial = { ...testimonial, id: Date.now() };
    const updated = [newTestimonial, ...list];
    setStorageItem(STORAGE_KEYS.TESTIMONIALS, updated);
    return updated;
  },
  deleteTestimonial: (id) => {
    const list = getStorageItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    const updated = list.filter(t => t.id !== id);
    setStorageItem(STORAGE_KEYS.TESTIMONIALS, updated);
    return updated;
  },

  // FAQs
  getFaqs: () => getStorageItem(STORAGE_KEYS.FAQS, DEFAULT_FAQS),
  saveFaqs: (faqs) => {
    setStorageItem(STORAGE_KEYS.FAQS, faqs);
    return faqs;
  },

  // Bookings CRUD
  getBookings: () => getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS),
  getBookingByIdOrPhone: (query) => {
    const list = getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    const cleanQuery = query.trim().toLowerCase();
    return list.find(b => 
      b.id.toLowerCase() === cleanQuery || 
      b.phone.replace(/[^0-9]/g, '').includes(cleanQuery.replace(/[^0-9]/g, ''))
    );
  },
  addBooking: (booking) => {
    const list = getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      totalAmount: booking.totalAmount || 185000,
      advancePaid: booking.advancePaid || 0,
      balanceDue: (booking.totalAmount || 185000) - (booking.advancePaid || 0),
      ...booking
    };
    const updated = [newBooking, ...list];
    setStorageItem(STORAGE_KEYS.BOOKINGS, updated);
    return newBooking;
  },
  updateBooking: (updatedBooking) => {
    const list = getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    const balanceDue = (Number(updatedBooking.totalAmount) || 0) - (Number(updatedBooking.advancePaid) || 0);
    const calculated = { ...updatedBooking, balanceDue: balanceDue >= 0 ? balanceDue : 0 };
    const updated = list.map(b => b.id === calculated.id ? calculated : b);
    setStorageItem(STORAGE_KEYS.BOOKINGS, updated);
    return calculated;
  },
  deleteBooking: (id) => {
    const list = getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    const updated = list.filter(b => b.id !== id);
    setStorageItem(STORAGE_KEYS.BOOKINGS, updated);
    return updated;
  },

  // Date Availability Checker
  checkDateAvailability: (targetDate) => {
    if (!targetDate) return { isAvailable: true, bookings: [] };
    const list = getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    const activeBookings = list.filter(
      b => b.eventDate === targetDate && b.status !== 'Cancelled'
    );

    const hasFullDay = activeBookings.some(b => b.timeSlot?.includes('24') || b.timeSlot?.includes('Full'));
    const hasMorning = activeBookings.some(b => b.timeSlot?.includes('Morning') || b.timeSlot?.includes('Full'));
    const hasEvening = activeBookings.some(b => b.timeSlot?.includes('Evening') || b.timeSlot?.includes('Full'));

    return {
      date: targetDate,
      isAvailable: activeBookings.length === 0,
      hasFullDay,
      hasMorning,
      hasEvening,
      availableSlots: {
        morning: !hasMorning && !hasFullDay,
        evening: !hasEvening && !hasFullDay,
        fullDay: activeBookings.length === 0
      },
      bookings: activeBookings
    };
  },

  // Reset & Backup Operations
  resetToDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(DEFAULT_MAHAL_INFO));
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(DEFAULT_FACILITIES));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_FEATURED_EVENTS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY_IMAGES));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(DEFAULT_VIDEOS));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(DEFAULT_PACKAGES));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(DEFAULT_FAQS));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    notifyListeners();
  },

  exportBackupJson: () => {
    const backup = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      info: getStorageItem(STORAGE_KEYS.INFO, DEFAULT_MAHAL_INFO),
      facilities: getStorageItem(STORAGE_KEYS.FACILITIES, DEFAULT_FACILITIES),
      events: getStorageItem(STORAGE_KEYS.EVENTS, DEFAULT_FEATURED_EVENTS),
      gallery: getStorageItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY_IMAGES),
      videos: getStorageItem(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS),
      packages: getStorageItem(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES),
      testimonials: getStorageItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),
      faqs: getStorageItem(STORAGE_KEYS.FAQS, DEFAULT_FAQS),
      bookings: getStorageItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS)
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackupJson: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.info) localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(data.info));
      if (data.facilities) localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(data.facilities));
      if (data.events) localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(data.events));
      if (data.gallery) localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(data.gallery));
      if (data.videos) localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(data.videos));
      if (data.packages) localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(data.packages));
      if (data.testimonials) localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(data.testimonials));
      if (data.faqs) localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(data.faqs));
      if (data.bookings) localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(data.bookings));
      notifyListeners();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Auth / Session Management
  isAdminAuthenticated: () => {
    const auth = sessionStorage.getItem('mahal_admin_logged_in') || localStorage.getItem('mahal_admin_logged_in');
    return auth === 'true';
  },
  loginAdmin: () => {
    sessionStorage.setItem('mahal_admin_logged_in', 'true');
    localStorage.setItem('mahal_admin_logged_in', 'true');
    notifyListeners();
    return true;
  },
  logoutAdmin: () => {
    sessionStorage.removeItem('mahal_admin_logged_in');
    localStorage.removeItem('mahal_admin_logged_in');
    notifyListeners();
    return false;
  }
};
