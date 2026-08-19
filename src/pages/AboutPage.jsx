import React from 'react';
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
    <div className="pb-16 font-sans">
      {/* About Hero Banner */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block text-[11px] uppercase tracking-wider text-[#8B6508] font-bold px-3 py-1 rounded-md bg-amber-50 border border-amber-200">
            Our Legacy & Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-stone-900">
            About {info?.name || 'Grand Mahal'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Founded with a vision to redefine traditional wedding hospitality, combining majestic South Indian architecture with five-star modern convenience.
          </p>
        </div>
      </section>

      {/* Owner Message & History */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Owner Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-md">
              <img
                src={OWNER_MESSAGE.image}
                alt={OWNER_MESSAGE.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 text-left">
                <h3 className="text-xl font-serif font-bold text-white">{OWNER_MESSAGE.name}</h3>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">{OWNER_MESSAGE.title}</p>
              </div>
            </div>
          </div>

          {/* Founder Quote */}
          <div className="lg:col-span-7 text-left space-y-4">
            <div className="text-3xl text-[#B8860B]">
              <FaQuoteLeft />
            </div>
            <p className="text-sm sm:text-base font-serif italic text-stone-800 leading-relaxed">
              "{OWNER_MESSAGE.quote}"
            </p>
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <h4 className="text-lg font-serif font-bold text-stone-900">Our Heritage & Integrity</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Since opening our doors in {info?.establishedYear || 2012}, {info?.name || 'Grand Mahal'} has hosted over 3,500 weddings, receptions, and corporate galas. Built over 22,000 square feet, our venue features high ceilings, acoustic isolation panels, dedicated bride & groom suites, and a 600-seater dining hall with modern steam kitchens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="glass-card rounded-lg p-6 border border-stone-200 space-y-2 shadow-xs bg-[#F8F9FA]">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-lg shadow-2xs">
              <FaEye />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">Our Vision</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              To remain South India's benchmark wedding venue by seamlessly blending ancient royal grandeur with cutting-edge environmental sustainability, crystal-clear acoustics, and zero-compromise safety standards.
            </p>
          </div>

          <div className="glass-card rounded-lg p-6 border border-stone-200 space-y-2 shadow-xs bg-[#F8F9FA]">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-[#8B6508] flex items-center justify-center text-lg shadow-2xs">
              <FaBullseye />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">Our Mission</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              To treat every client's family like royalty, offering immaculate venue hygiene, uninterrupted generator power backup, wide parking accessibility, and attentive floor supervision for every event.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionTitle
          subtitle="Journey"
          title="Historic Timeline"
        />

        <div className="space-y-4 text-left relative before:absolute before:left-4 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-stone-200">
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              } gap-4 pl-8 sm:pl-0`}
            >
              <div className="sm:w-1/2 flex justify-start sm:justify-end">
                <div className={`glass-card p-5 rounded-lg border border-stone-200 max-w-md shadow-xs bg-white ${idx % 2 === 0 ? 'sm:text-left' : 'sm:text-right'}`}>
                  <span className="text-[10px] font-mono font-bold text-[#8B6508] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-stone-900 mt-1.5 mb-0.5">{item.title}</h4>
                  <p className="text-xs text-stone-600 leading-normal">{item.desc}</p>
                </div>
              </div>

              {/* Timeline Center Dot */}
              <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 top-3 w-7 h-7 rounded-full bg-white border-2 border-[#B8860B] text-[#8B6508] flex items-center justify-center text-[10px] shadow-xs">
                <FaCrown />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Showcase Grid */}
      <section className="py-12 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Recognition"
            title="Industry Awards"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {AWARDS.map((award, idx) => (
              <div key={idx} className="glass-card p-4 rounded-lg border border-stone-200 flex items-start gap-3 shadow-2xs bg-[#F8F9FA]">
                <div className="w-9 h-9 rounded-lg bg-[#B8860B] text-white flex items-center justify-center text-base flex-shrink-0 shadow-2xs">
                  <FaTrophy />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#8B6508] uppercase tracking-wider">{award.year}</span>
                  <h4 className="text-xs font-serif font-bold text-stone-900">{award.title}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{award.issuer}</p>
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
