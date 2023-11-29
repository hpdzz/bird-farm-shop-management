import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/index';
import GuestLayout from './layout/GuestLayout/GuestLayout';

import UserLayout from './layout/UserLayout/UserLayout';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import ManagerLayout from './layout/ManagerLayout/ManagerLayout';
import useAuth from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoutes';
import './App.css';
function App() {
    return (
        <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <GuestLayout>
                            <route.Component />
                        </GuestLayout>
                    }
                />
            ))}
            {privateRoutes.user.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<PrivateRoute element={<route.Component />} layout={UserLayout} allowedRoles={['User']} />}
                />
            ))}

            {privateRoutes.admin.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute element={<route.Component />} layout={AdminLayout} allowedRoles={['Admin']} />
                    }
                />
            ))}

            {privateRoutes.manager.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute element={<route.Component />} layout={ManagerLayout} allowedRoles={['Manager']} />
                    }
                />
            ))}
        </Routes>
    );
}

export default App;
