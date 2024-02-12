import React from 'react';
import './ChatList.css';
import { useChat } from '../../contexts/ChatContext';
import mockUsers from '../MockUsers';
import { motion } from 'framer-motion';
import {List, ListItemButton, ListItemText, ListItemAvatar, Avatar} from '@mui/material'

function ChatList(){
    
    const { chats, selectChat } = useChat();
    const currentUser = localStorage.getItem('userId');
    const variants = {
        initial: { x: '100vw' },
        in: { x: 0 },
        out: { x: '-100vw' },
    };

    // Function to get the display name for individual chats
    const getDisplayName = (chat) => {
        if (chat.chatType === 'group') {
            return chat.name; // For group chats, use the name directly
        } else {
            // For individual chats, find the other participant's name
            const otherParticipant = chat.participants.find(p => p !== currentUser);
            return otherParticipant ? mockUsers[otherParticipant] : 'Unknown';
        }
    };

    return (
        <motion.div className='chat-list'
        variants={variants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
        >
            <List>
                {chats.map((chat) => (
                    <ListItemButton key={chat._id} onClick={() => selectChat(chat._id)}>
                        <ListItemAvatar>
                            <Avatar>U</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={getDisplayName(chat)} secondary={chat.lastMessage ? chat.lastMessage.content : 'No messages yet'} />
                    </ListItemButton>
                ))}
            </List>
            {/* {
               chats.map((chat) => (
                <div key={chat._id} className='chat-summary' onClick={()=> selectChat(chat._id)}>
                    <div>{getDisplayName(chat)}</div>
                    <div>{chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}</div>
                </div>
                ))
            } */}
        </motion.div>
    );
}

export default ChatList;