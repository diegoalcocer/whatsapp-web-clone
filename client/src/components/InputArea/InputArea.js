import React, { useState } from 'react';
import './InputArea.css';
import { useChat } from '../../contexts/ChatContext';

function InputArea() {
    const [message, setMessage] = useState("");
    const { addMessage, currentChat } = useChat(); // Assuming useChat exposes addMessage and currentChat

    const sendMessage = () => {
        if (!message.trim() || !currentChat) return; // Don't send empty messages or if no chat is selected
        
        // Call addMessage from your context, assuming the sender ID is handled within the context or via another prop/session
        addMessage(message);

        setMessage(""); // Clear the input after sending
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the form from causing a page reload
        sendMessage();
    };

    return (
        <div className='input-area'>
            <form onSubmit={handleFormSubmit}>
                <input type='text' value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type a message'
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default InputArea;
