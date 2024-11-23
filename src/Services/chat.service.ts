import axios from "axios";

export class ChatService {
    private readonly baseUrl: string = "https://localhost:7096/api/Chat";

    async saveChat(userId: number, chatContent: string): Promise<string> {
        try {
            const response = await axios.post<{ message: string }>(`${this.baseUrl}/saveChat`, { userId, chatContent });
            return response.data.message; // Assuming the backend returns { message: "Chat saved successfully." }
        } catch (error: any) {
            throw new Error(error.response?.data || "Failed to save chat.");
        }
    }

    async getSavedChats(userId: number): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${this.baseUrl}/getChats/${userId}`);
            return response.data; // Assuming the backend returns an array of chat strings
        } catch (error: any) {
            throw new Error(error.response?.data || "Failed to fetch saved chats.");
        }
    }
}
