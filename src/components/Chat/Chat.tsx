import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatService } from '../../Services/chat.service';
import './Chat.css';
import { SavedChat } from '../../Services/chat.service';
import FormattedText from "../Format/Format";
import Avatar from "../Avatar/Avatar";
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
    const [isNewChat, setIsNewChat] = useState<boolean>(false);
    const chatService = new ChatService();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');
        if (storedUserId) {
            const id = Number(storedUserId);
            setUserId(id);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        if (aiResponse) {
            setIsNewChat(true);
            setSelectedChat(null);
        } else {
            setIsNewChat(false);
        }
    }, [aiResponse]);

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
            await fetchSavedChats();
        } catch (error: any) {
            console.error('Error saving chat:', error.message);
            alert('Failed to save chat.');
        }
    };
    const handleSettings = () =>{
        navigate("/settings");
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

            const sortedChats = mappedChats.sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );

            setSavedChats(sortedChats);

            if (sortedChats.length > 0 && !selectedChat && !isNewChat) {
                setSelectedChat(sortedChats[0]);
            }
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

    const selectChat = (chat: SavedChat) => {
        setSelectedChat(chat);
        setIsNewChat(false);
    };

    const renderContent = () => {
        if (isNewChat) {
            return (
                <FormattedText
                    content={aiResponse}
                    format={learningFormat as 'paragraph' | 'bulletPoints' | 'numbered'}
                />
            );
        }

        if (selectedChat) {
            return (
                <div>
                    <h4>{selectedChat.name}</h4>
                    <FormattedText content={selectedChat.content} />
                </div>
            );
        }

        return <p>Select a chat or create a new one</p>;
    };


    return (
        <div className="chat-wrapper">
            <div className="chat-sidebar">
                <div className="sidebar-header">Saved Chats</div>

                <div className="saved-chats-list">
                    {savedChats.length > 0 ? (
                        savedChats.map((chat, index) => (
                            <div
                                key={index}
                                className={`saved-chat-item ${selectedChat?.name === chat.name ? 'selected' : ''}`}
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
                    {isNewChat ? 'New Chat' : selectedChat ? `Chat: ${selectedChat.name}` : 'Select a Chat'}
<div className="small-nav">
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
                    <Avatar />
</div>
                </div>
                <div className="chat-content">
                    {renderContent()}
                </div>
                <div className="chat-footer">
                    <button className="new-chat-button" onClick={() => navigate('/ChatInput')}>
                        Create Study Plan
                    </button>
                    <button className="save-chat-button" onClick={handleSaveChat}>
                        Save Chat
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
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
                </div>
            )}
        </div>
    );
};

export default Chat;
