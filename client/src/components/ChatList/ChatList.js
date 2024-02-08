import React from 'react';
import './ChatList.css';
import { useChat } from '../../contexts/ChatContext';
import mockUsers from '../MockUsers';

function ChatList(){
    
    const { chats, selectChat } = useChat();
    const currentUser = '65b71e88f3d4f2c72f3cd841'

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
        <div className='chat-list'>
            {
               chats.map((chat) => (
                <div key={chat._id} className='chat-summary' onClick={()=> selectChat(chat._id)}>
                    <div>{getDisplayName(chat)}</div>
                    <div>{chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}</div>
                </div>
                ))
            }
        </div>
    );
}

export default ChatList;