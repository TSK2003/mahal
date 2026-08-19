import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaVideo } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import VideoModal from '../components/common/VideoModal';
import useMahalData from '../hooks/useMahalData';

const VideosPage = () => {
  const { videos } = useMahalData();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Cinematic Cinema"
        title="Event Video Highlights"
        description="Watch real wedding processions, stage lighting setups, and grand reception walkthroughs filmed inside Grand Mahal."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedVideo(video)}
            className="glass-card rounded-2xl overflow-hidden group border border-stone-200 hover:border-[#B8860B] cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between bg-white"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-stone-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6508] text-white flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(184,134,11,0.6)] group-hover:scale-110 transition-transform pl-1">
                  <FaPlay />
                </div>
              </div>

              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
                {video.duration}
              </span>
            </div>

            {/* Video Info */}
            <div className="p-6 text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
                <FaVideo /> {video.eventType}
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default VideosPage;
