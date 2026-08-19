import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaHeart } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import useMahalData from '../../hooks/useMahalData';

const TestimonialsSection = () => {
  const { testimonials } = useMahalData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Cherished Memories"
        title="What Happy Families Say"
        description="Real reviews and blessings from families who celebrated their milestone life moments at Grand Mahal."
      />

      <div className="mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass-card rounded-3xl p-8 flex flex-col justify-between h-full border border-stone-200 hover:border-[#B8860B] transition-all text-left shadow-md hover:shadow-xl relative bg-white">
                <div className="absolute top-6 right-6 text-3xl text-amber-200/80">
                  <FaQuoteLeft />
                </div>

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#B8860B]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-[#8B6508] font-semibold flex items-center gap-1">
                      <FaHeart className="text-[9px]" /> {t.event} • {t.date}
                    </span>
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
