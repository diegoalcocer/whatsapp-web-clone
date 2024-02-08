import React, { createContext, useEffect, useState } from 'react';
import * as apiService from '../services/apiService'

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(()=>{
    const loadChats = async () =>{
      setLoading(true);

      try {
        const response = await apiService.fetchChats();
        console.info('Fetched chats:', response);
        setChats(response);
  
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }finally{
        setLoading(false);
      }
    };

    loadChats();
  },[]);

  
  useEffect(()=>{
    const loadMessages = async()=>{
      console.log("load messages current chat:",{currentChat});
      if (!currentChat) return;
      
      try {        
        const response = await apiService.fetchMessages(currentChat._id);
        console.log(" messages loaded: ",{response});
        setMessages(prevMessages => ({ ...prevMessages, [currentChat._id]: response }));
      } catch (error) {
        
      }
      finally{
        
      }
    };

    loadMessages();
  },[currentChat]);

  // Function to select a chat
  const selectChat = (chatId) => {
    const selectedChat = chats.find(chat => chat._id === chatId);
    
    setCurrentChat(selectedChat);
    // In a real app, here you would fetch messages for the selected chat
  };
  
  const addMessage = async (text, senderId = "65b71e88f3d4f2c72f3cd841") => {
    console.log({text});
    const newMessage = {
      // _id: Date.now().toString(), // Temp ID for frontend; your backend should replace it with a real ObjectId
      chatId: currentChat._id,
      senderId: senderId, // This needs to be a valid ObjectId from your users collection
      content: text,
      type: 'text', // Assuming all new messages are of type 'text'
      timestamp: new Date(), // Current timestamp
      // Omitting readStatus for simplicity; it can be added by the backend or handled separately
    };
    console.log({newMessage});

    // Replace 'sendMessage' with the actual method name and endpoint URL
    const savedMessage = await apiService.sendMessage(newMessage);
  
    // Update the local state; consider this a temporary update until confirmed by the backend
    const chatMessages = messages[currentChat._id] || [];
    setMessages({ ...messages, [currentChat._id]: [...chatMessages, savedMessage] });
  
    // Optionally, update the last message in the current chat
    if (currentChat) {
      const updatedChats = chats.map(chat => 
        chat._id === currentChat._id ? {...chat, lastMessage: savedMessage} : chat);
      setChats(updatedChats);
    }
  };
  


  return (
    <ChatContext.Provider value={{ chats, currentChat, selectChat, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export default ChatProvider;
