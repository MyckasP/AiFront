import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faQuestionCircle, faGraduationCap, faRocket, faBrain } from '@fortawesome/free-solid-svg-icons';
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
                            Transform your learning experience with AI-powered study assistance. Get personalized study plans, instant explanations, and interactive learning sessions.
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

                <div className="features-section">
                    <h2>Why Choose Study Buddy?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <FontAwesomeIcon icon={faGraduationCap} className="feature-icon" />
                            <h3>Personalized Learning</h3>
                            <p>Get customized study plans tailored to your learning style and pace.</p>
                        </div>
                        <div className="feature-card">
                            <FontAwesomeIcon icon={faRocket} className="feature-icon" />
                            <h3>Instant Assistance</h3>
                            <p>Get immediate help with complex topics and challenging problems.</p>
                        </div>
                        <div className="feature-card">
                            <FontAwesomeIcon icon={faBrain} className="feature-icon" />
                            <h3>Smart Progress Tracking</h3>
                            <p>Monitor your learning progress and identify areas for improvement.</p>
                        </div>
                    </div>
                </div>

                <div className="pricing-section">
                    <h2>Pricing</h2>
                    <div className="pricing-cards">
                        <div className="pricing-card">
                            <h3>Free Plan</h3>
                            <div className="price">$0</div>
                            <div className="price-period">per month</div>
                            <ul className="features-list">
                                <li>✓ </li>
                                <li>✓ </li>
                                <li>✓ </li>
                                <li>✓ </li>
                            </ul>
                            <button className="pricing-button" onClick={handleGetStarted}>Get Started</button>
                        </div>
                        <div className="pricing-card premium">
                            <div className="coming-soon-badge">Coming Soon</div>
                            <h3>Premium</h3>
                            <div className="price">TBA</div>
                            <div className="price-period">per month</div>
                            <ul className="features-list">
                                <li>Coming Soon</li>
                            </ul>
                            <button className="pricing-button disabled">Coming Soon</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Front;