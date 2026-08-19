import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ subtitle, title, description, align = 'center', className = '' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${alignmentClass} ${className}`}
    >
      {subtitle && (
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#8B6508] font-bold mb-2 px-3.5 py-1 rounded-full bg-amber-100/70 border border-[#B8860B]/30 shadow-xs">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-2 mb-4 leading-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
          {description}
        </p>
      )}
      <div className={`mt-4 flex items-center justify-${align === 'left' ? 'start' : align === 'right' ? 'end' : 'center'} gap-2`}>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#B8860B]" />
        <div className="w-2.5 h-2.5 rotate-45 bg-[#B8860B]" />
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#B8860B]" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
