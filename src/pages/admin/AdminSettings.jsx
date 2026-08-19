import React, { useState } from 'react';
import { 
  FaDownload, FaRedo, 
  FaShieldAlt, FaDatabase, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import { dataService } from '../../services/dataService';
import Button from '../../components/common/Button';

const AdminSettings = () => {
  const [notification, setNotification] = useState('');
  const [importJsonText, setImportJsonText] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleExportBackup = () => {
    const jsonStr = dataService.exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grand_mahal_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Database backup JSON downloaded.');
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) return;
    const result = dataService.importBackupJson(importJsonText);
    if (result.success) {
      showNotification('Database restored from JSON backup.');
      setImportJsonText('');
    } else {
      alert(`Import error: ${result.error}`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('WARNING: Reset all bookings, profile, facilities, packages, and gallery to Grand Mahal defaults?')) {
      dataService.resetToDefaults();
      showNotification('System reset to original Grand Mahal default data.');
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#8B6508]">
            Database Operations
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            System Settings & Data Backup
          </h1>
        </div>

        {notification && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
            <FaCheckCircle className="text-emerald-600" /> {notification}
          </div>
        )}
      </div>

      {/* 1. Export Data Backup Card */}
      <div className="glass-card rounded-lg p-6 border border-stone-200 shadow-xs space-y-3 bg-white text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
            <FaDatabase />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm">Export Full Database Backup</h3>
            <p className="text-stone-500">Download a complete JSON snapshot of all bookings, facilities, and pricing.</p>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" onClick={handleExportBackup} icon={FaDownload} className="text-xs py-2 font-semibold shadow-xs">
            Download JSON Backup
          </Button>
        </div>
      </div>

      {/* 2. Import Data Restore Card */}
      <div className="glass-card rounded-lg p-6 border border-stone-200 shadow-xs space-y-3 bg-white text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
            <FaShieldAlt />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm">Restore Database from JSON</h3>
            <p className="text-stone-500">Paste a JSON backup payload to restore your database state.</p>
          </div>
        </div>

        <div>
          <textarea
            rows={3}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='Paste JSON backup contents here...'
            className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 font-mono text-[11px] focus:outline-none focus:border-[#B8860B]"
          />
        </div>

        <div className="pt-1">
          <Button
            variant="secondary"
            onClick={handleImportBackup}
            disabled={!importJsonText.trim()}
            className="text-xs py-2 font-semibold"
          >
            Execute Restore
          </Button>
        </div>
      </div>

      {/* 3. Factory Reset Zone */}
      <div className="glass-card rounded-lg p-6 border border-rose-200 bg-rose-50/50 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-sm">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="font-bold text-rose-900 text-sm">Factory Reset Data</h3>
            <p className="text-rose-700">Restore all website content, seed bookings, and default facilities to Grand Mahal pristine initial state.</p>
          </div>
        </div>

        <div className="pt-1">
          <Button variant="danger" onClick={handleResetDefaults} icon={FaRedo} className="text-xs py-2 font-semibold shadow-xs">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
