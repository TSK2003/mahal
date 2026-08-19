import React, { useState } from 'react';
import { 
  FaCog, FaDownload, FaUpload, FaRedo, 
  FaShieldAlt, FaDatabase, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const AdminSettings = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleExport = () => {
    const jsonString = dataService.exportBackupJson();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `murugu_mahal_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatusMessage({ type: 'success', text: 'Backup JSON downloaded successfully!' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleImport = (e) => {
    e.preventDefault();
    if (!jsonInput.trim()) return;

    const res = dataService.importBackupJson(jsonInput);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'Database restored successfully!' });
      setJsonInput('');
    } else {
      setStatusMessage({ type: 'error', text: `Import failed: ${res.error}` });
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content and bookings to factory defaults?")) {
      dataService.resetToDefaults();
      setStatusMessage({ type: 'success', text: 'All data reset to defaults!' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-stone-100">
          Admin Settings & System Backups
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Export data snapshots, manage demo admin security, and sync with Firebase.
        </p>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
          statusMessage.type === 'success'
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
            : 'bg-red-500/20 border-red-500 text-red-300'
        }`}>
          {statusMessage.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Cloud & Firebase Status */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center text-lg">
            <FaDatabase />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-100">Firebase & Storage Sync Engine</h3>
            <p className="text-xs text-stone-400">Integrated with Project: <span className="font-mono text-[#C9A227]">mahal-a8800</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Storage Mode</span>
            <span className="font-bold text-emerald-400 mt-0.5 block">Dual-Layer Local + Cloud</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Client App ID</span>
            <span className="font-mono text-stone-300 mt-0.5 block truncate">b606f69341b6a0f14ab328</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Measurement ID</span>
            <span className="font-mono text-[#C9A227] mt-0.5 block">G-55GZNZ812H</span>
          </div>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
        <h3 className="text-base font-serif font-bold text-stone-100 border-b border-stone-800 pb-3">
          Data Snapshot & Backup Engine
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-stone-200 text-sm flex items-center gap-2">
                <FaDownload className="text-[#C9A227]" /> Export Database Backup
              </h4>
              <p className="text-stone-400 mt-1">
                Downloads a clean JSON file with all current bookings, pricing packages, website texts, facilities, and photo galleries.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={handleExport}
              className="w-full justify-center text-xs py-2.5 font-bold"
            >
              Download Backup JSON
            </Button>
          </div>

          {/* Reset */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-stone-200 text-sm flex items-center gap-2 text-red-400">
                <FaRedo /> Factory Reset
              </h4>
              <p className="text-stone-400 mt-1">
                Restores all website content and bookings to initial demonstration seed data.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900 hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Reset Data to Defaults
            </button>
          </div>
        </div>

        {/* Import JSON Box */}
        <form onSubmit={handleImport} className="space-y-3 pt-2 text-xs">
          <label className="block font-medium text-stone-300">
            Import / Restore JSON Data Backup:
          </label>
          <textarea
            rows={4}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste exported backup JSON text here..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-100 font-mono text-[11px] focus:outline-none focus:border-[#C9A227]"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!jsonInput.trim()}
              className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 font-semibold cursor-pointer"
            >
              Restore from JSON
            </button>
          </div>
        </form>
      </div>

      {/* Demo Credentials Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4 text-xs">
        <div className="flex items-center gap-2 text-[#C9A227] font-serif font-bold text-sm">
          <FaShieldAlt /> Demo Admin Access Credentials
        </div>
        <p className="text-stone-400">
          The public Navbar and Footer have a 1-Click Login button. You can also sign in manually with:
        </p>

        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5 font-mono text-[11px]">
          <div><span className="text-stone-500">Email:</span> <span className="text-[#C9A227]">admin@murugumahal.com</span></div>
          <div><span className="text-stone-500">Password:</span> <span className="text-[#C9A227]">admin123</span></div>
          <div><span className="text-stone-500">Quick PIN:</span> <span className="text-[#C9A227]">1234</span></div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
