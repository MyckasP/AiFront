import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./front.css";

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
            <header className="header">
                <div className="header-left">
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        📚
                    </motion.div>
                    <motion.h2
                        className="title"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Study Buddy
                    </motion.h2>
                </div>
                <div className="header-right">
                    <motion.div
                        className="buttons"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.button
                            className="button settings-btn"
                            onClick={handleSettings}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FontAwesomeIcon icon={faCog} />
                        </motion.button>
                        <motion.button
                            className="button help-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </motion.button>
                        <motion.button
                            className="button logout-button"
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </motion.button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Avatar />
                    </motion.div>
                </div>
            </header>

            <main className="content">
                <motion.div
                    className="hero-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="text-section">
                        <motion.h1
                            className="main-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Your Personal Learning Assistant
                        </motion.h1>
                        <motion.p
                            className="sub-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            Your personal study assistant. Use Study Buddy to help you understand complex concepts, work through difficult                                   problems, or just get a second pair of eyes on your work.
                        </motion.p>
                        <motion.button
                            className="cta-button"
                            onClick={handleGetStarted}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Learning
                        </motion.button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Front;