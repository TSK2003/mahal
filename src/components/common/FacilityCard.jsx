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
  const IconComponent = (facility?.icon && iconMap[facility.icon]) || FaSnowflake;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-stone-200 hover:border-[#B8860B] transition-all duration-300 shadow-md hover:shadow-xl bg-white"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-2xl mb-4 shadow-sm">
          <IconComponent />
        </div>
        <span className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider block mb-1">
          {facility.category}
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
          {facility.title}
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          {facility.desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#B8860B] font-semibold">
        <span>Included in Package</span>
        <span>✓ 5-Star Grade</span>
      </div>
    </motion.div>
  );
};

export default FacilityCard;
