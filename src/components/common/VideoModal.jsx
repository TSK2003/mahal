import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl bg-stone-950 border border-[#C9A227]/30 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-stone-900 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C9A227] font-semibold">
                {video.eventType} Video Tour
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-100">
                {video.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={video.thumbnail}
            >
              Your browser does not support HTML5 video player.
            </video>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
