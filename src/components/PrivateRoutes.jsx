import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    
    if(publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }
    
    if(adminOnly) {
        return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
    }
    
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;