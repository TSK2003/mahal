import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaQuoteLeft, FaTrophy, FaEye, FaBullseye } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import useMahalData from '../hooks/useMahalData';
import { OWNER_MESSAGE, TIMELINE } from '../data/mahalData';

const AWARDS = [
  { year: "2024", title: "Best Luxury Wedding Venue", issuer: "Hospitality & Tourism Guild" },
  { year: "2023", title: "Excellence in Heritage Architecture", issuer: "South India Convention Forum" },
  { year: "2022", title: "Cleanest & Hygienic Kitchen Award", issuer: "Food Safety & Catering Board" },
  { year: "2020", title: "Eco-Green Convention Mahal", issuer: "Clean Energy Leadership Council" }
];

const AboutPage = () => {
  const { info } = useMahalData();

  return (
    <div className="pb-20">
      {/* About Hero Banner */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#8B6508] font-bold px-4 py-1.5 rounded-full bg-amber-50 border border-[#B8860B]/30">
            Our Legacy & Story
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-stone-900">
            About {info?.name || 'Grand Mahal'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Founded with a vision to redefine traditional wedding hospitality, combining majestic South Indian architecture with five-star modern convenience.
          </p>
        </div>
      </section>

      {/* Owner Message & History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Owner Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#B8860B] shadow-2xl">
              <img
                src={OWNER_MESSAGE.image}
                alt={OWNER_MESSAGE.name}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-2xl font-serif font-bold text-white">{OWNER_MESSAGE.name}</h3>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">{OWNER_MESSAGE.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Founder Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="text-4xl text-[#B8860B]">
              <FaQuoteLeft />
            </div>
            <p className="text-base sm:text-lg font-serif italic text-stone-800 leading-relaxed">
              "{OWNER_MESSAGE.quote}"
            </p>
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <h4 className="text-xl font-serif font-bold text-stone-900">Our Heritage & Integrity</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Since opening our doors in {info?.establishedYear || 2012}, {info?.name || 'Grand Mahal'} has hosted over 3,500 weddings, receptions, and corporate galas. Built over 22,000 square feet, our venue features high ceilings, acoustic isolation panels, dedicated bride & groom suites, and a 600-seater dining hall with modern steam kitchens.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="glass-card rounded-3xl p-8 border border-stone-200 space-y-3 shadow-md bg-[#FAF8F5]">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-2xl shadow-xs">
              <FaEye />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To remain South India's benchmark wedding venue by seamlessly blending ancient royal grandeur with cutting-edge environmental sustainability, crystal-clear acoustics, and zero-compromise safety standards.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-stone-200 space-y-3 shadow-md bg-[#FAF8F5]">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-2xl shadow-xs">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To treat every client's family like royalty, offering immaculate venue hygiene, uninterrupted generator power backup, wide parking accessibility, and attentive floor supervision for every event.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle
          subtitle="Milestones & Journey"
          title="Our Historic Timeline"
        />

        <div className="space-y-6 text-left relative before:absolute before:left-4 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-stone-200">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              } gap-6 pl-10 sm:pl-0`}
            >
              <div className="sm:w-1/2 flex justify-start sm:justify-end">
                <div className={`glass-card p-6 rounded-2xl border border-stone-200 max-w-md shadow-md bg-white ${idx % 2 === 0 ? 'sm:text-left' : 'sm:text-right'}`}>
                  <span className="text-xs font-mono font-bold text-[#8B6508] bg-amber-50 px-3 py-1 rounded-full border border-[#B8860B]/30">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-stone-900 mt-2 mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              {/* Timeline Center Dot */}
              <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 top-4 w-8 h-8 rounded-full bg-white border-2 border-[#B8860B] text-[#8B6508] flex items-center justify-center text-xs shadow-md">
                <FaCrown />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards Showcase Grid */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Accolades & Recognition"
            title="Industry Awards"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {AWARDS.map((award, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-stone-200 flex items-start gap-4 shadow-sm bg-[#FAF8F5]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8B6508] text-white flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                  <FaTrophy />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider">{award.year}</span>
                  <h4 className="text-sm font-serif font-bold text-stone-900 mt-0.5">{award.title}</h4>
                  <p className="text-xs text-stone-500 mt-1">{award.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
