import React, { useContext } from 'react';
import {useLocation,Navigate,Outlet} from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
//import useAuth from '../hooks/useAuth';

function RequireAuth() {
    const { user } = useContext(AuthContext);
    const location = useLocation()
    if (user) {
        return <Outlet />
    }
    else {
        return <Navigate to="login" state={{ from: location }} replace />
    }
}

export default RequireAuth