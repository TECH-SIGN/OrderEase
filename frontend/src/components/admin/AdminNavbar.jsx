import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/admin/dashboard" className="text-2xl font-bold">
            OrderEase Admin
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/admin/dashboard" className="hover:text-orange-400 transition">
              Dashboard
            </Link>
            <Link to="/admin/menu" className="hover:text-orange-400 transition">
              Menu
            </Link>
            <Link to="/admin/orders" className="hover:text-orange-400 transition">
              Orders
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm">👤 {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-orange-600 px-4 py-2 rounded hover:bg-orange-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
