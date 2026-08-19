import React from 'react';
import { FaTimes } from 'react-icons/fa';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-lg overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider block">
              {video.eventType}
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {video.embedUrl ? (
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-stone-400 text-xs">
              Video stream currently unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
