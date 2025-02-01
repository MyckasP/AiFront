import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../Services/apiService';

interface UserResponse {
    username: string;
}

const Avatar: React.FC = () => {
    const [username, setUsername] = useState<string>('U');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setUsername('U');
                setIsLoading(false);
                return;
            }

            try {
                const response = await getUserInfo(parseInt(userId));
                if (response.username) {
                    setUsername(response.username);
                }
            } catch (error) {
                console.error('Failed to fetch username:', error);
                setUsername('U');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsername();
    }, []);

    const getInitials = (name: string) => (name.trim() ? name.charAt(0).toUpperCase() : 'U');

    const avatarStyle = {
        backgroundColor: 'blue',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
    };

    return (
        <div style={avatarStyle}>
            {isLoading ? '...' : getInitials(username)}
        </div>
    );
};

export default Avatar;
