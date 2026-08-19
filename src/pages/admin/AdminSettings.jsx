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
    showNotification('System backup JSON downloaded successfully!');
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) return;
    const result = dataService.importBackupJson(importJsonText);
    if (result.success) {
      showNotification('Database successfully restored from JSON backup!');
      setImportJsonText('');
    } else {
      alert(`Import error: ${result.error}`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('WARNING: This will reset all bookings, profile, facilities, packages, and gallery to Grand Mahal default seed data. Proceed?')) {
      dataService.resetToDefaults();
      showNotification('System reset to original Grand Mahal default data!');
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            Database Operations & Disaster Recovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            System Settings & Data Backup
          </h1>
        </div>

        {notification && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
            <FaCheckCircle className="text-emerald-600" /> {notification}
          </div>
        )}
      </div>

      {/* 1. Export Data Backup Card */}
      <div className="glass-card rounded-3xl p-8 border border-stone-200 shadow-md space-y-4 bg-white text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">
            <FaDatabase />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Export Full Database Backup</h3>
            <p className="text-stone-600">Download a complete JSON snapshot of all bookings, specs, facilities, and pricing.</p>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" onClick={handleExportBackup} icon={FaDownload} className="text-xs py-3 font-bold shadow-md">
            Download Database Backup (.JSON)
          </Button>
        </div>
      </div>

      {/* 2. Import Data Restore Card */}
      <div className="glass-card rounded-3xl p-8 border border-stone-200 shadow-md space-y-4 bg-white text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-lg">
            <FaShieldAlt />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Restore Database from JSON</h3>
            <p className="text-stone-600">Paste a previously exported JSON backup payload to restore your database state.</p>
          </div>
        </div>

        <div>
          <textarea
            rows={4}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='Paste JSON backup contents here (e.g. { "version": "2.0", "info": ... })'
            className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 font-mono text-[11px] focus:outline-none focus:border-[#B8860B]"
          />
        </div>

        <div className="pt-2">
          <Button
            variant="secondary"
            onClick={handleImportBackup}
            disabled={!importJsonText.trim()}
            className="text-xs py-3 font-bold"
          >
            Execute JSON Restore
          </Button>
        </div>
      </div>

      {/* 3. Factory Reset Zone */}
      <div className="glass-card rounded-3xl p-8 border border-rose-200 bg-rose-50/50 shadow-md space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-lg">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="font-serif font-bold text-rose-900 text-base">Factory Reset Data</h3>
            <p className="text-rose-700">Restore all website content, seed bookings, and default facilities to Grand Mahal pristine initial state.</p>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="danger" onClick={handleResetDefaults} icon={FaRedo} className="text-xs py-3 font-bold shadow-md">
            Reset to Grand Mahal Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
