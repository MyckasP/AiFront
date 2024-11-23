import React, { useState } from "react";
import { login } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginbackground from '../../assets/loginbackground.jpg';

interface LoginProps {
    switchToSignup: () => void;
}

interface LoginResponse {
    Message: string;
    userId: string; // This should match the backend response field
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

            // Log the full response to check its structure
            console.log("Full response from backend:", response);

            // Check if userId exists in the response (with exact casing)
            if (response && response.userId) {
                console.log("User ID:", response.userId); // Logging UserId
                localStorage.setItem("userId", response.userId); // Store UserId in localStorage
                setSuccess(response.Message);
                navigate("/front");
            } else {
                console.error("UserId is undefined in the response");
            }

        } catch (err: any) {
            const errorMessage =
                err.response?.data || err.message || "An unexpected error occurred.";
            console.error("Error occurred:", errorMessage); // Log error details
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    name="usernameOrEmail"
                    type="text"
                    placeholder="Username or Email"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <p>
                Don't have an account?{" "}
                <span onClick={switchToSignup} className="switch-link">
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
