import React from "react";
import './MessageArea.css';
import { useChat } from "../../contexts/ChatContext";

function MessageArea(){
    const {currentChat, messages} = useChat();
    
     // Retrieve messages for the current chat
     const chatMessages = currentChat ? messages[currentChat.id] : [];
    
    return(
        <div className="message-area">
            {chatMessages.map((message)=>(
                <div key={message.id} className="message">
                    <div>{message.sender}: {message.text}</div>
                </div>
            ))}
        </div>
    );
}
export default MessageArea;