import axios from "axios";

const API_URL = "https://localhost:7096/api/Account";

interface SignupResponse {
    message: string;
}

interface LoginResponse {
    Message: string;
    UserId: string;
}

export const signup = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}): Promise<SignupResponse> => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response.data as SignupResponse; // Ensure correct typing
    } catch (error: any) {
        throw new Error(error.response?.data || "Signup failed");
    }
};

export const login = async (data: { usernameOrEmail: string; password: string }): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data as LoginResponse;
    } catch (error: any) {
        throw new Error(error.response?.data || "Login failed");
    }
};
