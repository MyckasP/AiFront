import React from "react";
import "./front.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import welcomeimage from '../../assets/welcomeimage.png';

const Front = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    const handleGetStarted = () => {
        navigate("/chat"); // Navigate to ChatInput page
    };

    return (
        <div className="design-root">
            <div className="layout-container">
                <header className="header">
                    <div className="header-left">
                        <div className="logo">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="title">Study Buddy</h2>
                    </div>
                    <div className="header-right">
                        <div className="buttons">
                            <button className="button settings-btn">
                                <div className="icon">⚙️</div>
                            </button>
                            <button className="button help-btn">
                                <div className="icon">❓</div>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="button logout-button"
                                aria-label="Logout"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        </div>
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: 'url("https://cdn.usegalileo.ai/stability/460d8af5-95c5-4db7-90ea-2f910a7e4c97.png")',
                            }}
                        />
                    </div>
                </header>
                <div className="content">
                    <div className="content-container">
                        <div
                            className="hero-section"
                            style={{
                                backgroundImage: `url(${welcomeimage}), linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9))`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="text-section">
                                <h1 className="main-heading">Welcome to Study Buddy</h1>
                                <h2 className="sub-heading">
                                    Your personal study assistant. Use Study Buddy to help you understand complex
                                    concepts, work through difficult problems, or just get a second pair of eyes on
                                    your work.
                                </h2>
                            </div>
                            <button
                                className="cta-button"
                                onClick={handleGetStarted} // Trigger the redirection
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Front;
