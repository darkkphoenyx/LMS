import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, X, Shield, Save } from 'lucide-react';
import { db, type User as UserType, type ProfileDetails } from '../../lib/db';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: number;
  role: string;
  status: string;
}

// Profile Info Item Component
const ProfileInfoItem = ({ 
  icon: Icon, 
  label, 
  value,
  isEditing,
  onChange,
  type = 'text'
}: { 
  icon: any, 
  label: string, 
  value: string | number,
  isEditing?: boolean,
  onChange?: (value: string) => void,
  type?: string
}) => (
  <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div className="ml-4 flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
            value={value as string}
            onChange={(e) => onChange?.(e.target.value)}
            rows={3}
          />
        ) : (
          <input
            type={type}
            className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        )
      ) : (
        <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
      )}
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color 
}: { 
  title: string, 
  value: string | number, 
  icon: any, 
  color: string 
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
    <div className="flex items-center">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: Date.now(),
    role: '',
    status: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const users = await db.users.toArray();
      
      if (users.length > 0) {
        const currentUser = users[0];
        const profileDetails = await db.profileDetails.get(currentUser.id);
        
        const profile: ProfileData = {
          name: currentUser.name,
          email: currentUser.email,
          phone: profileDetails?.phone || '+1 (555) 123-4567',
          address: profileDetails?.address || '123 Library Street, Bookville, 12345',
          joinDate: currentUser.joinDate,
          role: currentUser.role,
          status: currentUser.status
        };
        setProfileData(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      const users = await db.users.toArray();
      if (users.length > 0) {
        const currentUser = users[0];
        
        // Update user information
        await db.users.update(currentUser.id, {
          name: profileData.name,
          email: profileData.email,
          status: profileData.status as 'active' | 'inactive'
        });

        // Update or create profile details
        const now = Date.now();
        await db.profileDetails.put({
          userId: currentUser.id,
          phone: profileData.phone,
          address: profileData.address,
          lastUpdated: now
        });

        // Add activity log
        await db.activities.add({
          id: now.toString(),
          type: 'edit',
          user: profileData.name,
          book: 'Profile Updated',
          time: new Date(now).toLocaleString(),
          status: 'completed',
          timestamp: now
        });

        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    loadProfile(); // Reload original data
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatsCard
          title="Role"
          value={profileData.role}
          icon={Shield}
          color="bg-purple-500"
        />
        <StatsCard
          title="Status"
          value={profileData.status}
          icon={User}
          color="bg-green-500"
        />
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileInfoItem
          icon={User}
          label="Name"
          value={profileData.name}
          isEditing={isEditing}
          onChange={(value) => setProfileData({ ...profileData, name: value })}
        />
        <ProfileInfoItem
          icon={Mail}
          label="Email"
          value={profileData.email}
          isEditing={isEditing}
          onChange={(value) => setProfileData({ ...profileData, email: value })}
          type="email"
        />
        <ProfileInfoItem
          icon={Phone}
          label="Phone"
          value={profileData.phone}
          isEditing={isEditing}
          onChange={(value) => setProfileData({ ...profileData, phone: value })}
          type="tel"
        />
        <ProfileInfoItem
          icon={Calendar}
          label="Member Since"
          value={new Date(profileData.joinDate).toLocaleDateString()}
        />
        <ProfileInfoItem
          icon={MapPin}
          label="Address"
          value={profileData.address}
          isEditing={isEditing}
          onChange={(value) => setProfileData({ ...profileData, address: value })}
          type="textarea"
        />
        <ProfileInfoItem
          icon={User}
          label="Status"
          value={profileData.status}
          isEditing={isEditing}
          onChange={(value) => setProfileData({ ...profileData, status: value })}
        />
      </div>
    </div>
  );
} 