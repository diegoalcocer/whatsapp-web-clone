import React, { createContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Initial chats data
  const [chats, setChats] = useState([
    {id:1, name:"Frodo", lastMessage:"next week?"},
    {id:2, name:"Saruman", lastMessage:"I know nothing"}
]);
  const [currentChat, setCurrentChat] = useState(null);
  
  // Placeholder for messages data
  const [messages, setMessages] = useState({
    1:[{id: 1, text: "Hey, wanna go for an adventure?", sender: "Frodo"},{id: 2, text: "next week?", sender: "Frodo"}],
    2:[{id: 3, text: "what do you know?", sender: "You"},{id: 4, text: "I know nothing?", sender: "Saruman"}]
});

  // Function to select a chat
  const selectChat = (chatId) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    setCurrentChat(selectedChat);
    // In a real app, here you would fetch messages for the selected chat
  };

  // Function to add a new message
  const addMessage = (text, sender = "You") => {
    const newMessage = { id: Date.now(), text, sender };
    const chatMessages = messages[currentChat.id] || [];
    setMessages({ ...messages, [currentChat.id]: [...chatMessages, newMessage] });

    // Update last message in the current chat
    if(currentChat) {
      const updatedChats = chats.map(chat => 
        chat.id === currentChat.id ? {...chat, lastMessage: text} : chat);
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
