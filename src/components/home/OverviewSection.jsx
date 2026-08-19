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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Royal Experience"
        title="Why Choose Grand Mahal"
        description="Crafted with architectural opulence and designed specifically for grand South Indian wedding rituals and luxury conventions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Large Image with Badge Overlays */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#B8860B]/40 shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Mahal Interior Overview"
              className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
          </div>

          {/* Floating Experience Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute -bottom-6 -right-4 sm:right-6 bg-white border-2 border-[#B8860B] p-5 rounded-2xl shadow-[0_10px_30px_rgba(184,134,11,0.2)] flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8B6508] text-white flex items-center justify-center text-2xl font-bold shadow-md">
              <FaAward />
            </div>
            <div>
              <span className="text-2xl font-serif font-extrabold text-[#8B6508] block">
                14+ Years
              </span>
              <span className="text-xs text-stone-600 font-semibold">
                Of Hospitality Excellence
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Info & Bullet Points */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 text-left space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
              A sacred palace built for your most precious lifelong celebrations.
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Located on the prestigious Royal Palace Avenue, Grand Mahal combines ancient architectural majesty with contemporary modern amenities. Our venue offers seamlessly integrated hall and dining spaces designed to ensure comfort for thousands of guests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card rounded-xl p-4 border border-stone-200 hover:border-[#B8860B] transition-colors bg-white">
                <div className="flex items-center gap-2 mb-1 text-[#8B6508]">
                  <FaCheckCircle className="text-sm flex-shrink-0 text-[#B8860B]" />
                  <h4 className="text-sm font-serif font-bold text-stone-900">{item.title}</h4>
                </div>
                <p className="text-xs text-stone-600 leading-normal pl-6">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
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
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
