import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import isLoggedIn from "../helpers/isLoggedIn";

export const PublicRoute = ({ children }) => {
    let isAuth  = isLoggedIn();
    let location = useLocation();

    return isAuth ? (
        <Navigate
            to="/dashboard"
            state={{ from: location }}
        />
    ) : (
            children
        );
}
 