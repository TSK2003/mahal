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
  { id: 'profile', name: 'Profile & Contact', icon: FaInfoCircle },
  { id: 'stats', name: 'Specs & Stats', icon: FaCrown },
  { id: 'facilities', name: 'Facilities & Amenities', icon: FaSnowflake },
  { id: 'events', name: 'Event Services', icon: FaUtensils },
  { id: 'packages', name: 'Tariff Packages', icon: FaTag },
  { id: 'testimonials', name: 'Client Reviews', icon: FaStar },
  { id: 'faqs', name: 'FAQs', icon: FaQuestionCircle }
];

const AdminContentManager = () => {
  const { info, facilities, events, packages, testimonials, faqs } = useMahalData();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState(info);
  const [packagesList, setPackagesList] = useState(packages);
  const [faqsList, setFaqsList] = useState(faqs);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dataService.updateMahalInfo(profileForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSavePackages = () => {
    dataService.savePackages(packagesList);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveFaqs = () => {
    dataService.saveFaqs(faqsList);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            Dynamic Component Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            Website Content & Pricing Editor
          </h1>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
            <FaCheckCircle className="text-emerald-600" /> Changes Published Live to Website!
          </div>
        )}
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#B8860B] text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900 shadow-xs'
              }`}
            >
              <Icon className="text-sm" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile & Contact */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="glass-card rounded-3xl p-8 border border-stone-200 shadow-md space-y-6 max-w-4xl bg-white text-xs">
          <h3 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
            Mahal Identity & Public Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Mahal Brand Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:border-[#B8860B]"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Brand Tagline</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:border-[#B8860B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">Detailed Venue Description</label>
            <textarea
              rows={3}
              value={profileForm.shortDesc}
              onChange={(e) => setProfileForm({ ...profileForm, shortDesc: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 focus:border-[#B8860B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Primary Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-mono focus:border-[#B8860B]"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">WhatsApp Phone (International)</label>
              <input
                type="text"
                value={profileForm.whatsapp}
                onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-mono focus:border-[#B8860B]"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Official Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:border-[#B8860B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1">Full Postal Address</label>
            <input
              type="text"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:border-[#B8860B]"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" icon={FaSave} className="py-3 font-bold shadow-md">
              Save & Publish Profile Updates
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Specs & Stats */}
      {activeTab === 'stats' && (
        <div className="glass-card rounded-3xl p-8 border border-stone-200 shadow-md space-y-6 max-w-4xl bg-white text-xs">
          <h3 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
            Hall Dimensions & Technical Capacity Specs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(profileForm.stats || []).map((st, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                <label className="text-stone-600 block uppercase font-bold text-[10px]">{st.label}</label>
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const copy = [...profileForm.stats];
                    copy[idx].value = e.target.value;
                    setProfileForm({ ...profileForm, stats: copy });
                  }}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold"
                />
                <input
                  type="text"
                  value={st.sub}
                  onChange={(e) => {
                    const copy = [...profileForm.stats];
                    copy[idx].sub = e.target.value;
                    setProfileForm({ ...profileForm, stats: copy });
                  }}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-stone-500 text-[11px]"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button onClick={handleSaveProfile} variant="primary" icon={FaSave} className="py-3 font-bold shadow-md">
              Save Stats
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: Facilities CRUD */}
      {activeTab === 'facilities' && (
        <div className="space-y-6 max-w-5xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Live Facilities & Amenities ({facilities.length})
            </h3>
            <Button
              variant="primary"
              onClick={() => {
                const title = prompt('Enter new Facility name:');
                if (title) {
                  dataService.addFacility({
                    title,
                    category: 'Utility',
                    desc: 'Fully air-conditioned luxury amenity available for all booked events.',
                    icon: 'FaSnowflake'
                  });
                }
              }}
              icon={FaPlus}
              className="text-xs py-2 shadow-sm"
            >
              Add Facility
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((fac) => (
              <div key={fac.id} className="glass-card rounded-2xl p-5 border border-stone-200 flex flex-col justify-between shadow-xs bg-white text-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider">{fac.category}</span>
                    <button
                      onClick={() => dataService.deleteFacility(fac.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">{fac.title}</h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Packages & Pricing */}
      {activeTab === 'packages' && (
        <div className="space-y-6 max-w-5xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Rental Tariff Packages ({packagesList.length})
            </h3>
            <Button onClick={handleSavePackages} variant="primary" icon={FaSave} className="text-xs py-2 shadow-sm">
              Save All Packages
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packagesList.map((pkg, idx) => (
              <div key={pkg.id} className="glass-card rounded-3xl p-6 border border-stone-200 space-y-4 bg-white text-xs shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-700 font-bold block mb-1">Package Name</label>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => {
                        const copy = [...packagesList];
                        copy[idx].name = e.target.value;
                        setPackagesList(copy);
                      }}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-stone-700 font-bold block mb-1">Rental Price Tag</label>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => {
                        const copy = [...packagesList];
                        copy[idx].price = e.target.value;
                        setPackagesList(copy);
                      }}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-[#8B6508] font-bold font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-700 font-bold block mb-1">Duration / Period</label>
                  <input
                    type="text"
                    value={pkg.period}
                    onChange={(e) => {
                      const copy = [...packagesList];
                      copy[idx].period = e.target.value;
                      setPackagesList(copy);
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-stone-700 font-bold block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={pkg.tagline}
                    onChange={(e) => {
                      const copy = [...packagesList];
                      copy[idx].tagline = e.target.value;
                      setPackagesList(copy);
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-600 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Frequently Asked Questions ({faqsList.length})
            </h3>
            <Button onClick={handleSaveFaqs} variant="primary" icon={FaSave} className="text-xs py-2 shadow-sm">
              Save FAQs
            </Button>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-stone-200 space-y-3 bg-white text-xs shadow-xs">
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Question:</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const copy = [...faqsList];
                      copy[idx].q = e.target.value;
                      setFaqsList(copy);
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-stone-700 font-bold block mb-1">Answer:</label>
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => {
                      const copy = [...faqsList];
                      copy[idx].a = e.target.value;
                      setFaqsList(copy);
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-600 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContentManager;
