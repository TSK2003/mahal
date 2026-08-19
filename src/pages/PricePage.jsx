import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FaChevronDown, FaQuestionCircle, FaCalculator, 
  FaCalendarCheck, FaCheck 
} from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import PricingCard from '../components/common/PricingCard';
import useMahalData from '../hooks/useMahalData';
import Button from '../components/common/Button';

const PricePage = () => {
  const { onOpenEnquiry } = useOutletContext();
  const { packages, faqs } = useMahalData();
  const [openFaq, setOpenFaq] = useState(0);

  // Cost Calculator State
  const [calcDuration, setCalcDuration] = useState('24hr');
  const [calcRooms, setCalcRooms] = useState(6);
  const [calcDecorTier, setCalcDecorTier] = useState('premium');
  const [calcSoundLights, setCalcSoundLights] = useState(true);

  // Compute calculated estimate
  const basePrice = calcDuration === '24hr' ? 185000 : calcDuration === '12hr' ? 125000 : 65000;
  const extraRoomsCost = calcRooms > 4 ? (calcRooms - 4) * 2500 : 0;
  const decorCost = calcDecorTier === 'royal' ? 65000 : calcDecorTier === 'premium' ? 35000 : 15000;
  const soundCost = calcSoundLights ? 18000 : 0;
  const totalCalculatedEstimate = basePrice + extraRoomsCost + decorCost + soundCost;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Transparent Pricing"
        title="Royal Rental Packages"
        description="Choose the ideal venue package tailored to your celebration duration, guest capacity, and facility requirements."
      />

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
        {packages.map((pkg) => (
          <PricingCard
            key={pkg.id}
            pkg={pkg}
            onEnquire={(pkgName) => onOpenEnquiry(pkgName)}
          />
        ))}
      </div>

      {/* Interactive Custom Event Cost Estimator */}
      <div className="glass-card rounded-lg p-6 sm:p-8 border border-stone-200 shadow-xs mb-16 text-left relative bg-white">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-[#8B6508] text-xs font-bold uppercase tracking-wider mb-2">
            <FaCalculator className="text-xs" /> Instant Tariff Estimator
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Customize Your Wedding Package Cost
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Adjust your venue rental duration, extra deluxe suites, and stage decoration tier to receive an instant transparent cost estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Options (Col 7) */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            {/* 1. Duration */}
            <div>
              <label className="block text-stone-800 font-semibold mb-1.5">1. Select Venue Duration:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '6hr', label: '6 Hours (Gala)', sub: '₹65,000' },
                  { id: '12hr', label: '12 Hours (Reception)', sub: '₹1,25,000' },
                  { id: '24hr', label: '24 Hours (Full Wedding)', sub: '₹1,85,000' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcDuration(item.id)}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      calcDuration === item.id
                        ? 'bg-[#B8860B] text-white border-[#B8860B] font-bold shadow-2xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="block text-[11px] leading-tight font-semibold">{item.label}</span>
                    <span className="block text-[10px] opacity-90 font-mono mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Extra Deluxe Rooms */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-stone-800 font-semibold">2. Air-Conditioned Deluxe Guest Suites:</label>
                <span className="text-[#8B6508] font-mono font-bold text-xs">{calcRooms} Rooms</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                value={calcRooms}
                onChange={(e) => setCalcRooms(Number(e.target.value))}
                className="w-full accent-[#B8860B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>0 Suites</span>
                <span>4 Included in Package</span>
                <span>14 Total Max</span>
              </div>
            </div>

            {/* 3. Stage & Floral Decor Tier */}
            <div>
              <label className="block text-stone-800 font-semibold mb-1.5">3. Stage & Mandap Floral Decor Tier:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'basic', label: 'Standard Arch', price: '+ ₹15,000' },
                  { id: 'premium', label: 'Floral Mandap', price: '+ ₹35,000' },
                  { id: 'royal', label: 'Grand Royal Gold', price: '+ ₹65,000' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcDecorTier(item.id)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      calcDecorTier === item.id
                        ? 'bg-amber-50 border-[#B8860B] text-[#8B6508] font-bold shadow-2xs'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block text-[11px] font-semibold">{item.label}</span>
                    <span className="block text-[10px] font-mono opacity-80">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Moving Head Lights */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
              <div>
                <span className="font-semibold text-stone-900 block text-xs">Stage Moving Head Lights & Sound PA (+₹18,000)</span>
                <span className="text-[10px] text-stone-500">Intelligent beam lighting, trussing, cordless microphones</span>
              </div>
              <input
                type="checkbox"
                checked={calcSoundLights}
                onChange={(e) => setCalcSoundLights(e.target.checked)}
                className="w-4 h-4 accent-[#B8860B] cursor-pointer"
              />
            </div>
          </div>

          {/* Estimate Display Box (Col 5) */}
          <div className="lg:col-span-5 rounded-lg p-5 border border-stone-200 bg-[#F8F9FA] shadow-xs space-y-3 text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B6508]">
              Estimated Venue Rental
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#8B6508]">
              ₹{totalCalculatedEstimate.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-stone-600">
              Includes 1,200 AC hall, 600 dining, 250 KVA DG backup & valet parking.
            </p>

            <div className="p-3 rounded-md bg-white border border-stone-200 text-left space-y-1 text-[11px] text-stone-700 shadow-2xs">
              <div className="flex justify-between">
                <span>Base Package:</span>
                <span className="font-mono font-semibold text-stone-900">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {extraRoomsCost > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Extra Suites ({calcRooms - 4} rms):</span>
                  <span className="font-mono">+ ₹{extraRoomsCost.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Floral Decor:</span>
                <span className="font-mono">+ ₹{decorCost.toLocaleString('en-IN')}</span>
              </div>
              {soundCost > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Lighting & Audio:</span>
                  <span className="font-mono">+ ₹{soundCost.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              onClick={() => onOpenEnquiry(`Custom Estimate: ₹${totalCalculatedEstimate.toLocaleString('en-IN')} (${calcDuration})`)}
              icon={FaCalendarCheck}
              className="w-full justify-center py-2.5 text-xs font-semibold shadow-xs"
            >
              Lock Estimated Package
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-stone-200">
        <SectionTitle
          subtitle="Frequently Asked Questions"
          title="Everything You Need To Know"
          description="Clear answers regarding venue booking, power backup, catering kitchen rules, and guest rooms."
        />

        <div className="space-y-2.5 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-lg border border-stone-200 overflow-hidden bg-white shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left font-serif font-bold text-stone-900 hover:text-[#B8860B] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 text-sm">
                    <FaQuestionCircle className="text-[#B8860B] text-xs flex-shrink-0" />
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-stone-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B8860B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricePage;
