import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-sans font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs';

  const variants = {
    primary: 'bg-[#B8860B] hover:bg-[#9A7009] text-white border border-[#B8860B] hover:shadow-sm active:translate-y-px',
    secondary: 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 hover:border-stone-400 active:translate-y-px',
    outline: 'bg-transparent border border-stone-300 text-stone-700 hover:bg-stone-50 hover:text-stone-900',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white hover:brightness-105 border border-[#B8860B]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 shadow-xs'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-sm flex-shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
