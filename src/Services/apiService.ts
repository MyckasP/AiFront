import axios from "axios";

export const API_URL = "https://localhost:7096/api/Account";

interface SignupResponse {
    message: string;
}

interface LoginResponse {
    Message: string;
    userId: string; // Ensure correct casing to match backend response
}
interface ChangeUsernameResponse {
    message: string;
}

interface ChangePasswordResponse {
    message: string;
}
interface UserResponse {
    username: string;
}
export const changeUsername = async (data: { userId: number; newUsername: string }): Promise<ChangeUsernameResponse> => {
    try {
        const response = await axios.put(`${API_URL}/change-username`, data);
        return response.data as ChangeUsernameResponse;
    } catch (error: any) {
        console.error("Change Username API error:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Change username failed");
    }
};

export const changePassword = async (data: {
    userId: number;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}): Promise<ChangePasswordResponse> => {
    try {
        const response = await axios.put(`${API_URL}/change-password`, data);
        return response.data as ChangePasswordResponse;
    } catch (error: any) {
        console.error("Change Password API error:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Change password failed");
    }
};
export const getUserInfo = async (userId: number): Promise<UserResponse> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data as UserResponse;
    } catch (error: any) {
        console.error("Get User Info API error:", error);
        throw new Error("Failed to fetch user info");
    }
};


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

        // Log the full response to confirm the structure
        console.log("Response from login API:", response.data);

        // If the response structure is correct, this should work without issues
        return response.data as LoginResponse;
    } catch (error: any) {
        console.error("Login API error:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Login failed");
    }
};
