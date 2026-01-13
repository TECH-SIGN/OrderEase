/**
 * useOrdersManagement Hook
 * Custom hook for orders management with polling
 */

import { useState, useEffect, useCallback } from 'react';
import { ordersApi } from '../services/api';

const useOrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'pending', 'preparing', 'ready', 'delivered'];

  const fetchOrders = useCallback(async () => {
    try {
      const data = await ordersApi.getAllOrders();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusUpdate = useCallback(async (orderId, newStatus) => {
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus);
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  }, [fetchOrders]);

  const getStatusColor = useCallback((status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-green-600 text-white',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }, []);

  const handleStatusFilterChange = useCallback((status) => {
    setSelectedStatus(status);
  }, []);

  const handleOrderSelect = useCallback((order) => {
    setSelectedOrder(order);
  }, []);

  const handleCloseOrderDetails = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const filteredOrders = selectedStatus === 'All'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  return {
    orders: filteredOrders,
    selectedStatus,
    loading,
    selectedOrder,
    statuses,
    fetchOrders,
    handleStatusUpdate,
    getStatusColor,
    handleStatusFilterChange,
    handleOrderSelect,
    handleCloseOrderDetails,
  };
};

export default useOrdersManagement;
