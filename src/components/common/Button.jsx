import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  icon: Icon
}) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50";

  const variants = {
    primary: "bg-gradient-to-r from-[#DFBA51] via-[#C9A227] to-[#997A15] text-stone-950 font-semibold shadow-[0_4px_20px_rgba(201,162,39,0.35)] hover:shadow-[0_6px_25px_rgba(201,162,39,0.5)] hover:brightness-110 border border-[#FFF5C3]/40",
    secondary: "bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-[#C9A227]/40 hover:border-[#C9A227] hover:text-[#C9A227] backdrop-blur-md",
    outline: "bg-transparent text-[#C9A227] border border-[#C9A227] hover:bg-[#C9A227] hover:text-stone-950",
    dark: "bg-stone-950 text-stone-200 border border-stone-800 hover:border-stone-700 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
      {Icon && <Icon className="text-base" />}
    </motion.button>
  );
};

export default Button;
