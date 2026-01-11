/**
 * Food API Service
 * Handles admin food/menu management API calls
 */

import httpClient from './httpClient';
import { API_ENDPOINTS } from '../../config/api.config';

const foodApi = {
  /**
   * Get all food items (Admin only)
   * @param {Object} params - Query parameters
   * @param {boolean} params.available - Filter by availability
   * @param {string} params.category - Filter by category
   * @returns {Promise} Array of food items
   */
  getAllFoodItems: async (params = {}) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.FOOD.LIST, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get food item by ID (Admin only)
   * @param {string} id - Food item ID
   * @returns {Promise} Food item data
   */
  getFoodItemById: async (id) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.FOOD.BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new food item (Admin only)
   * @param {Object} foodItemData - Food item data
   * @param {string} foodItemData.name - Item name
   * @param {number} foodItemData.price - Item price
   * @param {string} foodItemData.category - Item category
   * @param {string} foodItemData.description - Item description
   * @param {string} foodItemData.image - Item image URL
   * @param {boolean} foodItemData.isAvailable - Item availability
   * @returns {Promise} Created food item
   */
  createFoodItem: async (foodItemData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.FOOD.CREATE, foodItemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update food item (Admin only)
   * @param {string} id - Food item ID
   * @param {Object} foodItemData - Updated food item data
   * @returns {Promise} Updated food item
   */
  updateFoodItem: async (id, foodItemData) => {
    try {
      const response = await httpClient.put(API_ENDPOINTS.FOOD.UPDATE(id), foodItemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete food item (Admin only)
   * @param {string} id - Food item ID
   * @returns {Promise}
   */
  deleteFoodItem: async (id) => {
    try {
      const response = await httpClient.delete(API_ENDPOINTS.FOOD.DELETE(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get food items by category (Admin only)
   * @param {string} category - Category name
   * @returns {Promise} Array of food items
   */
  getFoodItemsByCategory: async (category) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.FOOD.LIST, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default foodApi;
