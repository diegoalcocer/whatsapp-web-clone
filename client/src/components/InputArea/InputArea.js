import React, { useState } from 'react';
// import './InputArea.css';
import { useChat } from '../../contexts/ChatContext';
import { IconButton, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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
        <Box component="form" onSubmit={handleFormSubmit}
         sx={{ display: 'flex', alignItems: 'center', 
         padding: '10px', borderTop: '1px solid #ddd', 
         position: 'fixed', bottom: 0, width: '100%', 
         backgroundColor: 'white' }}>
            {/* <IconButton aria-label="emoji">
                <EmojiEmotionsIcon />
            </IconButton>
            <IconButton aria-label="attach file">
                <AttachFileIcon />
            </IconButton> */}
            <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ ml: 1, mr: 3 }}
            InputProps={{
                endAdornment: (
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="send">
                    <SendIcon />
                </IconButton>
                ),
            }}
            />
      </Box>
        // <div className='input-area'>
        //     <form onSubmit={handleFormSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        //         <TextField 
        //             fullWidth 
        //             variant="outlined" 
        //             value={message}
        //             onChange={(e) => setMessage(e.target.value)}
        //             placeholder='Type a message' />
        //         <Button variant="contained" color="primary" type="submit">Send</Button>
        //     </form>
        //     {/* <form onSubmit={handleFormSubmit}>
        //         <input type='text' value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //         placeholder='Type a message'
        //         />
        //         <button type="submit">Send</button>
        //     </form> */}
        // </div>
    );
}

export default InputArea;
