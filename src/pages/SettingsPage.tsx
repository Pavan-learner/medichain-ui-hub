
import React, { useState } from 'react';
import { Cloud, Check, AlertCircle, Bell, X } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    enableAlerts: true,
    showExpiredMeds: false,
    autoBackup: true,
    darkMode: false,
    soundNotifications: true
  });
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('2 hours ago');
  
  // Handle toggle change
  const handleToggleChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
    
    toast.success(`${setting} setting updated`);
  };
  
  // Handle sync to cloud
  const handleSyncToCloud = () => {
    setIsSyncing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced('Just now');
      toast.success('Successfully synced to cloud!');
    }, 2000);
  };
  
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-bold mb-6">System Settings</h2>
        
        <div className="grid gap-6">
          {/* Cloud Sync Section */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">Cloud Synchronization</h3>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary flex-shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="mb-2">Sync your data to cloud for backup and access across multiple devices.</p>
                  <p className="text-sm text-gray-500 mb-4">Last synced: {lastSynced}</p>
                  <button
                    className="btn-primary flex items-center"
                    onClick={handleSyncToCloud}
                    disabled={isSyncing}
                  >
                    {isSyncing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Syncing...
                      </>
                    ) : (
                      <>
                        <Cloud className="h-4 w-4 mr-2" />
                        Sync to Cloud
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* App Preferences Section */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">App Preferences</h3>
            </div>
            <div className="p-6">
              <ul className="divide-y">
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Enable Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.enableAlerts}
                      onChange={() => handleToggleChange('enableAlerts')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </li>
                
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Show Expired Medicines</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.showExpiredMeds}
                      onChange={() => handleToggleChange('showExpiredMeds')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </li>
                
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Cloud className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Auto Backup (Daily)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.autoBackup}
                      onChange={() => handleToggleChange('autoBackup')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </li>
                
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-5 h-5 text-gray-500 mr-3 flex items-center justify-center">🔊</span>
                    <span>Sound Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.soundNotifications}
                      onChange={() => handleToggleChange('soundNotifications')}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          
          {/* System Status Section */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">System Status</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Database Connection</span>
                  </div>
                  <span className="text-green-500 flex items-center text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    Active
                  </span>
                </div>
                
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Cloud Services</span>
                  </div>
                  <span className="text-green-500 flex items-center text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    Connected
                  </span>
                </div>
                
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span>Local Storage</span>
                  </div>
                  <span className="text-amber-500 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    78% Full
                  </span>
                </div>
                
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>System Version</span>
                  </div>
                  <span className="text-gray-500 text-sm">v2.1.3</span>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
                <div className="text-blue-500 mr-3 flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-blue-800 text-sm font-medium mb-1">System Update Available</p>
                  <p className="text-blue-600 text-xs mb-2">Version 2.2.0 is now available with new features and improvements.</p>
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600">
                    Update Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
