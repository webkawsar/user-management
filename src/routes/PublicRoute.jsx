import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';




const PublicRoute = ({children}) => {
    const location = useLocation();
    const isLoggedIn = useAuth();
    return isLoggedIn ? <Navigate to={location?.state?.from ? location?.state?.from : '/contacts'} /> : children
};

export default PublicRoute;