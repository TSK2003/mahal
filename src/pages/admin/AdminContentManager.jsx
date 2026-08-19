import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FaSave, FaPlus, FaTrash, FaCheckCircle, 
  FaCrown, FaUtensils, FaSnowflake, FaStar, FaQuestionCircle, 
  FaTag, FaInfoCircle 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const TABS = [
  { id: 'profile', name: 'Mahal Profile & Contact', icon: FaCrown },
  { id: 'stats', name: 'Specs & Stats', icon: FaInfoCircle },
  { id: 'facilities', name: 'Facilities List', icon: FaSnowflake },
  { id: 'events', name: 'Event Services', icon: FaStar },
  { id: 'packages', name: 'Pricing & Tariff', icon: FaTag },
  { id: 'testimonials', name: 'Client Reviews', icon: FaUtensils },
  { id: 'faqs', name: 'FAQs', icon: FaQuestionCircle }
];

const AdminContentManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(activeTabParam);

  const { info, facilities, events, packages, testimonials, faqs } = useMahalData();

  // Local form states
  const [profileForm, setProfileForm] = useState(info);
  const [statsForm, setStatsForm] = useState(info.stats || []);
  const [facilitiesList, setFacilitiesList] = useState(facilities);
  const [eventsList, setEventsList] = useState(events);
  const [packagesList, setPackagesList] = useState(packages);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [faqsList, setFaqsList] = useState(faqs);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const triggerSuccessBadge = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // 1. Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    dataService.updateMahalInfo({ ...profileForm, stats: statsForm });
    triggerSuccessBadge();
  };

  // 2. Save Stats
  const handleSaveStats = (e) => {
    e.preventDefault();
    dataService.updateMahalInfo({ ...profileForm, stats: statsForm });
    triggerSuccessBadge();
  };

  // 3. Facilities CRUD
  const handleFacilityChange = (idx, field, value) => {
    const updated = [...facilitiesList];
    updated[idx][field] = value;
    setFacilitiesList(updated);
  };
  const handleAddFacility = () => {
    const newFacility = {
      id: Date.now(),
      name: "New Luxury Amenity",
      icon: "FaSnowflake",
      category: "Comfort",
      desc: "Description of the facility.",
      active: true
    };
    const updated = [...facilitiesList, newFacility];
    setFacilitiesList(updated);
    dataService.saveFacilities(updated);
    triggerSuccessBadge();
  };
  const handleDeleteFacility = (id) => {
    const updated = facilitiesList.filter(f => f.id !== id);
    setFacilitiesList(updated);
    dataService.saveFacilities(updated);
    triggerSuccessBadge();
  };
  const handleSaveFacilities = (e) => {
    e.preventDefault();
    dataService.saveFacilities(facilitiesList);
    triggerSuccessBadge();
  };

  // 4. Events CRUD
  const handleEventChange = (idx, field, value) => {
    const updated = [...eventsList];
    updated[idx][field] = value;
    setEventsList(updated);
  };
  const handleAddEvent = () => {
    const newEvt = {
      id: `event-${Date.now()}`,
      title: "New Celebration Type",
      category: "Celebrations",
      desc: "Event description details.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Floral Setup Included", "Stage Lighting", "Dining Hall Access"]
    };
    const updated = [...eventsList, newEvt];
    setEventsList(updated);
    dataService.saveFeaturedEvents(updated);
    triggerSuccessBadge();
  };
  const handleDeleteEvent = (id) => {
    const updated = eventsList.filter(e => e.id !== id);
    setEventsList(updated);
    dataService.saveFeaturedEvents(updated);
    triggerSuccessBadge();
  };
  const handleSaveEvents = (e) => {
    e.preventDefault();
    dataService.saveFeaturedEvents(eventsList);
    triggerSuccessBadge();
  };

  // 5. Packages CRUD
  const handlePackageChange = (idx, field, value) => {
    const updated = [...packagesList];
    updated[idx][field] = value;
    setPackagesList(updated);
  };
  const handleSavePackages = (e) => {
    e.preventDefault();
    dataService.savePackages(packagesList);
    triggerSuccessBadge();
  };

  // 6. Testimonials CRUD
  const handleTestimonialChange = (idx, field, value) => {
    const updated = [...testimonialsList];
    updated[idx][field] = value;
    setTestimonialsList(updated);
  };
  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      clientName: "Happy Couple",
      eventType: "Royal Wedding",
      date: "Recent",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      comment: "Excellent experience and beautiful hall!"
    };
    const updated = [...testimonialsList, newTestimonial];
    setTestimonialsList(updated);
    dataService.saveTestimonials(updated);
    triggerSuccessBadge();
  };
  const handleDeleteTestimonial = (id) => {
    const updated = testimonialsList.filter(t => t.id !== id);
    setTestimonialsList(updated);
    dataService.saveTestimonials(updated);
    triggerSuccessBadge();
  };
  const handleSaveTestimonials = (e) => {
    e.preventDefault();
    dataService.saveTestimonials(testimonialsList);
    triggerSuccessBadge();
  };

  // 7. FAQs CRUD
  const handleFaqChange = (idx, field, value) => {
    const updated = [...faqsList];
    updated[idx][field] = value;
    setFaqsList(updated);
  };
  const handleAddFaq = () => {
    const newFaq = {
      q: "New Frequently Asked Question?",
      a: "Clear and helpful answer details."
    };
    const updated = [...faqsList, newFaq];
    setFaqsList(updated);
    dataService.saveFaqs(updated);
    triggerSuccessBadge();
  };
  const handleDeleteFaq = (idx) => {
    const updated = faqsList.filter((_, i) => i !== idx);
    setFaqsList(updated);
    dataService.saveFaqs(updated);
    triggerSuccessBadge();
  };
  const handleSaveFaqs = (e) => {
    e.preventDefault();
    dataService.saveFaqs(faqsList);
    triggerSuccessBadge();
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Website Component Content Manager
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Edit text, contact info, pricing, facilities, and testimonials live across the public website.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-semibold animate-pulse">
            <FaCheckCircle /> Changes Saved & Live on Website!
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#DFBA51] to-[#C9A227] text-stone-950 font-bold shadow-lg scale-105'
                  : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-[#C9A227]/40 hover:text-white'
              }`}
            >
              <Icon className="text-sm" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: MAHAL PROFILE --- */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Venue Profile & Contact Settings</h3>
              <p className="text-xs text-stone-400">Updates brand headers, contact desk numbers, WhatsApp, and Google Maps.</p>
            </div>
            <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
              Save Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Mahal Brand Name *</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Tagline</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-stone-300 font-medium mb-1">Short Description (Hero & Overview)</label>
            <textarea
              rows={2}
              value={profileForm.shortDesc}
              onChange={(e) => setProfileForm({ ...profileForm, shortDesc: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Primary Phone Number *</label>
              <input
                type="text"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Alternate Phone</label>
              <input
                type="text"
                value={profileForm.altPhone}
                onChange={(e) => setProfileForm({ ...profileForm, altPhone: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">WhatsApp Number (Without +) *</label>
              <input
                type="text"
                required
                value={profileForm.whatsapp}
                onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Official Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Full Physical Address</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Google Maps Direction URL</label>
              <input
                type="url"
                value={profileForm.googleMapsUrl}
                onChange={(e) => setProfileForm({ ...profileForm, googleMapsUrl: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">360° Virtual Tour Collection Link</label>
              <input
                type="url"
                value={profileForm.virtualTourUrl}
                onChange={(e) => setProfileForm({ ...profileForm, virtualTourUrl: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>
        </form>
      )}

      {/* --- TAB 2: SPECS & STATS --- */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSaveStats} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Key Venue Statistics & Specs</h3>
              <p className="text-xs text-stone-400">Displayed prominently on the Home Page quick info ticker bar.</p>
            </div>
            <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
              Save Stats
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {statsForm.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C9A227]">{stat.icon} Stat #{idx + 1}</span>
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx].icon = e.target.value;
                      setStatsForm(updated);
                    }}
                    className="w-10 text-center bg-stone-950 border border-stone-800 rounded-lg p-1 text-xs"
                    placeholder="Icon"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx].label = e.target.value;
                      setStatsForm(updated);
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Value (E.g. 1,200 Seats)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx].value = e.target.value;
                      setStatsForm(updated);
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Subtitle</label>
                  <input
                    type="text"
                    value={stat.sub}
                    onChange={(e) => {
                      const updated = [...statsForm];
                      updated[idx].sub = e.target.value;
                      setStatsForm(updated);
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- TAB 3: FACILITIES MANAGER --- */}
      {activeTab === 'facilities' && (
        <form onSubmit={handleSaveFacilities} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Facilities & Amenities ({facilitiesList.length})</h3>
              <p className="text-xs text-stone-400">Add, reorder, or edit facility cards shown across the website.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddFacility}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold cursor-pointer"
              >
                <FaPlus /> Add Facility
              </button>
              <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
                Save Facilities
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {facilitiesList.map((fac, idx) => (
              <div key={fac.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleDeleteFacility(fac.id)}
                  className="absolute top-3 right-3 text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Remove Facility"
                >
                  <FaTrash className="text-xs" />
                </button>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Facility Name</label>
                  <input
                    type="text"
                    value={fac.name}
                    onChange={(e) => handleFacilityChange(idx, 'name', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Category</label>
                    <select
                      value={fac.category}
                      onChange={(e) => handleFacilityChange(idx, 'category', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                    >
                      <option value="Comfort">Comfort</option>
                      <option value="Dining">Dining</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Rooms">Rooms</option>
                      <option value="Safety">Safety</option>
                      <option value="Amenities">Amenities</option>
                      <option value="Accessibility">Accessibility</option>
                      <option value="Stage">Stage</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Icon ID</label>
                    <input
                      type="text"
                      value={fac.icon}
                      onChange={(e) => handleFacilityChange(idx, 'icon', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={fac.desc}
                    onChange={(e) => handleFacilityChange(idx, 'desc', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300 text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- TAB 4: EVENT SERVICES --- */}
      {activeTab === 'events' && (
        <form onSubmit={handleSaveEvents} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Featured Event Celebrations ({eventsList.length})</h3>
              <p className="text-xs text-stone-400">Manage Royal Wedding, Reception, Engagement, and Corporate services.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddEvent}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold cursor-pointer"
              >
                <FaPlus /> Add Event Type
              </button>
              <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
                Save Events
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {eventsList.map((evt, idx) => (
              <div key={evt.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="absolute top-4 right-4 text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Remove Event Type"
                >
                  <FaTrash className="text-xs" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Event Title</label>
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Category Tag</label>
                    <input
                      type="text"
                      value={evt.category}
                      onChange={(e) => handleEventChange(idx, 'category', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Photo URL</label>
                  <input
                    type="url"
                    value={evt.image}
                    onChange={(e) => handleEventChange(idx, 'image', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={evt.desc}
                    onChange={(e) => handleEventChange(idx, 'desc', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300 text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- TAB 5: PACKAGES & TARIFF --- */}
      {activeTab === 'packages' && (
        <form onSubmit={handleSavePackages} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Pricing Packages & Tariff ({packagesList.length})</h3>
              <p className="text-xs text-stone-400">Edit rental package pricing, popular badge, and included amenities.</p>
            </div>
            <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
              Save Tariff
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {packagesList.map((pkg, idx) => (
              <div key={pkg.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C9A227] text-sm">{pkg.name}</span>
                  <label className="flex items-center gap-1.5 text-[11px] text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pkg.popular || false}
                      onChange={(e) => handlePackageChange(idx, 'popular', e.target.checked)}
                      className="accent-[#C9A227]"
                    />
                    Most Popular Ribbon
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Display Price (E.g. ₹1,85,000)</label>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-[#C9A227] font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Numeric Amount (For Calculator)</label>
                    <input
                      type="number"
                      value={pkg.rawPrice || 185000}
                      onChange={(e) => handlePackageChange(idx, 'rawPrice', Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Duration Period (E.g. per 24 Hours)</label>
                  <input
                    type="text"
                    value={pkg.period}
                    onChange={(e) => handlePackageChange(idx, 'period', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Tagline</label>
                  <input
                    type="text"
                    value={pkg.tagline}
                    onChange={(e) => handlePackageChange(idx, 'tagline', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- TAB 6: TESTIMONIALS --- */}
      {activeTab === 'testimonials' && (
        <form onSubmit={handleSaveTestimonials} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Customer Testimonials & Reviews ({testimonialsList.length})</h3>
              <p className="text-xs text-stone-400">Featured client feedback displayed on the home page.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddTestimonial}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold cursor-pointer"
              >
                <FaPlus /> Add Review
              </button>
              <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
                Save Reviews
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {testimonialsList.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(item.id)}
                  className="absolute top-3 right-3 text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Delete Review"
                >
                  <FaTrash className="text-xs" />
                </button>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Client Names</label>
                  <input
                    type="text"
                    value={item.clientName}
                    onChange={(e) => handleTestimonialChange(idx, 'clientName', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Event Type</label>
                    <input
                      type="text"
                      value={item.eventType}
                      onChange={(e) => handleTestimonialChange(idx, 'eventType', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Date</label>
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => handleTestimonialChange(idx, 'date', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Review Feedback</label>
                  <textarea
                    rows={3}
                    value={item.comment}
                    onChange={(e) => handleTestimonialChange(idx, 'comment', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300 text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* --- TAB 7: FAQS --- */}
      {activeTab === 'faqs' && (
        <form onSubmit={handleSaveFaqs} className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100">Frequently Asked Questions ({faqsList.length})</h3>
              <p className="text-xs text-stone-400">Displayed on the Pricing & Package page accordion.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddFaq}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold cursor-pointer"
              >
                <FaPlus /> Add FAQ
              </button>
              <Button type="submit" variant="primary" icon={FaSave} className="text-xs px-5 py-2 font-bold">
                Save FAQs
              </Button>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {faqsList.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleDeleteFaq(idx)}
                  className="absolute top-3 right-3 text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Remove FAQ"
                >
                  <FaTrash className="text-xs" />
                </button>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Question</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-stone-400 mb-0.5">Answer</label>
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-300 text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminContentManager;
