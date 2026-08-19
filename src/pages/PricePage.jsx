import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown, FaQuestionCircle, FaCalculator, 
  FaCalendarCheck, FaRupeeSign, FaCrown, FaCheck 
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
  const [calcDuration, setCalcDuration] = useState('24hr'); // '6hr', '12hr', '24hr'
  const [calcRooms, setCalcRooms] = useState(6); // 0 to 14
  const [calcDecorTier, setCalcDecorTier] = useState('premium'); // 'basic', 'premium', 'royal'
  const [calcSoundLights, setCalcSoundLights] = useState(true);

  // Compute calculated estimate
  const basePrice = calcDuration === '24hr' ? 185000 : calcDuration === '12hr' ? 125000 : 65000;
  const extraRoomsCost = calcRooms > 4 ? (calcRooms - 4) * 2500 : 0;
  const decorCost = calcDecorTier === 'royal' ? 65000 : calcDecorTier === 'premium' ? 35000 : 15000;
  const soundCost = calcSoundLights ? 18000 : 0;
  const totalCalculatedEstimate = basePrice + extraRoomsCost + decorCost + soundCost;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Transparent Pricing"
        title="Royal Rental Packages"
        description="Choose the ideal venue package tailored to your celebration duration, guest capacity, and facility requirements."
      />

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-20">
        {packages.map((pkg) => (
          <PricingCard
            key={pkg.id}
            pkg={pkg}
            onEnquire={(pkgName) => onOpenEnquiry(pkgName)}
          />
        ))}
      </div>

      {/* Interactive Custom Event Cost Estimator */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-[#C9A227]/40 shadow-2xl mb-20 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-2">
            <FaCalculator /> Instant Tariff Estimator
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Customize Your Wedding Package Cost
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Adjust your venue rental duration, extra deluxe suites, and stage decoration tier to receive an instant transparent cost estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Options (Col 7) */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            {/* 1. Duration */}
            <div>
              <label className="block text-stone-300 font-semibold mb-2">1. Select Venue Duration:</label>
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
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      calcDuration === item.id
                        ? 'bg-[#C9A227] text-stone-950 border-[#C9A227] font-bold shadow-lg'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-[11px] leading-tight">{item.label}</span>
                    <span className="block text-[10px] opacity-80 font-mono mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Extra Deluxe Rooms */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-stone-300 font-semibold">2. Air-Conditioned Deluxe Guest Suites:</label>
                <span className="text-[#C9A227] font-mono font-bold">{calcRooms} Rooms</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                value={calcRooms}
                onChange={(e) => setCalcRooms(Number(e.target.value))}
                className="w-full accent-[#C9A227] bg-stone-950 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>0 Suites</span>
                <span>4 Included in Package</span>
                <span>14 Total Max</span>
              </div>
            </div>

            {/* 3. Stage & Floral Decor Tier */}
            <div>
              <label className="block text-stone-300 font-semibold mb-2">3. Stage & Mandap Floral Decor Tier:</label>
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
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      calcDecorTier === item.id
                        ? 'bg-[#C9A227]/20 border-[#C9A227] text-[#C9A227] font-bold shadow-md'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-[11px] font-bold">{item.label}</span>
                    <span className="block text-[10px] font-mono opacity-80">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Moving Head Lights */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
              <div>
                <span className="font-bold text-stone-200 block text-xs">Stage Moving Head Lights & Sound PA (+₹18,000)</span>
                <span className="text-[10px] text-stone-400">Intelligent beam lighting, trussing, cordless microphones</span>
              </div>
              <input
                type="checkbox"
                checked={calcSoundLights}
                onChange={(e) => setCalcSoundLights(e.target.checked)}
                className="w-5 h-5 accent-[#C9A227] cursor-pointer"
              />
            </div>
          </div>

          {/* Estimate Display Box (Col 5) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 border-2 border-[#C9A227] bg-stone-950/90 shadow-2xl space-y-4 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227]">
              Estimated Venue Rental
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-gold-gradient">
              ₹{totalCalculatedEstimate.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-stone-400">
              Includes 1,200 AC hall, 600 dining, 250 KVA generator backup & valet parking.
            </p>

            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-left space-y-1.5 text-[11px] text-stone-300">
              <div className="flex justify-between">
                <span>Base Package:</span>
                <span className="font-mono font-bold">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {extraRoomsCost > 0 && (
                <div className="flex justify-between text-stone-400">
                  <span>Extra Suites ({calcRooms - 4} rms):</span>
                  <span className="font-mono">+ ₹{extraRoomsCost.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-400">
                <span>Floral Decor:</span>
                <span className="font-mono">+ ₹{decorCost.toLocaleString('en-IN')}</span>
              </div>
              {soundCost > 0 && (
                <div className="flex justify-between text-stone-400">
                  <span>Lighting & Audio:</span>
                  <span className="font-mono">+ ₹{soundCost.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              onClick={() => onOpenEnquiry(`Custom Estimate: ₹${totalCalculatedEstimate.toLocaleString('en-IN')} (${calcDuration})`)}
              icon={FaCalendarCheck}
              className="w-full justify-center py-3.5 text-xs font-bold shadow-xl"
            >
              Lock This Estimated Package
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto pt-10 border-t border-stone-800">
        <SectionTitle
          subtitle="Frequently Asked Questions"
          title="Everything You Need To Know"
          description="Clear answers regarding venue booking, power backup, catering kitchen rules, and guest rooms."
        />

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-stone-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-serif font-bold text-stone-100 hover:text-[#C9A227] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3 text-base">
                    <FaQuestionCircle className="text-[#C9A227] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`text-sm text-[#C9A227] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricePage;
