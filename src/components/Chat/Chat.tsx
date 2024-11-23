import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatService } from '../../Services/chat.service';
import './Chat.css';

interface LocationState {
    aiResponse: string;
    learningFormat: string;
}

const Chat: React.FC = () => {
    const location = useLocation();
    const { aiResponse, learningFormat } = location.state as LocationState;
    const [savedChats, setSavedChats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const chatService = new ChatService();
    const userId = 1; // Replace with dynamic userId (e.g., from auth)

    // Function to save chat
    const handleSaveChat = async () => {
        try {
            setLoading(true);
            const message = await chatService.saveChat(userId, aiResponse); // Save the chat
            setSavedChats((prevChats) => [...prevChats, aiResponse]); // Add the saved chat locally
            alert(message); // Notify user of success
        } catch (error) {
            console.error('Error saving chat:', error);
            alert('Failed to save chat.');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch saved chats
    const fetchSavedChats = async () => {
        try {
            setLoading(true);
            const chats = await chatService.getSavedChats(userId); // Fetch saved chats
            setSavedChats(chats); // Update state with the fetched chats
        } catch (error) {
            console.error('Error fetching saved chats:', error);
            alert('Failed to fetch saved chats.');
        } finally {
            setLoading(false);
        }
    };

    // Function to render the saved chats
    const renderSavedChats = () => {
        return savedChats.map((chat, index) => {
            return <li key={index} className="saved-chat-item">{chat}</li>;
        });
    };

    // Fetch saved chats on component mount
    useEffect(() => {
        fetchSavedChats();
    }, []);

    // Function to render the AI response content
    const renderContent = () => {
        if (learningFormat === 'bulletPoints') {
            const points = aiResponse.split('\n').filter((point) => point.trim() !== '');
            return (
                <ul className="chat-bullet-list">
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            );
        }
        return <p className="chat-paragraph">{aiResponse}</p>;
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-sidebar">
                <div className="sidebar-header">Saved Chats</div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="saved-chats-list">
                        {renderSavedChats()} {/* Use the renderSavedChats function */}
                    </ul>
                )}
                <button className="save-chat-button" onClick={handleSaveChat} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Chat'}
                </button>
            </div>
            <div className="chat-container">
                <div className="chat-header">AI Suggested Learning Content</div>
                <div className="chat-content">{renderContent()}</div>
                <div className="chat-footer">End of the conversation</div>
            </div>
        </div>
    );
};

export default Chat;
