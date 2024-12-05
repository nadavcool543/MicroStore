import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
    const { login } = useAuth();

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8083/oauth2/authorization/google';
    };

    return (
        <div className="login-container">
            <h2>Welcome to MicroStore</h2>
            <button className="google-login-btn" onClick={handleGoogleLogin}>
                <img src="/google-icon.svg" alt="Google" />
                Sign in with Google
            </button>
        </div>
    );
}

export default Login; 