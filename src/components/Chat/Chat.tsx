import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChatService, SavedChat } from '../../Services/chat.service';
import './Chat.css';

interface LocationState {
    aiResponse: string;
    learningFormat: string;
}

const Chat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { aiResponse, learningFormat } = location.state as LocationState;
    const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
    const [loading, setLoading] = useState(false);
    const [chatName, setChatName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const chatService = new ChatService();

    const handleSaveChat = () => {
        setShowModal(true);
    };

    const saveChatWithName = async () => {
        if (!chatName.trim()) {
            alert("Please provide a valid name for the chat.");
            return;
        }
        if (userId === null) {
            alert("User not logged in.");
            return;
        }
        try {
            setLoading(true);
            const message = await chatService.saveChat(userId, aiResponse, chatName);
            setSavedChats((prevChats) => [...prevChats, { name: chatName, content: aiResponse }]);
            setChatName('');
            setShowModal(false);
            alert(message);
        } catch (error: any) {
            console.error('Error saving chat:', error.message);
            alert('Failed to save chat.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSavedChats = async () => {
        if (userId === null) return;
        try {
            setLoading(true);
            const chats = await chatService.getSavedChats(userId);
            setSavedChats(chats);
        } catch (error: any) {
            console.error('Error fetching saved chats:', error.message);
            alert('Failed to fetch saved chats.');
        } finally {
            setLoading(false);
        }
    };

    const renderSavedChats = () => savedChats.map((chat, index) => (
        <li
            key={index}
            className="saved-chat-item"
            onClick={() => navigate(`/chat/${index}`, { state: { aiResponse: chat.content, learningFormat } })}
        >
            {chat.name}
        </li>
    ));

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        }
        fetchSavedChats();
    }, [userId]);

    const renderContent = () => {
        if (learningFormat === 'bulletPoints') {
            const points = aiResponse.split('\n').filter((point) => point.trim() !== '');
            return (
                <ul className="chat-bullet-list">
                    {points.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            );
        }
        return <p className="chat-paragraph">{aiResponse}</p>;
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-sidebar">
                <div className="sidebar-header">Saved Chats</div>
                {loading ? <p>Loading...</p> : <ul className="saved-chats-list">{renderSavedChats()}</ul>}
                <button className="save-chat-button" onClick={handleSaveChat} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Chat'}
                </button>
            </div>
            <div className="chat-container">
                <div className="chat-header">AI Suggested Learning Content</div>
                <div className="chat-content">{renderContent()}</div>
                <div className="chat-footer">
                    End of the conversation
                    <button className="new-chat-button" onClick={() => navigate('/ChatInput')}>
                        Create Another Learning Chat
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Save Chat</h3>
                        <input
                            type="text"
                            placeholder="Enter a name for the chat"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                        />
                        <button onClick={saveChatWithName}>Save</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
