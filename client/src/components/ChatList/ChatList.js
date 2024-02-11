import React from 'react';
import './ChatList.css';
import { useChat } from '../../contexts/ChatContext';
import mockUsers from '../MockUsers';
import { motion } from 'framer-motion';

function ChatList(){
    
    const { chats, selectChat } = useChat();
    const currentUser = '65b71e88f3d4f2c72f3cd841';
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
            // console.log("other part", otherParticipant);
            // chat.participants.forEach(element => {
            //     console.log("participants: ",element);
            // });
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
            {
               chats.map((chat) => (
                <div key={chat._id} className='chat-summary' onClick={()=> selectChat(chat._id)}>
                    <div>{getDisplayName(chat)}</div>
                    <div>{chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}</div>
                </div>
                ))
            }
        </motion.div>
    );
}

export default ChatList;