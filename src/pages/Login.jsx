import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const redirectIfAuthenticated = async () => {
            const isAuthenticated = await checkAuthenticationStatus();

            if (isAuthenticated) {
                navigate("/admin/dashboard", { replace: true });
            }
        };

        redirectIfAuthenticated();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {

            const response = await fetch(
                `${API_BASE_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                setError("Invalid username or password");
                return;
            }

            navigate("/admin/dashboard", { replace: true });

        } catch (error) {

            setError("Unable to connect to server");

        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="d-flex justify-content-center align-items-center mb-3">
                    
                <span className="app-header-logo-text">
                    Mail<span className="app-header-logo-accent">Mate</span>
                </span>
                </div>
               
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } placeholder="Enter password" required/>
                    </div>
                    {
                        error && (<p className="error"> {error}</p>)
                    }
                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;