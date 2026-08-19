import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ subtitle, title, description, center = true, light = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A227] mb-2 px-3 py-1 bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-full">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className={`text-3xl md:text-5xl font-bold font-serif ${light ? 'text-stone-900' : 'text-stone-100'} mt-1 mb-4 leading-tight`}>
          {title}
        </h2>
      )}
      {/* Decorative Gold Flourish Line */}
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : 'justify-start'} my-3`}>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C9A227]" />
        <div className="w-2 h-2 rotate-45 bg-[#C9A227] shadow-[0_0_8px_#C9A227]" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C9A227]" />
      </div>
      {description && (
        <p className={`max-w-2xl text-sm md:text-base ${light ? 'text-stone-600' : 'text-stone-400'} mt-3 ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
