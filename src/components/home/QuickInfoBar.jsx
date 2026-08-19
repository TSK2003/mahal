import React from 'react';
import { motion } from 'framer-motion';
import useMahalData from '../../hooks/useMahalData';

const QuickInfoBar = () => {
  const { info } = useMahalData();

  return (
    <section className="relative z-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {(info.stats || []).map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -5, scale: 1.03 }}
            className="glass-card rounded-2xl p-4 text-center border border-[#C9A227]/25 hover:border-[#C9A227] transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)] group"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-900 border border-[#C9A227]/30 text-[#C9A227] text-2xl flex items-center justify-center mx-auto mb-2.5 group-hover:bg-[#C9A227] group-hover:text-stone-950 transition-all duration-300 shadow-md">
              {stat.icon}
            </div>

            <h4 className="text-sm font-bold text-stone-100 font-serif group-hover:text-[#C9A227] transition-colors">
              {stat.value}
            </h4>
            <span className="text-[11px] font-semibold text-[#C9A227] block mt-0.5">
              {stat.label}
            </span>
            <span className="text-[10px] text-stone-400 block mt-1 line-clamp-1">
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickInfoBar;
