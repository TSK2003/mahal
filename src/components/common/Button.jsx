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
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6508] text-white shadow-[0_4px_15px_rgba(184,134,11,0.35)] hover:shadow-[0_6px_25px_rgba(184,134,11,0.5)] hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white border-2 border-[#B8860B] text-[#8B6508] hover:bg-[#B8860B] hover:text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-stone-300 text-stone-700 hover:border-[#B8860B] hover:text-[#B8860B] bg-white hover:bg-amber-50/50 shadow-xs',
    gold: 'bg-[#B8860B] text-white hover:bg-[#8B6508] shadow-md hover:shadow-lg',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md'
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
      {Icon && <Icon className="text-base flex-shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
