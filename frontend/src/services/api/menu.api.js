/**
 * Menu API Service
 * Handles public menu-related API calls (customer-facing)
 */

import httpClient from './httpClient';
import { API_ENDPOINTS } from '../../config/api.config';

const menuApi = {
  /**
   * Get all menu items (public, available items only)
   * @param {Object} params - Query parameters
   * @param {string} params.category - Filter by category
   * @returns {Promise} Array of menu items
   */
  getMenuItems: async (params = {}) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MENU.LIST, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get menu item by ID (public)
   * @param {string} id - Menu item ID
   * @returns {Promise} Menu item data
   */
  getMenuItemById: async (id) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MENU.BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get menu items by category (public)
   * @param {string} category - Category name
   * @returns {Promise} Array of menu items
   */
  getMenuItemsByCategory: async (category) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MENU.LIST, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default menuApi;
