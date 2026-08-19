import React from 'react';
import SectionTitle from '../common/SectionTitle';
import EventCard from '../common/EventCard';
import useMahalData from '../../hooks/useMahalData';

const FeaturedEvents = ({ onOpenEnquiry }) => {
  const { events } = useMahalData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Memorable Occasions"
        title="Featured Celebrations & Events"
        description="Whether it is an auspicious traditional wedding or a high-profile corporate convention, our venue transforms every event into a majestic spectacle."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEnquire={(title) => onOpenEnquiry(title)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
