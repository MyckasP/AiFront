import axios from 'axios';

export interface SavedChat {
    name: string;
    content: string;
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
            throw new Error(error.response?.data || 'Failed to save chat.');
        }
    }

    async getSavedChats(userId: number): Promise<SavedChat[]> {
        try {
            const response = await axios.get<SavedChat[]>(`${this.baseUrl}/getChats/${userId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data || 'Failed to fetch saved chats.');
        }
    }
}
