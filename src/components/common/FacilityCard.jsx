import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaSnowflake, FaUtensils, FaCar, FaBolt, 
  FaShieldAlt, FaWater, FaBed, FaRestroom, FaVolumeUp, FaTheaterMasks 
} from 'react-icons/fa';
import { FaElevator } from 'react-icons/fa6';
import { GiQueenCrown, GiCrown, GiCookingPot } from 'react-icons/gi';

const iconMap = {
  FaSnowflake,
  FaUtensils,
  FaCar,
  GiQueenCrown,
  GiCrown,
  FaBolt,
  FaShieldAlt,
  FaWater,
  FaElevator,
  FaTheaterMasks,
  FaBed,
  FaRestroom,
  GiCookingPot,
  FaVolumeUp
};

const FacilityCard = ({ facility, index = 0 }) => {
  const IconComponent = iconMap[facility.icon] || FaSnowflake;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 border border-[#C9A227]/20 hover:border-[#C9A227] hover:shadow-[0_8px_30px_rgba(201,162,39,0.25)]"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A227]/5 rounded-full blur-2xl group-hover:bg-[#C9A227]/15 transition-all" />

      <div className="flex items-start gap-4">
        <div className="w-13 h-13 rounded-xl bg-stone-900 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#C9A227] group-hover:text-stone-950 transition-all duration-300 shadow-md">
          <IconComponent />
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A227]">
            {facility.category}
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-[#C9A227] transition-colors mt-0.5 mb-1.5">
            {facility.name}
          </h3>
          <p className="text-xs leading-relaxed text-stone-400">
            {facility.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityCard;
