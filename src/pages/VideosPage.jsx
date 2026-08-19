import React, { useState } from 'react';
import { FaPlay, FaVideo } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import VideoModal from '../components/common/VideoModal';
import useMahalData from '../hooks/useMahalData';

const VideosPage = () => {
  const { videos } = useMahalData();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <SectionTitle
        subtitle="Cinematic Cinema"
        title="Event Video Highlights"
        description="Watch real wedding processions, stage lighting setups, and grand reception walkthroughs filmed inside Grand Mahal."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
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

              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                {video.duration}
              </span>
            </div>

            {/* Video Info */}
            <div className="p-4 text-left space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1">
                <FaVideo className="text-[9px]" /> {video.eventType}
              </span>
              <h3 className="text-sm font-serif font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
                {video.title}
              </h3>
            </div>
          </div>
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
