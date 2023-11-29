import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ element, layout: Layout, allowedRoles }) => {
    const role = localStorage.getItem('role');
    console.log('Role:', role);
    console.log('Allowed Roles:', allowedRoles);
    const isAuthenticated = useAuth();
    if (!isAuthenticated || !role) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles.includes(role)) {
        return <Layout>{element}</Layout>;
    } else {
        return <Navigate to="/unauthorized" replace />;
    }
};

export default PrivateRoute;
