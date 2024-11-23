import React, { useState } from "react";
import { signup } from "../../Services/apiService";
import "./Signup.css";

interface SignupProps {
    switchToLogin: () => void;
}

interface SignupResponse {
    message: string;
}

const Signup: React.FC<SignupProps> = ({ switchToLogin }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response: SignupResponse = await signup(formData);
            setSuccess(response.message);
            setTimeout(() => switchToLogin(), 1500);
        } catch (err: any) {
            const errorMessage =
                err.response?.data || err.message || "An unexpected error occurred.";
            setError(errorMessage);
        }
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <p>
                Already have an account?{" "}
                <span onClick={switchToLogin} className="switch-link">
                    Log in
                </span>
            </p>
        </div>
    );
};

export default Signup;
