import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function LogoutButton({ className = '', children = 'Logout' }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Confirm logout
        if (window.confirm('Are you sure you want to logout?')) {
            authService.logout();
            navigate('/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={className || 'btn btn-danger'}
        >
            {children}
        </button>
    );
}
