import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';



const AdminRoute = ({children}) => {
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    return (user?.role === "Admin" || user?.role === "Support") ? children : <Navigate to='/users' />;
};

export default AdminRoute;