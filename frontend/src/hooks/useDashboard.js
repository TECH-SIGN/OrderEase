/**
 * useDashboard Hook
 * Custom hook for admin dashboard
 */

import { useState, useEffect, useCallback } from 'react';
import { ordersApi } from '../services/api';

const useDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await ordersApi.getAllOrders();
      
      const totalOrders = data.length;
      const pendingOrders = data.filter(o => o.status === 'pending' || o.status === 'preparing').length;
      const completedOrders = data.filter(o => o.status === 'delivered' || o.status === 'ready').length;
      const totalRevenue = data.reduce((sum, order) => sum + order.totalPrice, 0);

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
      });

      setRecentOrders(data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getStatusColor = useCallback((status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }, []);

  return {
    stats,
    recentOrders,
    loading,
    getStatusColor,
  };
};

export default useDashboard;
