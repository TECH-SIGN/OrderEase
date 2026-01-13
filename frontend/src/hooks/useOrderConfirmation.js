/**
 * useOrderConfirmation Hook
 * Custom hook for order confirmation page
 */

import { useState, useEffect, useCallback } from 'react';
import { ordersApi } from '../services/api';

const useOrderConfirmation = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      const data = await ordersApi.getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const getStatusColor = useCallback((status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }, []);

  return {
    order,
    loading,
    getStatusColor,
  };
};

export default useOrderConfirmation;
