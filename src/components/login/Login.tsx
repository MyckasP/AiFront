import React, { useState } from "react";
import { login } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const response: LoginResponse = await login(formData);
            if (response && response.userId) {
                localStorage.setItem("userId", response.userId);
                setSuccess(response.Message);
                // Add a small delay for better UX
                setTimeout(() => {
                    navigate("/front");
                }, 1000);
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data || err.message || "An unexpected error occurred.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <motion.div
                className="login-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="login-title">Welcome Back</h1>
                <form onSubmit={handleLogin} className="form-container">
                    <div className="input-group">
                        <label htmlFor="usernameOrEmail">Username or Email</label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
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
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="login-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>
                
                {error && (
                    <motion.p
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.p>
                )}
                
                {success && (
                    <motion.p
                        className="success-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {success}
                    </motion.p>
                )}
                
                <motion.p
                    className="signup-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Don't have an account?{" "}
                    <motion.span
                        onClick={switchToSignup}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign up
                    </motion.span>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;