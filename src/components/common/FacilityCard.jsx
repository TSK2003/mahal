import React from 'react';
import { 
  FaSnowflake, FaUtensils, FaCar, FaBolt, 
  FaShieldAlt, FaWater, FaBed, FaRestroom, FaVolumeUp, FaTheaterMasks, FaCheck 
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
    <div className="glass-card rounded-lg p-5 flex flex-col justify-between border border-stone-200 hover:border-stone-300 transition-all shadow-xs bg-white text-left font-sans">
      <div>
        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-xl mb-3 shadow-2xs">
          <IconComponent />
        </div>
        <span className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider block mb-1">
          {facility.category}
        </span>
        <h3 className="text-base font-serif font-bold text-stone-900 mb-1.5">
          {facility.title}
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          {facility.desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#8B6508] font-semibold">
        <span>Included in Package</span>
        <span className="flex items-center gap-1"><FaCheck className="text-[9px]" /> Verified</span>
      </div>
    </div>
  );
};

export default FacilityCard;
