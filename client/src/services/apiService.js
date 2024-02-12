import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchChats = async (userId) => {
  return axios
    .get(`${API_BASE_URL}/chats/${userId}`)
    .then((res) => res.data);
};

export const fetchMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages for chat:", error);
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
    console.log({ response });

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });
    return response.data; // This will include the token and any other login response info
  } catch (error) {
    console.error("Error logging in:", error.response.data);
    throw error.response.data; // You might want to handle this error to show login failure messages
  }
};
