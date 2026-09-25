import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const AUTH_CHECK_ENDPOINTS = ["/auth/me", "/auth/session", "/auth/check", "/auth/validate"];

async function checkAuthenticationStatus() {
    for (const endpoint of AUTH_CHECK_ENDPOINTS) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "GET",
                credentials: "include"
            });

            if (response.status === 404 || response.status === 405) {
                continue;
            }

            return response.ok;
        } catch (error) {
            continue;
        }
    }

    return false;
}

function ProtectedRoute() {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkAuthentication = async () => {
            try {
                const isAuthenticated = await checkAuthenticationStatus();
                setAuthenticated(isAuthenticated);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();

    }, []);

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;