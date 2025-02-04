import React, { useState } from "react";
import { login } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
    switchToSignup: () => void;
}

interface LoginResponse {
    Message: string;
    userId: string;
}

const Login: React.FC<LoginProps> = ({ switchToSignup }) => {
    const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response: LoginResponse = await login(formData);
            if (response && response.userId) {
                localStorage.setItem("userId", response.userId);
                setSuccess(response.Message);
                navigate("/front");
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data || err.message || "An unexpected error occurred.";
            setError(errorMessage);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="usernameOrEmail">Username or Email</label>
                        <input
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            type="text"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <p className="signup-link">
                    Don't have an account?{" "}
                    <span onClick={switchToSignup}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;