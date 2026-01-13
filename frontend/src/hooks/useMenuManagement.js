/**
 * useMenuManagement Hook
 * Custom hook for menu CRUD operations
 */

import { useState, useEffect, useCallback } from 'react';
import { foodApi } from '../services/api';

const useMenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Starters',
    description: '',
    image: '',
    isAvailable: true,
  });

  const categories = ['Starters', 'Main Course', 'Fast Food', 'Drinks', 'Desserts'];

  const fetchMenuItems = useCallback(async () => {
    try {
      const data = await foodApi.getAllFoodItems();
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleChange = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      price: '',
      category: 'Starters',
      description: '',
      image: '',
      isAvailable: true,
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await foodApi.updateFoodItem(editingItem._id, formData);
      } else {
        await foodApi.createFoodItem(formData);
      }
      fetchMenuItems();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert(error.message || 'Failed to save menu item');
    }
  }, [editingItem, formData, fetchMenuItems, handleCloseModal]);

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || '',
      image: item.image || '',
      isAvailable: item.isAvailable,
    });
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await foodApi.deleteFoodItem(id);
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
        alert('Failed to delete menu item');
      }
    }
  }, [fetchMenuItems]);

  const openAddModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return {
    menuItems,
    showModal,
    editingItem,
    loading,
    formData,
    categories,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCloseModal,
    openAddModal,
  };
};

export default useMenuManagement;
