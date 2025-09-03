import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUser, FaSignOutAlt, FaEdit } from 'react-icons/fa';

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  
  // User profile data
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    website: '',
    company: '',
    location: ''
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setProfile({
            displayName: userDoc.data().displayName || currentUser.displayName || '',
            bio: userDoc.data().bio || '',
            website: userDoc.data().website || '',
            company: userDoc.data().company || '',
            location: userDoc.data().location || ''
          });
        } else {
          // Create a new user document if it doesn't exist
          await setDoc(userDocRef, {
            displayName: currentUser.displayName || '',
            email: currentUser.email,
            createdAt: new Date()
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, profile);
      setSuccess('Profile updated successfully');
      setEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (err) {
      setError('Failed to log out');
    }
  };

  if (loading && !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md mb-4">
              {success}
            </div>
          )}
          
          <div className="flex items-center mb-6">
            <div className="bg-gray-200 dark:bg-dark-600 rounded-full p-4 mr-4">
              <FaUser className="text-3xl text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {profile.displayName || currentUser?.email}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{currentUser?.email}</p>
            </div>
            <button 
              onClick={() => setEditing(!editing)}
              className="ml-auto flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <FaEdit /> {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={profile.company}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-dark-500 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {profile.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{profile.bio}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.website && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
                
                {profile.company && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h3>
                    <p className="mt-1 text-gray-900 dark:text-white">{profile.company}</p>
                  </div>
                )}
              </div>
              
              {profile.location && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{profile.location}</p>
                </div>
              )}
              
              {!profile.bio && !profile.website && !profile.company && !profile.location && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <p>Your profile is empty. Click 'Edit Profile' to add information.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;