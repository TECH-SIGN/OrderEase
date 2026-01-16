/**
 * ProfileLoader Component
 * Loads user profile from backend on app initialization
 * Ensures user data is fresh and not from stale localStorage
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/authSlice';

const ProfileLoader = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If authenticated but no user data, fetch profile from backend
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile()).catch((error) => {
        console.error('Failed to load user profile:', error);
      });
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    // Listen for token refresh events and reload profile
    const handleTokenRefresh = () => {
      if (isAuthenticated) {
        dispatch(fetchUserProfile()).catch((error) => {
          console.error('Failed to reload user profile after token refresh:', error);
        });
      }
    };

    window.addEventListener('auth:tokenRefreshed', handleTokenRefresh);

    return () => {
      window.removeEventListener('auth:tokenRefreshed', handleTokenRefresh);
    };
  }, [dispatch, isAuthenticated]);

  return null;
};

export default ProfileLoader;
