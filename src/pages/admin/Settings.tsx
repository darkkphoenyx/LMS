import { useState, useEffect } from 'react';
import { 
  Save, Bell, BookOpen, DollarSign, 
  Shield, RefreshCw, X 
} from 'lucide-react';
import { db } from '../../lib/db';

interface Settings {
  borrowingRules: {
    maxBooksPerUser: number;
    loanPeriod: number;
    renewalLimit: number;
    renewalPeriod: number;
  };
  fineSettings: {
    dailyFine: number;
    gracePeriod: number;
    maxFine: number;
  };
  notifications: {
    dueDateReminder: boolean;
    overdueAlert: boolean;
    fineNotification: boolean;
    newBookNotification: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  security: {
    sessionTimeout: number;
    passwordExpiry: number;
    failedLoginAttempts: number;
    twoFactorAuth: boolean;
  };
  system: {
    maintenanceMode: boolean;
    autoBackup: boolean;
    backupFrequency: string;
    dataRetention: number;
  };
}

export function Settings() {
  const [settings, setSettings] = useState<Settings>({
    borrowingRules: {
      maxBooksPerUser: 5,
      loanPeriod: 14,
      renewalLimit: 2,
      renewalPeriod: 7,
    },
    fineSettings: {
      dailyFine: 1.00,
      gracePeriod: 3,
      maxFine: 20.00,
    },
    notifications: {
      dueDateReminder: true,
      overdueAlert: true,
      fineNotification: true,
      newBookNotification: true,
      emailNotifications: true,
      smsNotifications: false,
    },
    security: {
      sessionTimeout: 30,
      passwordExpiry: 90,
      failedLoginAttempts: 5,
      twoFactorAuth: true,
    },
    system: {
      maintenanceMode: false,
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: 365,
    },
  });

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Load settings from Dexie when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await db.settings.get('settings');
        if (savedSettings) {
          // Remove the id field as it's not part of our state structure
          const { id, ...settingsData } = savedSettings;
          setSettings(settingsData);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await db.settings.put({
        id: 'settings',
        ...settings
      });
      console.log('Settings saved successfully');
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const renderSection = (title: string, Icon: any, children: React.ReactNode) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center mb-6">
        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Configure your {title.toLowerCase()} preferences</p>
        </div>
      </div>
      {children}
    </div>
  );

  const renderInput = (
    label: string,
    value: number | string,
    onChange: (value: any) => void,
    type: 'number' | 'text' = 'number',
    step?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
      />
    </div>
  );

  const renderCheckbox = (label: string, checked: boolean, onChange: (checked: boolean) => void) => (
    <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your library system preferences and configurations</p>
        </div>
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Borrowing Rules */}
      {renderSection('Borrowing Rules', BookOpen, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput(
            'Max Books Per User',
            settings.borrowingRules.maxBooksPerUser,
            (value) => setSettings({
              ...settings,
              borrowingRules: { ...settings.borrowingRules, maxBooksPerUser: parseInt(value) }
            })
          )}
          {renderInput(
            'Loan Period (days)',
            settings.borrowingRules.loanPeriod,
            (value) => setSettings({
              ...settings,
              borrowingRules: { ...settings.borrowingRules, loanPeriod: parseInt(value) }
            })
          )}
          {renderInput(
            'Renewal Limit',
            settings.borrowingRules.renewalLimit,
            (value) => setSettings({
              ...settings,
              borrowingRules: { ...settings.borrowingRules, renewalLimit: parseInt(value) }
            })
          )}
          {renderInput(
            'Renewal Period (days)',
            settings.borrowingRules.renewalPeriod,
            (value) => setSettings({
              ...settings,
              borrowingRules: { ...settings.borrowingRules, renewalPeriod: parseInt(value) }
            })
          )}
        </div>
      ))}

      {/* Fine Settings */}
      {renderSection('Fine Settings', DollarSign, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput(
            'Daily Fine ($)',
            settings.fineSettings.dailyFine,
            (value) => setSettings({
              ...settings,
              fineSettings: { ...settings.fineSettings, dailyFine: parseFloat(value) }
            }),
            'number',
            '0.01'
          )}
          {renderInput(
            'Grace Period (days)',
            settings.fineSettings.gracePeriod,
            (value) => setSettings({
              ...settings,
              fineSettings: { ...settings.fineSettings, gracePeriod: parseInt(value) }
            })
          )}
          {renderInput(
            'Maximum Fine ($)',
            settings.fineSettings.maxFine,
            (value) => setSettings({
              ...settings,
              fineSettings: { ...settings.fineSettings, maxFine: parseFloat(value) }
            }),
            'number',
            '0.01'
          )}
        </div>
      ))}

      {/* Notifications */}
      {renderSection('Notifications', Bell, (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderCheckbox(
              'Due Date Reminder',
              settings.notifications.dueDateReminder,
              (checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, dueDateReminder: checked }
              })
            )}
            {renderCheckbox(
              'Overdue Alert',
              settings.notifications.overdueAlert,
              (checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, overdueAlert: checked }
              })
            )}
            {renderCheckbox(
              'Fine Notification',
              settings.notifications.fineNotification,
              (checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, fineNotification: checked }
              })
            )}
            {renderCheckbox(
              'New Book Notification',
              settings.notifications.newBookNotification,
              (checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, newBookNotification: checked }
              })
            )}
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Notification Channels</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderCheckbox(
                'Email Notifications',
                settings.notifications.emailNotifications,
                (checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailNotifications: checked }
                })
              )}
              {renderCheckbox(
                'SMS Notifications',
                settings.notifications.smsNotifications,
                (checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsNotifications: checked }
                })
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Security Settings */}
      {renderSection('Security Settings', Shield, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput(
            'Session Timeout (minutes)',
            settings.security.sessionTimeout,
            (value) => setSettings({
              ...settings,
              security: { ...settings.security, sessionTimeout: parseInt(value) }
            })
          )}
          {renderInput(
            'Password Expiry (days)',
            settings.security.passwordExpiry,
            (value) => setSettings({
              ...settings,
              security: { ...settings.security, passwordExpiry: parseInt(value) }
            })
          )}
          {renderInput(
            'Failed Login Attempts',
            settings.security.failedLoginAttempts,
            (value) => setSettings({
              ...settings,
              security: { ...settings.security, failedLoginAttempts: parseInt(value) }
            })
          )}
          <div className="flex items-center">
            {renderCheckbox(
              'Enable Two-Factor Authentication',
              settings.security.twoFactorAuth,
              (checked) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: checked }
              })
            )}
          </div>
        </div>
      ))}

      {/* System Settings */}
      {renderSection('System Settings', RefreshCw, (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderCheckbox(
            'Maintenance Mode',
            settings.system.maintenanceMode,
            (checked) => setSettings({
              ...settings,
              system: { ...settings.system, maintenanceMode: checked }
            })
          )}
          {renderCheckbox(
            'Automatic Backup',
            settings.system.autoBackup,
            (checked) => setSettings({
              ...settings,
              system: { ...settings.system, autoBackup: checked }
            })
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={settings.system.backupFrequency}
              onChange={(e) => setSettings({
                ...settings,
                system: { ...settings.system, backupFrequency: e.target.value }
              })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          {renderInput(
            'Data Retention (days)',
            settings.system.dataRetention,
            (value) => setSettings({
              ...settings,
              system: { ...settings.system, dataRetention: parseInt(value) }
            })
          )}
        </div>
      ))}

      {/* Save Settings Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Save className="w-5 h-5" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-gray-900">Save Settings</h2>
              </div>
              <button 
                onClick={() => setIsSaveModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="mb-6 text-gray-600">Are you sure you want to save these settings? This will update your system configuration.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 