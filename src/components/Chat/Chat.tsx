import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatService } from '../../Services/chat.service';
import './Chat.css';
import { SavedChat } from '../../Services/chat.service';

interface LocationState {
    aiResponse: string;
    learningFormat: string;
}

const Chat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { aiResponse = '', learningFormat = 'paragraph' } = (location.state || {}) as Partial<LocationState>;
    const [chatName, setChatName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<SavedChat | null>(null);
    const chatService = new ChatService();

    const handleSaveChat = () => setShowModal(true);

    const saveChatWithName = async () => {
        if (!chatName.trim()) {
            alert('Please provide a valid name for the chat.');
            return;
        }
        if (userId === null) {
            alert('User not logged in.');
            return;
        }
        try {
            await chatService.saveChat(userId, aiResponse, chatName);
            setChatName('');
            setShowModal(false);
            alert('Chat saved successfully');
            await fetchSavedChats(); // Refresh saved chats
        } catch (error: any) {
            console.error('Error saving chat:', error.message);
            alert('Failed to save chat.');
        }
    };

    const fetchSavedChats = async () => {
        if (userId === null) return;
        try {
            const chats = await chatService.getSavedChats(userId);
            const mappedChats = chats.map((chat: any) => ({
                name: chat.chatName,
                content: chat.chatContent,
                timestamp: chat.timestamp,
            }));
            setSavedChats(mappedChats);
        } catch (error: any) {
            console.error('Error fetching saved chats:', error.message);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            const id = Number(storedUserId);
            setUserId(id);
        }
    }, []);

    useEffect(() => {
        if (userId !== null) {
            fetchSavedChats();
        }
    }, [userId]);

    const renderContent = () => {
        if (selectedChat) {
            return (
                <div>
                    <h4>{selectedChat.name}</h4>
                    <p>{selectedChat.content}</p>
                </div>
            );
        }

        const content = aiResponse || '';
        if (learningFormat === 'bulletPoints') {
            const points = content.split('\n').filter((point) => point.trim() !== '');
            return (
                <ul className="chat-bullet-list">
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            );
        }
        return <p className="chat-paragraph">{content}</p>;
    };

    const selectChat = (chat: SavedChat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-sidebar">
                <div className="sidebar-header">Saved Chats</div>
                <button className="save-chat-button" onClick={handleSaveChat}>
                    Save Chat
                </button>
                <div className="saved-chats-list">
                    {savedChats.length > 0 ? (
                        savedChats.map((chat, index) => (
                            <div
                                key={index}
                                className="saved-chat-item"
                                onClick={() => selectChat(chat)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && selectChat(chat)}
                            >
                                <h4>{chat.name || 'Untitled Chat'}</h4>
                            </div>
                        ))
                    ) : (
                        <p>No saved chats available.</p>
                    )}
                </div>
            </div>
            <div className="chat-container">
                <div className="chat-header">
                    {selectedChat ? `Chat: ${selectedChat.name}` : 'AI Suggested Learning Content'}
                    <button
                        className="exit-icon"
                        onClick={() => navigate('/front')}
                        title="Exit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-log-out"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <div className="chat-content">
                    {renderContent()}
                </div>
                <div className="chat-footer">
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
