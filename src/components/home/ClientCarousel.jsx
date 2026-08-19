import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SectionTitle from '../common/SectionTitle';
import { ESTEEMED_CLIENTS } from '../../data/mahalData';

const ClientCarousel = () => {
  return (
    <section className="py-14 bg-white border-y border-stone-200 relative overflow-hidden shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle="Corporate Partners"
          title="Trusted By Esteemed Organizations"
          description="We are honored to host grand annual corporate summits, award galas, and wedding receptions for India's leading institutions."
        />

        <div className="mt-6">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={16}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
            }}
            className="w-full py-2"
          >
            {ESTEEMED_CLIENTS.map((client, idx) => (
              <SwiperSlide key={idx}>
                <div className="glass-card rounded-lg p-3 flex items-center justify-center gap-2.5 border border-stone-200 hover:border-stone-300 transition-all bg-[#F8F9FA]">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-6 h-6 object-contain rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    {client.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ClientCarousel;
