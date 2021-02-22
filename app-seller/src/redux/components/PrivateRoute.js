import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import isLoggedIn from "../helpers/isLoggedIn";

export const PrivateRoute = ({ children }) => {
    const isAuth  = isLoggedIn();
    const location = useLocation();
    return isAuth ? (
        children
    ) : (
            <Navigate
                to="/login"
                state={{ from: location }}
            />
        );
}

