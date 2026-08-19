import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaHeart, FaUtensils, FaSmileBeam } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';

const MahalDescription = () => {
  const { info } = useMahalData();

  const pillars = [
    { icon: FaCrown, title: "14+ Years Legacy", desc: "Trusted by thousands of families across South India for unforgettable grand celebrations." },
    { icon: FaHeart, title: "Royal Architecture", desc: "Opulent gold carved pillars, high ceiling crystal chandeliers, and grand stage acoustic baffles." },
    { icon: FaUtensils, title: "Spacious Dining Hall", desc: "600-seater dining hall with modern stainless steel tables and heavy-duty steam kitchen." },
    { icon: FaSmileBeam, title: "5-Star Hospitality", desc: "Dedicated floor supervisors, 24/7 security guards, and valet parking team." }
  ];

  return (
    <section className="py-20 bg-stone-950/60 border-y border-stone-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold">
            Sacred Heritage & Hospitality
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-stone-100 mt-2 mb-4 leading-tight">
            Where Every Ritual Holds Royal Dignity
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed">
            At {info.name}, we understand that a marriage ceremony is a sacred union of two families. Our architecture is meticulously planned so that elders, couple, and thousands of guests enjoy effortless comfort throughout the auspicious occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-stone-800 hover:border-[#C9A227]/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFBA51] to-[#997A15] text-stone-950 flex items-center justify-center text-xl font-bold mb-4 shadow-md">
                  <Icon />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MahalDescription;
