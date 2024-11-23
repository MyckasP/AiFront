import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Front from './components/front/front';
import ChatInput from './components/ChatInput/ChatInput';
import Chat from './components/Chat/Chat';

const App: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLogin ? (
                                <Login switchToSignup={() => setIsLogin(false)} />
                            ) : (
                                <Signup switchToLogin={() => setIsLogin(true)} />
                            )
                        }
                    />
                    <Route path="/front" element={<Front />} />
                    <Route path="/chatinput" element={<ChatInput />} />
                    <Route path="/chat" element={<Chat />} /> {/* Add route for Chat component */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
