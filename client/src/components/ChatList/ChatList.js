import React from 'react';
import './ChatList.css';
import { useChat } from '../../contexts/ChatContext';

function ChatList(){
    //Chat Data
    // const chats = [{id:1, name:"Frodo", lastMessage:"Hey, wanna go for an adventure?"}]
    const { chats, selectChat } = useChat();

    return (
        <div className='chat-list'>
            {
               chats.map((chat) => (
                <div key={chat.id} className='chat-summary' onClick={()=> selectChat(chat.id)}>
                    <div>{chat.name}</div>
                    <div>{chat.lastMessage}</div>
                </div>
                ))
            }
        </div>
    );
}

export default ChatList;