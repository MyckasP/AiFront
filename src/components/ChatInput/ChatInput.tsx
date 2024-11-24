import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChatInput.css';

// Define types for the API response
interface AIResponseChoice {
    message: {
        content: string;
    };
}

interface APIResponse {
    choices: AIResponseChoice[];
}

const ChatInput: React.FC = () => {
    const [studyTime, setStudyTime] = useState('');
    const [topic, setTopic] = useState('');
    const [learningFormat, setLearningFormat] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    const handleStudyTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudyTime(event.target.value);
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(event.target.value);
    };

    const handleLearningFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLearningFormat(event.target.value);
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(event.target.value);
    };

    const handleCancel = () => {
        navigate('/chat');
    };

    const handleContinue = async () => {
        try {
            const response = await axios.post<APIResponse>('https://api.groq.com/openai/v1/chat/completions', {
                model: "llama3-8b-8192",
                messages: [
                    {
                        role: "user",
                        content: `Topic: ${topic}, Difficulty: ${difficulty}, Study Time: ${studyTime} minutes, Format: ${learningFormat}`,
                    },
                ],
                temperature: 0.7,
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            // Ensure aiResponse is a string
            const aiResponse = response.data.choices[0].message.content;

            navigate('/chat', {
                state: {
                    aiResponse: aiResponse, // Confirm that this is a string
                    learningFormat,
                },
            });
        } catch (error) {
            console.error('Error fetching data from Groq AI:', error);
        }
    };

    return (
        <div className="chat-input-container">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h1 className="title">Let's personalize your study plan</h1>
                        <p className="description">
                            This will help me suggest the most relevant content and pace your learning.
                        </p>
                        <div className="select-container">
                            <label className="select-label">
                                <p className="select-title">I want to learn about...</p>
                                <input
                                    type="text"
                                    className="select-input"
                                    placeholder="Enter a topic"
                                    value={topic}
                                    onChange={handleTopicChange}
                                />
                            </label>
                        </div>
                        <div className="select-container">
                            <label className="select-label">
                                <p className="select-title">Difficulty</p>
                                <select className="select-input" value={difficulty} onChange={handleDifficultyChange}>
                                    <option value="">Select a difficulty level</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </label>
                        </div>
                        <div className="select-container">
                            <label className="select-label">
                                <p className="select-title">Length (in minutes)</p>
                                <input
                                    type="number"
                                    className="select-input"
                                    placeholder="Enter study time"
                                    value={studyTime}
                                    onChange={handleStudyTimeChange}
                                />
                            </label>
                        </div>
                        <div className="select-container">
                            <label className="select-label">
                                <p className="select-title">Learning format</p>
                                <select className="select-input" value={learningFormat} onChange={handleLearningFormatChange}>
                                    <option value="">Select a learning format</option>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="bulletPoints">Bullet Points</option>
                                </select>
                            </label>
                        </div>
                        <div className="button-container">
                            <button className="cancel-button" onClick={handleCancel}>
                                <span className="truncate">Cancel</span>
                            </button>
                            <button className="continue-button" onClick={handleContinue}>
                                <span className="truncate">Continue</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
