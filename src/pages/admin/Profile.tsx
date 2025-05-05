import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, X, Shield, BookOpen } from 'lucide-react';
import { db, type User as UserType, type ProfileDetails } from '../../lib/db';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: number;
  role: string;
  status: string;
  borrowedBooks?: number;
}

// Profile Info Item Component
const ProfileInfoItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: any, 
  label: string, 
  value: string | number 
}) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-full">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
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
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Edit Profile Modal Component
const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onSubmit 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  formData: ProfileData, 
  onSubmit: (form: ProfileData) => void 
}) => {
  const [form, setForm] = useState<ProfileData>(formData);

  useEffect(() => {
    setForm(formData);
  }, [formData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl pointer-events-auto border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: Date.now(),
    role: '',
    status: '',
    borrowedBooks: 0
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const users = await db.users.toArray();
      const borrowings = await db.borrowings.toArray();
      
      if (users.length > 0) {
        const currentUser = users[0];
        const userBorrowings = borrowings.filter(b => b.userId === currentUser.id && b.status === 'active');
        
        // Load profile details from the new table
        const profileDetails = await db.profileDetails.get(currentUser.id);
        
        const profile: ProfileData = {
          name: currentUser.name,
          email: currentUser.email,
          phone: profileDetails?.phone || '+1 (555) 123-4567',
          address: profileDetails?.address || '123 Library Street, Bookville, 12345',
          joinDate: currentUser.joinDate,
          role: currentUser.role,
          status: currentUser.status,
          borrowedBooks: userBorrowings.length
        };
        setProfileData(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleEditSubmit = async (updatedForm: ProfileData) => {
    try {
      const users = await db.users.toArray();
      if (users.length > 0) {
        const currentUser = users[0];
        
        // Update user information
        await db.users.update(currentUser.id, {
          name: updatedForm.name,
          email: updatedForm.email
        });

        // Update or create profile details
        const now = Date.now();
        await db.profileDetails.put({
          userId: currentUser.id,
          phone: updatedForm.phone,
          address: updatedForm.address,
          lastUpdated: now
        });

        // Add activity log
        await db.activities.add({
          id: now.toString(),
          type: 'edit',
          user: updatedForm.name,
          book: 'Profile Updated',
          time: new Date(now).toLocaleString(),
          status: 'completed',
          timestamp: now
        });

        // Update local state
        setProfileData(updatedForm);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        <StatsCard
          title="Borrowed Books"
          value={profileData.borrowedBooks || 0}
          icon={BookOpen}
          color="bg-blue-500"
        />
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileInfoItem
          icon={Phone}
          label="Phone"
          value={profileData.phone}
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
        />
        <ProfileInfoItem
          icon={Mail}
          label="Email"
          value={profileData.email}
        />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={profileData}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
} 