import React from "react";
import "./front.css";
import Settings from "../Settings/Settings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import welcomeimage from '../../assets/welcomeimage.png';
import Avatar from "../Avatar/Avatar";

const Front = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    const handleGetStarted = () => {
        navigate("/chat");
    };

    const handleSettings = () => {
        navigate("/settings");
    };

    return (
        <div className="design-root">
            <div className="layout-container">
                <header className="header">
                    <div className="header-left">
                        <div className="logo">

                        </div>
                        <h2 className="title">Study Buddy</h2>
                    </div>
                    <div className="header-right">
                        <div className="buttons">
                            <button className="button settings-btn"
                                    onClick={handleSettings}>
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
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </button>
                        </div>
                        <div className="avatar">
                            <Avatar />
                        </div>
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
                                onClick={handleGetStarted}
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
