import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchChats = async () =>{
    return axios.get(`${API_BASE_URL}/chats/65b71e88f3d4f2c72f3cd841`).then(res => res.data);
}

export const fetchMessages = async (chatId) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/messages/${chatId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching messages for chat:", error);
        throw error;
      }
}

export const sendMessage = async (messageData) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
        console.log({response});

        return response.data;
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
}