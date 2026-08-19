import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import useMahalData from '../../hooks/useMahalData';

const TestimonialsSection = () => {
  const { testimonials } = useMahalData();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Customer Experiences"
        title="Client Reviews & Testimonials"
        description="Verified reviews from families and corporate patrons who hosted their celebrations at Grand Mahal."
      />

      <div className="mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass-card rounded-lg p-6 flex flex-col justify-between h-full border border-stone-200 hover:border-stone-300 transition-all text-left shadow-xs bg-white">
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-md object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {t.event} • {t.date}
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
