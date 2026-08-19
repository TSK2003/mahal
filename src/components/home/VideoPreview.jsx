import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight, FaVideo } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import VideoModal from '../common/VideoModal';
import useMahalData from '../../hooks/useMahalData';

const VideoPreview = () => {
  const { videos } = useMahalData();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const previewVideos = videos.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        subtitle="Cinematic Showcase"
        title="Event Video Highlights"
        description="Experience the atmosphere, sound, and lighting of real weddings and events filmed live inside Murugu Mahal."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previewVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedVideo(video)}
            className="glass-card rounded-2xl overflow-hidden group border border-stone-800 hover:border-[#C9A227] cursor-pointer shadow-lg flex flex-col justify-between"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-stone-950">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#C9A227] text-stone-950 flex items-center justify-center text-xl shadow-[0_0_20px_#C9A227] group-hover:scale-110 transition-transform pl-1">
                  <FaPlay />
                </div>
              </div>

              <span className="absolute bottom-3 right-3 bg-stone-950/90 text-stone-200 text-[10px] font-mono font-semibold px-2.5 py-1 rounded">
                {video.duration}
              </span>
            </div>

            {/* Title & Info */}
            <div className="p-5 text-left">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A227] flex items-center gap-1.5 mb-1">
                <FaVideo /> {video.eventType}
              </span>
              <h4 className="text-stone-100 font-serif font-bold text-base group-hover:text-[#C9A227] transition-colors">
                {video.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <NavLink to="/videos">
          <Button variant="secondary" icon={FaArrowRight}>
            View All Video Highlights
          </Button>
        </NavLink>
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default VideoPreview;
