import { useState, useEffect } from 'react';
import { 
  Save, Bell, BookOpen, DollarSign, 
  Shield, RefreshCw, X 
} from 'lucide-react';
import { db } from '../../lib/db';

// Types
type IconType = React.ComponentType<{ className?: string }>;

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

// Default settings
const DEFAULT_SETTINGS: Settings = {
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
};

// Reusable Components
const Section: React.FC<{
  title: string;
  icon: IconType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => (
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

const Input: React.FC<{
  label: string;
  value: number | string;
  onChange: (value: any) => void;
  type?: 'number' | 'text';
  step?: string;
}> = ({ label, value, onChange, type = 'number', step }) => (
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

const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
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

const SaveModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Save className="w-5 h-5" />
            </div>
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Save Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-6 text-gray-600">Are you sure you want to save these settings? This will update your system configuration.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export function Settings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await db.settings.get('settings');
        if (savedSettings) {
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

  const updateSettings = <K extends keyof Settings, S extends keyof Settings[K]>(
    section: K,
    key: S,
    value: Settings[K][S]
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

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

      <Section title="Borrowing Rules" icon={BookOpen}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Max Books Per User"
            value={settings.borrowingRules.maxBooksPerUser}
            onChange={(value) => updateSettings('borrowingRules', 'maxBooksPerUser', parseInt(value))}
          />
          <Input
            label="Loan Period (days)"
            value={settings.borrowingRules.loanPeriod}
            onChange={(value) => updateSettings('borrowingRules', 'loanPeriod', parseInt(value))}
          />
          <Input
            label="Renewal Limit"
            value={settings.borrowingRules.renewalLimit}
            onChange={(value) => updateSettings('borrowingRules', 'renewalLimit', parseInt(value))}
          />
          <Input
            label="Renewal Period (days)"
            value={settings.borrowingRules.renewalPeriod}
            onChange={(value) => updateSettings('borrowingRules', 'renewalPeriod', parseInt(value))}
          />
        </div>
      </Section>

      <Section title="Fine Settings" icon={DollarSign}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Daily Fine ($)"
            value={settings.fineSettings.dailyFine}
            onChange={(value) => updateSettings('fineSettings', 'dailyFine', parseFloat(value))}
            step="0.01"
          />
          <Input
            label="Grace Period (days)"
            value={settings.fineSettings.gracePeriod}
            onChange={(value) => updateSettings('fineSettings', 'gracePeriod', parseInt(value))}
          />
          <Input
            label="Maximum Fine ($)"
            value={settings.fineSettings.maxFine}
            onChange={(value) => updateSettings('fineSettings', 'maxFine', parseFloat(value))}
            step="0.01"
          />
        </div>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Checkbox
              label="Due Date Reminder"
              checked={settings.notifications.dueDateReminder}
              onChange={(checked) => updateSettings('notifications', 'dueDateReminder', checked)}
            />
            <Checkbox
              label="Overdue Alert"
              checked={settings.notifications.overdueAlert}
              onChange={(checked) => updateSettings('notifications', 'overdueAlert', checked)}
            />
            <Checkbox
              label="Fine Notification"
              checked={settings.notifications.fineNotification}
              onChange={(checked) => updateSettings('notifications', 'fineNotification', checked)}
            />
            <Checkbox
              label="New Book Notification"
              checked={settings.notifications.newBookNotification}
              onChange={(checked) => updateSettings('notifications', 'newBookNotification', checked)}
            />
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Notification Channels</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Checkbox
                label="Email Notifications"
                checked={settings.notifications.emailNotifications}
                onChange={(checked) => updateSettings('notifications', 'emailNotifications', checked)}
              />
              <Checkbox
                label="SMS Notifications"
                checked={settings.notifications.smsNotifications}
                onChange={(checked) => updateSettings('notifications', 'smsNotifications', checked)}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Security Settings" icon={Shield}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Session Timeout (minutes)"
            value={settings.security.sessionTimeout}
            onChange={(value) => updateSettings('security', 'sessionTimeout', parseInt(value))}
          />
          <Input
            label="Password Expiry (days)"
            value={settings.security.passwordExpiry}
            onChange={(value) => updateSettings('security', 'passwordExpiry', parseInt(value))}
          />
          <Input
            label="Failed Login Attempts"
            value={settings.security.failedLoginAttempts}
            onChange={(value) => updateSettings('security', 'failedLoginAttempts', parseInt(value))}
          />
          <div className="flex items-center">
            <Checkbox
              label="Enable Two-Factor Authentication"
              checked={settings.security.twoFactorAuth}
              onChange={(checked) => updateSettings('security', 'twoFactorAuth', checked)}
            />
          </div>
        </div>
      </Section>

      <Section title="System Settings" icon={RefreshCw}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Checkbox
            label="Maintenance Mode"
            checked={settings.system.maintenanceMode}
            onChange={(checked) => updateSettings('system', 'maintenanceMode', checked)}
          />
          <Checkbox
            label="Automatic Backup"
            checked={settings.system.autoBackup}
            onChange={(checked) => updateSettings('system', 'autoBackup', checked)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={settings.system.backupFrequency}
              onChange={(e) => updateSettings('system', 'backupFrequency', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <Input
            label="Data Retention (days)"
            value={settings.system.dataRetention}
            onChange={(value) => updateSettings('system', 'dataRetention', parseInt(value))}
          />
        </div>
      </Section>

      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
} 