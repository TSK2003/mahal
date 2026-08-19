import React from 'react';
import { FaCrown, FaHeart, FaUtensils, FaUserTie } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';

const MahalDescription = () => {
  const { info } = useMahalData();

  const pillars = [
    { icon: FaCrown, title: "14+ Years Legacy", desc: "Trusted by thousands of families across South India for unforgettable grand celebrations." },
    { icon: FaHeart, title: "Royal Architecture", desc: "Opulent gold carved pillars, high ceiling crystal chandeliers, and grand stage acoustic baffles." },
    { icon: FaUtensils, title: "Spacious Dining Hall", desc: "600-seater dining hall with modern stainless steel tables and heavy-duty steam kitchen." },
    { icon: FaUserTie, title: "Hospitality Management", desc: "Dedicated floor supervisors, 24/7 security guards, and valet parking team." }
  ];

  return (
    <section className="py-16 bg-white border-y border-stone-200 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[11px] uppercase tracking-wider text-[#8B6508] font-bold px-3 py-1 rounded-md bg-amber-50 border border-amber-200">
            Heritage & Standards
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-2 mb-3 leading-tight">
            Where Every Ritual Holds Royal Dignity
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            At {info?.name || 'Grand Mahal'}, we understand that a marriage ceremony is a sacred union of two families. Our architecture is meticulously planned so that elders, couple, and thousands of guests enjoy effortless comfort throughout the auspicious occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-lg p-5 border border-stone-200 hover:border-stone-300 transition-all shadow-2xs bg-[#F8F9FA]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B8860B] text-white flex items-center justify-center text-lg font-bold mb-3 shadow-2xs">
                  <Icon />
                </div>
                <h3 className="text-sm font-serif font-bold text-stone-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MahalDescription;
