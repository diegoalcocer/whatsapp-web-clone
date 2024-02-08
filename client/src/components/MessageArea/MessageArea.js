import React from "react";
import './MessageArea.css';
import { useChat } from "../../contexts/ChatContext";

function MessageArea(){
    const {currentChat, messages} = useChat();
        // Log the entire messages object and the messages for the current chat
        const chatMessages = currentChat ? messages[currentChat._id] || [] : [];
    
    return(
        <div className="message-area">
            {chatMessages.map((message)=>(
                <div key={message._id} className="message">
                    <div>{message.senderId}: {message.content}</div>
                </div>
            ))}
        </div>
    );
}
export default MessageArea;