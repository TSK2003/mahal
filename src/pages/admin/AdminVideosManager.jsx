import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaPlus, FaTrash, FaPlay, FaTimes, FaCheckCircle } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';
import VideoModal from '../../components/common/VideoModal';

const AdminVideosManager = () => {
  const { videos } = useMahalData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [newVideo, setNewVideo] = useState({
    title: '',
    eventType: 'Traditional Wedding',
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  });

  const handleAddVideo = (e) => {
    e.preventDefault();
    dataService.addVideo(newVideo);
    setIsAddModalOpen(false);
    setNewVideo({
      title: '',
      eventType: 'Traditional Wedding',
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm("Delete this video highlight?")) {
      dataService.deleteVideo(id);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Event Video Highlights Manager
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Showcase cinematic wedding walkthroughs, stage lighting demonstrations, and corporate event videos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <FaCheckCircle /> Video Added Live!
            </span>
          )}

          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={FaPlus}
            className="text-xs px-5 py-2.5 font-bold shadow-lg"
          >
            Add New Video
          </Button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <motion.div
            key={vid.id}
            layout
            className="glass-card rounded-2xl overflow-hidden border border-stone-800 hover:border-[#C9A227] flex flex-col justify-between group shadow-lg"
          >
            <div className="relative aspect-video bg-stone-950 overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setSelectedVideo(vid)}
                  className="w-12 h-12 rounded-full bg-[#C9A227] text-stone-950 flex items-center justify-center text-lg pl-0.5 shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <FaPlay />
                </button>
              </div>

              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/90 text-[10px] font-mono text-stone-200">
                {vid.duration}
              </span>

              <button
                onClick={() => handleDeleteVideo(vid.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 hover:bg-red-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Delete Video"
              >
                <FaTrash />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-[10px] font-semibold uppercase text-[#C9A227] flex items-center gap-1">
                <FaVideo /> {vid.eventType}
              </span>
              <h4 className="text-sm font-serif font-bold text-stone-100 line-clamp-1">
                {vid.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- ADD VIDEO MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-stone-900 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white bg-stone-800 p-2 rounded-full cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="mb-5">
                <span className="text-xs uppercase tracking-widest text-[#C9A227] font-semibold">
                  Video Library
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100 mt-0.5">
                  Add Event Video Highlight
                </h3>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="E.g., Grand Sangeet Dance Highlights 2026"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Event Type *</label>
                    <select
                      value={newVideo.eventType}
                      onChange={(e) => setNewVideo({ ...newVideo, eventType: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Traditional Wedding">Traditional Wedding</option>
                      <option value="Grand Reception">Grand Reception</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Corporate Conference">Corporate Conference</option>
                      <option value="Anniversary Gala">Anniversary Gala</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Duration (MM:SS) *</label>
                    <input
                      type="text"
                      required
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      placeholder="4:15"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Thumbnail Cover Image URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.thumbnail}
                    onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono text-[11px] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Video Stream MP4 URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.videoUrl}
                    onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono text-[11px] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" className="px-6 py-2.5 font-bold">
                    Add Video
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default AdminVideosManager;
