import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import Button from './Button';

const EventCard = ({ event, onEnquire }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl overflow-hidden group border border-stone-200 hover:border-[#B8860B] transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl bg-white"
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <span className="absolute top-4 left-4 bg-white/95 text-[#8B6508] text-xs font-bold px-3 py-1 rounded-full border border-[#B8860B]/40 uppercase tracking-wider shadow-sm">
          {event.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between text-left">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors mb-2">
            {event.title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            {event.desc}
          </p>

          {/* Highlights List */}
          {event.highlights && (
            <ul className="space-y-1.5 mb-6">
              {event.highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                  <FaCheck className="text-[#B8860B] text-xs flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          variant="secondary"
          onClick={() => onEnquire && onEnquire(event.title)}
          className="w-full justify-between mt-2 hover:bg-[#B8860B] hover:text-white transition-all text-xs"
        >
          <span>Enquire Venue</span>
          <FaArrowRight className="text-xs" />
        </Button>
      </div>
    </motion.div>
  );
};

export default EventCard;
