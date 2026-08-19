import React from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import Button from './Button';

const EventCard = ({ event, onEnquire }) => {
  return (
    <div className="glass-card rounded-lg overflow-hidden group border border-stone-200 hover:border-stone-300 transition-all flex flex-col h-full shadow-xs bg-white text-left font-sans">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        <span className="absolute top-3 left-3 bg-white/95 text-[#8B6508] text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-stone-200 uppercase tracking-wider shadow-2xs">
          {event.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors mb-1.5">
            {event.title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-3">
            {event.desc}
          </p>

          {/* Highlights List */}
          {event.highlights && (
            <ul className="space-y-1 mb-4">
              {event.highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                  <FaCheck className="text-[#B8860B] text-[10px] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          variant="secondary"
          onClick={() => onEnquire && onEnquire(event.title)}
          className="w-full justify-between mt-2 text-xs py-2"
        >
          <span>Enquire Venue</span>
          <FaArrowRight className="text-[10px]" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
