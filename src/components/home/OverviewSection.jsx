import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaAward } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const OverviewSection = () => {
  const highlights = [
    { title: "Opulent Architecture", desc: "Gold chandeliers, acoustic ceiling panels, and grand stage lighting." },
    { title: "Expansive Parking", desc: "Over 250 paved car parking spaces with valet and 24/7 security personnel." },
    { title: "Modern Steam Kitchen", desc: "Industrial steam cooking boilers and stainless steel vessel infrastructure." },
    { title: "Royal Ivory & Gold Decor", desc: "Rich temple architecture designed for timeless wedding photography." }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Royal Experience"
        title="Why Choose Grand Mahal"
        description="Crafted with architectural opulence and designed specifically for grand South Indian wedding rituals and luxury conventions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Large Image with Badge Overlays */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm group">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Mahal Interior Overview"
              className="w-full h-[380px] sm:h-[420px] object-cover"
            />
          </div>

          {/* Experience Badge */}
          <div className="absolute -bottom-4 -right-2 sm:right-4 bg-white border border-stone-200 p-4 rounded-lg shadow-md flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-[#B8860B] text-white flex items-center justify-center text-xl font-bold shadow-2xs">
              <FaAward />
            </div>
            <div>
              <span className="text-xl font-bold text-stone-900 block font-serif">
                14+ Years
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Hospitality Excellence
              </span>
            </div>
          </div>
        </div>

        {/* Right: Info & Bullet Points */}
        <div className="lg:col-span-6 text-left space-y-5">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              A sacred palace built for your most precious lifelong celebrations.
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Located on the prestigious Royal Palace Avenue, Grand Mahal combines ancient architectural majesty with contemporary modern amenities. Our venue offers seamlessly integrated hall and dining spaces designed to ensure comfort for thousands of guests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card rounded-lg p-3.5 border border-stone-200 bg-white">
                <div className="flex items-center gap-2 mb-1 text-[#8B6508]">
                  <FaCheckCircle className="text-xs flex-shrink-0 text-[#B8860B]" />
                  <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal pl-5">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <NavLink to="/about">
              <Button variant="primary" icon={FaArrowRight}>
                Know More About Us
              </Button>
            </NavLink>

            <NavLink to="/gallery">
              <Button variant="secondary">
                View Photos
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
