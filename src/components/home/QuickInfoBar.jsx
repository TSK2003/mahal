import React from 'react';
import { motion } from 'framer-motion';
import useMahalData from '../../hooks/useMahalData';
import { DEFAULT_MAHAL_INFO } from '../../data/mahalData';

const QuickInfoBar = () => {
  const { info } = useMahalData();
  const statsList = Array.isArray(info?.stats) && info.stats.length > 0 ? info.stats : DEFAULT_MAHAL_INFO.stats;

  return (
    <section className="relative z-20 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statsList.map((stat, idx) => (
          <div
            key={idx}
            className="glass-card rounded-lg p-4 text-center flex flex-col justify-center border border-stone-200 hover:border-stone-300 transition-all bg-white shadow-xs"
          >
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#8B6508] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-stone-800 mt-0.5">
              {stat.label}
            </div>
            {stat.sub && (
              <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickInfoBar;
