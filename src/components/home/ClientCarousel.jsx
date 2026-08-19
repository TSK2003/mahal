import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SectionTitle from '../common/SectionTitle';
import { ESTEEMED_CLIENTS } from '../../data/mahalData';

const ClientCarousel = () => {
  return (
    <section className="py-16 bg-stone-950/80 border-y border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle="Corporate Partners & Patrons"
          title="Trusted By Esteemed Organizations"
          description="We are honored to host grand annual corporate summits, award galas, and wedding receptions for India's leading institutions."
        />

        <div className="mt-8">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 30 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
            className="w-full py-4"
          >
            {ESTEEMED_CLIENTS.map((client, idx) => (
              <SwiperSlide key={idx}>
                <div className="glass-card rounded-xl p-4 flex items-center justify-center gap-3 border border-stone-800 hover:border-[#C9A227]/40 grayscale hover:grayscale-0 transition-all duration-300">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xs font-semibold text-stone-300 font-serif">
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
