import { useState, useEffect } from 'react';
import { 
  Save, AlertCircle, Bell, BookOpen, Calendar, DollarSign, 
  Users, Lock, Mail, Shield, Clock, RefreshCw, X 
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
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900">{title}</h3>
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
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const renderCheckbox = (label: string, checked: boolean, onChange: (checked: boolean) => void) => (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6 p-6">
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
          <div className="border-t pt-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </button>
      </div>

      {/* Save Settings Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg p-6 w-full max-w-md pointer-events-auto border border-gray-200 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Save Settings</h2>
              <button onClick={() => setIsSaveModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="mb-4 text-gray-600">Are you sure you want to save these settings?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 