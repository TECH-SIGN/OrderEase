/**
 * useMenu Hook
 * Custom hook for menu page with filtering and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/slices/menuSlice';

const useMenu = () => {
  const dispatch = useDispatch();
  const { items: menuItems, loading, error } = useSelector((state) => state.menu);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Starters', 'Main Course', 'Fast Food', 'Drinks', 'Desserts'];

  useEffect(() => {
    dispatch(fetchMenuItems({ available: true }));
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchMenuItems({ available: true }));
  }, [dispatch]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return {
    menuItems: filteredItems,
    loading,
    error,
    selectedCategory,
    categories,
    handleRetry,
    handleCategoryChange,
  };
};

export default useMenu;
