/**
 * User API Service
 * Handles all user-related API calls
 */

import httpClient from '../../../services/api/httpClient';

const userApi = {
  /**
   * Get current user profile
   * @returns {Promise} User profile data
   */
  getProfile: async () => {
    const response = await httpClient.get('/user/profile');
    // Backend returns: { success, message, data: user }
    return response.data.data;
  },

  /**
   * Update current user profile
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.name - User name
   * @param {string} profileData.email - User email
   * @returns {Promise} Updated user profile data
   */
  updateProfile: async (profileData) => {
    const response = await httpClient.put('/user/profile', profileData);
    // Backend returns: { success, message, data: user }
    return response.data.data;
  },

  /**
   * Update current user password
   * @param {Object} passwordData - Password data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise} Success message
   */
  updatePassword: async (passwordData) => {
    const response = await httpClient.put('/user/password', passwordData);
    // Backend returns: { success, message }
    return response.data;
  },

  /**
   * Get current user's orders
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @returns {Promise} User's orders with pagination
   */
  getUserOrders: async (page = 1, limit = 10) => {
    const response = await httpClient.get('/user/orders', {
      params: { page, limit },
    });
    // Backend returns: { success, message, data: { orders, pagination } }
    return response.data.data;
  },
};

export default userApi;
