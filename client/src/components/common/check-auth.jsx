import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // If the user is not authenticated and is trying to access a non-login/register route
    if (!isAuthenticated && !location.pathname.includes('/login') && !location.pathname.includes('/register')) {
        return <Navigate to="/auth/login" />;
    }

    // If the user is authenticated and trying to access login/register pages, redirect based on role
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }

    // If the user is authenticated and trying to access admin pages, redirect if they are not an admin
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />;
    }

    // If the user is authenticated and trying to access shop pages as an admin, redirect to the admin dashboard
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}


export default CheckAuth;