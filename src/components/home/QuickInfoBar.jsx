import React from 'react';
import { motion } from 'framer-motion';
import useMahalData from '../../hooks/useMahalData';
import { DEFAULT_MAHAL_INFO } from '../../data/mahalData';

const QuickInfoBar = () => {
  const { info } = useMahalData();
  const statsList = Array.isArray(info?.stats) && info.stats.length > 0 ? info.stats : DEFAULT_MAHAL_INFO.stats;

  return (
    <section className="relative z-20 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statsList.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-4 sm:p-5 text-center flex flex-col justify-center border border-[#B8860B]/30 hover:border-[#B8860B] transition-all duration-300 shadow-md bg-white/95"
          >
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#8B6508] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-stone-800 mt-1">
              {stat.label}
            </div>
            {stat.sub && (
              <div className="text-[10px] text-[#B8860B] font-medium mt-0.5">
                {stat.sub}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickInfoBar;
