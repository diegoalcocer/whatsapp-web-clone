import React from "react";
import './MessageArea.css';
import { useChat } from "../../contexts/ChatContext";
import { motion } from 'framer-motion';

function MessageArea(){
    const {currentChat, messages} = useChat();

    const variants = {
        initial: { x: '100vw' },
        in: { x: 0 },
        out: { x: '-100vw' },
    };
        // Log the entire messages object and the messages for the current chat
        const chatMessages = currentChat ? messages[currentChat._id] || [] : [];
    
    return(
        <motion.div className="message-area"
        variants={variants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
      >
            {chatMessages.map((message)=>(
                <div key={message._id} className="message">
                    <div>{message.senderId}: {message.content}</div>
                </div>
            ))}
        </motion.div>
    );
}
export default MessageArea;