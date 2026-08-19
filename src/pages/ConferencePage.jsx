import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTv, FaVolumeUp, FaWifi, FaSnowflake, FaUtensils, 
  FaCalendarCheck, FaUsers 
} from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import LightboxModal from '../components/common/LightboxModal';
import useMahalData from '../hooks/useMahalData';

const CONFERENCE_SPECS = [
  { icon: FaUsers, title: "1,200 Seating Capacity", desc: "Adaptable layout for large summits, AGMs, or intimate board conventions." },
  { icon: FaTv, title: "Dual 4K Laser Projection", desc: "Motorized 16:9 projection screens visible from all seating rows." },
  { icon: FaVolumeUp, title: "Pioneer Acoustic Surround", desc: "Goose-neck podium mics, lapels, wireless mics, and digital sound mixer." },
  { icon: FaWifi, title: "High-Speed Fiber Wi-Fi", desc: "Dedicated high-bandwidth network for live streaming and delegate connectivity." },
  { icon: FaSnowflake, title: "100% Centralized AC", desc: "Silent industrial climate control maintaining optimum presentation temperature." },
  { icon: FaUtensils, title: "Executive Dining Hall", desc: "Separate 600-seater dining and high-tea buffet lounge zone." }
];

const LAYOUT_STYLES = [
  { id: 'theater', name: 'Theater Setup', capacity: '1,200 Delegates', desc: 'Maximum seating density with central aisle for keynote presentations.', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { id: 'classroom', name: 'Classroom Setup', capacity: '600 Delegates', desc: 'Long writing tables with power outlets for training seminars.', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80' },
  { id: 'banquet', name: 'Corporate Gala Banquet', capacity: '800 Guests', desc: 'Round dining tables with central stage for award ceremonies.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' }
];

const CONFERENCE_GALLERY = [
  { id: 1, title: "Auditorium Style Summit Setup", category: "Conference", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "Podium & Stage AV Trussing", category: "Conference", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Executive High-Tea Buffet Zone", category: "Dining", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "VIP Delegate Lounge", category: "Conference", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80" }
];

const ConferencePage = () => {
  const { onOpenEnquiry } = useOutletContext();
  const { info } = useMahalData();
  const [activeLayout, setActiveLayout] = useState('theater');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const selectedLayoutObj = LAYOUT_STYLES.find(l => l.id === activeLayout) || LAYOUT_STYLES[0];

  return (
    <div className="pb-20">
      {/* Conference Hero Banner */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-stone-200">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#8B6508] font-bold px-4 py-1.5 rounded-full bg-amber-50 border border-[#B8860B]/30">
            World-Class Executive Convention Center
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-stone-900">
            Corporate Conferences & Conventions
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Host impactful annual shareholder meetings, product launches, leadership summits, and industry expos with high-definition audio-visual infrastructure and royal hospitality at {info?.name || 'Grand Mahal'}.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => onOpenEnquiry('Executive Corporate Package')}
              icon={FaCalendarCheck}
              className="px-8 py-3.5 font-bold text-sm shadow-md"
            >
              Book Conference Hall
            </Button>
          </div>
        </div>
      </section>

      {/* Conference Specs Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          subtitle="Corporate Infrastructure"
          title="Designed For Seamless Business Events"
          description="From high-speed fiber internet to crystal-clear Pioneer ceiling acoustic panels."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFERENCE_SPECS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-6 border border-stone-200 hover:border-[#B8860B] transition-all text-left flex items-start gap-4 shadow-md bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Seating Layouts Interactive Selector */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Customizable Floor Plan"
            title="Flexible Seating Layouts"
            description="Choose the ideal seating geometry for your event delegates."
          />

          {/* Layout Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {LAYOUT_STYLES.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeLayout === layout.id
                    ? 'bg-[#B8860B] text-white font-bold shadow-md'
                    : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-[#B8860B]'
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>

          {/* Active Layout Card */}
          <div className="glass-card rounded-3xl overflow-hidden border border-[#B8860B]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left shadow-xl bg-white">
            <div className="lg:col-span-6 p-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8B6508]">
                Seating Configuration
              </span>
              <h3 className="text-3xl font-serif font-bold text-stone-900">
                {selectedLayoutObj.name}
              </h3>
              <div className="inline-block px-3 py-1 bg-amber-50 border border-[#B8860B]/40 text-[#8B6508] text-xs font-mono font-bold rounded-lg">
                Capacity: {selectedLayoutObj.capacity}
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedLayoutObj.desc}
              </p>
              <Button
                variant="primary"
                onClick={() => onOpenEnquiry(`Conference - ${selectedLayoutObj.name}`)}
                className="mt-4"
              >
                Request Custom Layout Setup
              </Button>
            </div>

            <div className="lg:col-span-6 h-full min-h-[300px] overflow-hidden">
              <img
                src={selectedLayoutObj.img}
                alt={selectedLayoutObj.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conference Photo Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          subtitle="Corporate Atmosphere"
          title="Conference Hall Gallery"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONFERENCE_GALLERY.map((img, idx) => (
            <motion.div
              key={img.id}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-stone-200 hover:border-[#B8860B] cursor-pointer shadow-md bg-white"
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                <span className="text-[10px] uppercase font-bold text-amber-300">{img.category}</span>
                <h4 className="text-white font-serif font-bold text-sm">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <LightboxModal
        images={CONFERENCE_GALLERY}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : CONFERENCE_GALLERY.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < CONFERENCE_GALLERY.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};

export default ConferencePage;
