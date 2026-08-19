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
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            Cinematic Highlights & 360 Walkthroughs
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            Video Showcase Manager ({videos.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <FaCheckCircle /> {saveMessage}
            </span>
          )}

          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={FaPlus}
            className="text-xs py-2.5 font-bold shadow-md"
          >
            Add New Video
          </Button>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="glass-card rounded-2xl overflow-hidden border border-stone-200 hover:border-[#B8860B] transition-all shadow-md group flex flex-col justify-between bg-white"
          >
            <div className="relative aspect-video bg-stone-900 overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B] text-white flex items-center justify-center text-lg pl-0.5 shadow-md">
                  <FaPlay />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {vid.duration}
              </span>

              <button
                onClick={() => handleDeleteVideo(vid.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center text-xs shadow-md transition-colors cursor-pointer"
                title="Delete Video"
              >
                <FaTrash />
              </button>
            </div>

            <div className="p-4 text-left space-y-1">
              <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider block">
                {vid.eventType}
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                {vid.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border-2 border-[#B8860B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-xs"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="border-b border-stone-200 pb-3 mb-5">
                <span className="text-xs uppercase font-bold text-[#8B6508]">Video CMS</span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Add Video Highlight</h3>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="e.g. Royal Wedding Highlights - Priya & Rahul"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Event Type</label>
                    <input
                      type="text"
                      value={newVideo.eventType}
                      onChange={(e) => setNewVideo({ ...newVideo, eventType: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Duration</label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      placeholder="e.g. 4:15"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Thumbnail Image URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.thumbnail}
                    onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">YouTube Embed / Video URL *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.embedUrl}
                    onChange={(e) => setNewVideo({ ...newVideo, embedUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button type="submit" variant="primary" className="flex-1 py-3 font-bold">
                    Publish Video
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="py-3">
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
