import React from "react";
// import './MessageArea.css';
import { useChat } from "../../contexts/ChatContext";
import { motion } from 'framer-motion';
import { Box, Paper, Typography } from '@mui/material';
import mockUsers from '../MockUsers'

function MessageArea(){
    const {currentChat, messages, currentUser} = useChat();

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
             <Box sx={{ maxHeight: 'calc(100vh - 235px)', overflowY: 'auto',
             padding: '8px',
             display: 'flex',
             flexDirection: 'column',
             gap: '10px'
             }}> {/* Adjust these values based on your AppBar and InputArea height */}
                {chatMessages.map((message) => (
                <Paper
                    key={message._id}
                    elevation={1}
                    sx={{
                        maxWidth: '70%',
                        padding: '8px 12px',
                        margin: message.senderId === currentUser ? '0 0 0 auto' : '0 auto 0 0',
                        backgroundColor: message.senderId === currentUser ? '#29a376' : '#797979',
                    }}
                > 
                
                <Typography variant="caption" display="block" gutterBottom sx={{color:"white", fontWeight:"600"}}>
                    {message.senderId === currentUser ? 'You' : mockUsers[message.senderId]} 
                </Typography>
                <Typography variant="body2" color="text.primary" gutterBottom sx={{color:"white"}}>
                    {message.content}
                </Typography>


                    {/* <Typography color="text.white" variant="body2">{mockUsers[message.senderId]}: {message.content}</Typography> */}
                </Paper>
                ))}
            </Box>
        </motion.div>
    );
}
export default MessageArea;