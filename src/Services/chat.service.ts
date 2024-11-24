import axios from 'axios';

export interface SavedChat {
    name: string;
    content: string;
    timestamp?: string; // Optional for future display
}

export class ChatService {
    private readonly baseUrl: string = 'https://localhost:7096/api/Chat';

    async saveChat(userId: number, chatContent: string, chatName: string): Promise<string> {
        try {
            const response = await axios.post<{ message: string }>(`${this.baseUrl}/saveChat`, {
                userId,
                chatContent,
                chatName,
            });
            return response.data.message;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response?.data || 'An error occurred while saving the chat.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred.');
        }
    }

    async getSavedChats(userId: number): Promise<SavedChat[]> {
        try {
            const response = await axios.get<SavedChat[]>(`${this.baseUrl}/getChats/${userId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response?.data || 'An error occurred while fetching the saved chats.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred.');
        }
    }
}
