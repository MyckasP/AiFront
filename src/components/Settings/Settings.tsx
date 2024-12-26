import React, { useState } from "react";
import { changeUsername, changePassword } from "../../Services/apiService"; // Adjust the path as necessary
import "./Settings.css";

const Settings = () => {
    const [userId] = useState(1); // Replace with dynamic user ID if needed
    const [newUsername, setNewUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChangeUsername = async () => {
        try {
            const response = await changeUsername({ userId, newUsername });
            setMessage(response.message);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await changePassword({ userId, oldPassword, newPassword, confirmNewPassword });
            setMessage(response.message);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="settings-section">
                <h2>Change Username</h2>
                <input
                    type="text"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleChangeUsername}>Change Username</button>
            </div>

            <div className="settings-section">
                <h2>Change Password</h2>
                <input
                    type="password"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Change Password</button>
            </div>

            {message && <div className="settings-message">{message}</div>}
        </div>
    );
};

export default Settings;
