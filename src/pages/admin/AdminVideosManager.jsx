import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaPlay, FaTimes, FaCheckCircle } from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const AdminVideosManager = () => {
  const { videos } = useMahalData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [newVideo, setNewVideo] = useState({
    title: '',
    duration: '4:00',
    eventType: 'Traditional Wedding',
    thumbnail: '',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  });

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.thumbnail) return;

    dataService.addVideo(newVideo);
    setNewVideo({
      title: '',
      duration: '4:00',
      eventType: 'Traditional Wedding',
      thumbnail: '',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    });
    setIsAddModalOpen(false);
    setSaveMessage('Video added successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Delete this video showcase?')) {
      dataService.deleteVideo(id);
      setSaveMessage('Video removed.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#8B6508]">
            Video Production
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            Video Showcase Manager ({videos.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <FaCheckCircle /> {saveMessage}
            </span>
          )}

          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={FaPlus}
            className="text-xs py-2 font-semibold shadow-xs"
          >
            Add Video
          </Button>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="glass-card rounded-lg overflow-hidden border border-stone-200 hover:border-stone-300 transition-all shadow-xs group flex flex-col justify-between bg-white"
          >
            <div className="relative aspect-video bg-stone-900 overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#B8860B] text-white flex items-center justify-center text-sm pl-0.5 shadow-xs">
                  <FaPlay />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                {vid.duration}
              </span>

              <button
                onClick={() => handleDeleteVideo(vid.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center text-[10px] shadow-xs transition-colors cursor-pointer"
                title="Delete Video"
              >
                <FaTrash />
              </button>
            </div>

            <div className="p-3 text-left space-y-0.5">
              <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider block">
                {vid.eventType}
              </span>
              <h4 className="font-semibold text-stone-900 text-xs line-clamp-1">
                {vid.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md bg-white border border-stone-200 rounded-lg p-6 shadow-xl text-left text-xs"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="border-b border-stone-200 pb-3 mb-4">
                <span className="text-[10px] uppercase font-bold text-[#8B6508]">Video CMS</span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">Add Video Highlight</h3>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-3.5">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="e.g. Royal Wedding Highlights"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Event Type</label>
                    <input
                      type="text"
                      value={newVideo.eventType}
                      onChange={(e) => setNewVideo({ ...newVideo, eventType: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Duration</label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      placeholder="e.g. 4:15"
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Thumbnail URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.thumbnail}
                    onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Embed URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.embedUrl}
                    onChange={(e) => setNewVideo({ ...newVideo, embedUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="pt-2 flex gap-2.5">
                  <Button type="submit" variant="primary" className="flex-1 py-2 font-semibold">
                    Publish Video
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="py-2">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVideosManager;
