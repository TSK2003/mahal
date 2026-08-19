import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import useMahalData from '../../hooks/useMahalData';

const TestimonialsSection = () => {
  const { testimonials } = useMahalData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <SectionTitle
        subtitle="Cherished Memories"
        title="What Happy Families Say"
        description="Over 3,500 grand wedding muhurthams and luxury celebrations hosted with royal perfection."
      />

      <div className="mt-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
          }}
          className="pb-12"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="glass-card rounded-3xl p-7 border border-stone-800 hover:border-[#C9A227]/50 transition-all flex flex-col justify-between h-full text-left space-y-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1 text-xs">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-[#C9A227]/40 text-xl" />
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-3 border-t border-stone-800/80">
                  <img
                    src={item.avatar}
                    alt={item.clientName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#C9A227]"
                  />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-stone-100">{item.clientName}</h4>
                    <span className="text-[10px] text-[#C9A227] font-semibold block">{item.eventType} • {item.date}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
