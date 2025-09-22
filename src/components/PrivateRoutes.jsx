import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ publicPage = false }) => {
    const { user } = useSelector((state) => state.auth);
    if(publicPage) {
        return user ? <Navigate to = "/profile" /> : <Outlet />
    }
  return user ? <Outlet /> : <Navigate to = "/login" />;
}

export default PrivateRoutes