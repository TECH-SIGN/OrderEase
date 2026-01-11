/**
 * Orders API Service
 * Handles all order-related API calls
 */

import httpClient from './httpClient';
import { API_ENDPOINTS } from '../../config/api.config';

const ordersApi = {
  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @param {string} orderData.customerName - Customer name
   * @param {string} orderData.phone - Customer phone
   * @param {Array} orderData.items - Order items
   * @param {number} orderData.totalPrice - Total price
   * @param {string} orderData.orderType - Order type (dine-in/delivery)
   * @param {string} orderData.tableNumber - Table number (optional)
   * @param {string} orderData.deliveryAddress - Delivery address (optional)
   * @returns {Promise} Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create order from cart
   * @param {Object} orderData - Order data from cart
   * @returns {Promise} Created order
   */
  createOrderFromCart: async (orderData) => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.ORDERS.CREATE_FROM_CART, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all orders
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.orderType - Filter by order type
   * @returns {Promise} Array of orders
   */
  getAllOrders: async (params = {}) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.ORDERS.LIST, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order by ID
   * @param {string} id - Order ID
   * @returns {Promise} Order data
   */
  getOrderById: async (id) => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.ORDERS.BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {Promise} Updated order
   */
  updateOrderStatus: async (id, status) => {
    try {
      const response = await httpClient.put(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete order
   * @param {string} id - Order ID
   * @returns {Promise}
   */
  deleteOrder: async (id) => {
    try {
      const response = await httpClient.delete(API_ENDPOINTS.ORDERS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order statistics (Admin only)
   * @returns {Promise} Order statistics
   */
  getOrderStats: async () => {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.ORDERS.LIST}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ordersApi;
