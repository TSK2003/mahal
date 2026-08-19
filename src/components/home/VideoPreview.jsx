import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaVideo } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import VideoModal from '../common/VideoModal';
import useMahalData from '../../hooks/useMahalData';
import Button from '../common/Button';

const VideoPreview = () => {
  const { videos } = useMahalData();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionTitle
          subtitle="Event Cinema"
          title="Cinematic Video Highlights"
          description="Watch real wedding celebrations, stage lighting sequences, and dining arrangements inside Grand Mahal."
          align="left"
          className="mb-0"
        />

        <NavLink to="/videos" className="hidden sm:block">
          <Button variant="secondary" icon={FaArrowRight}>
            View All Videos
          </Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.slice(0, 3).map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="glass-card rounded-lg overflow-hidden group border border-stone-200 hover:border-stone-300 cursor-pointer shadow-xs flex flex-col justify-between bg-white"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-stone-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B] text-white flex items-center justify-center text-lg shadow-md pl-0.5">
                  <FaPlay />
                </div>
              </div>

              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {video.duration}
              </span>
            </div>

            {/* Video Details */}
            <div className="p-4 text-left space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1">
                <FaVideo className="text-[9px]" /> {video.eventType}
              </span>
              <h3 className="text-sm font-serif font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <NavLink to="/videos">
          <Button variant="secondary" icon={FaArrowRight} className="w-full justify-center">
            View All Videos
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
