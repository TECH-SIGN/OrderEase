/**
 * useUserProfile Hook
 * Custom hook for user profile operations
 */

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../redux/slices/authSlice';
import { userApi } from '../api';
import { useState } from 'react';

const useUserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  /**
   * Refresh user profile from backend
   */
  const refreshProfile = async () => {
    try {
      await dispatch(fetchUserProfile()).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to refresh profile:', err);
      return false;
    }
  };

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   */
  const updateProfile = async (profileData) => {
    try {
      setUpdating(true);
      setUpdateError(null);
      const updatedUser = await userApi.updateProfile(profileData);
      // Refresh profile to sync with backend
      await refreshProfile();
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile';
      setUpdateError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUpdating(false);
    }
  };

  /**
   * Update user password
   * @param {Object} passwordData - Password data
   */
  const updatePassword = async (passwordData) => {
    try {
      setUpdating(true);
      setUpdateError(null);
      await userApi.updatePassword(passwordData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update password';
      setUpdateError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUpdating(false);
    }
  };

  return {
    user,
    loading: loading || updating,
    error: error || updateError,
    refreshProfile,
    updateProfile,
    updatePassword,
  };
};

export default useUserProfile;
