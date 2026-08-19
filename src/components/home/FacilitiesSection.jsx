import React from 'react';
import SectionTitle from '../common/SectionTitle';
import FacilityCard from '../common/FacilityCard';
import useMahalData from '../../hooks/useMahalData';

const FacilitiesSection = () => {
  const { facilities } = useMahalData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionTitle
        subtitle="World-Class Infrastructure"
        title="Unmatched Premium Facilities"
        description="Every facility at Murugu Mahal is engineered to deliver zero-stress, flawless traditional and modern event execution."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {facilities.map((facility, idx) => (
          <FacilityCard key={facility.id} facility={facility} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default FacilitiesSection;
