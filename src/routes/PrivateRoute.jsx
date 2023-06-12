import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const PrivateRoute = ({children}) => {
    const location = useLocation();
    const isLoggedIn = useAuth();
    return isLoggedIn ? children : <Navigate to='/login' state={{from: location.pathname}} />;
};

export default PrivateRoute;