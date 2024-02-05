import './App.css';
import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import ChatList from './components/ChatList/ChatList';
import MessageArea from './components/MessageArea/MessageArea';
import InputArea from './components/InputArea/InputArea';


function App() {

  return (
    <ChatProvider>
      <div className="app">
        <ChatList />
        <MessageArea />
        <InputArea />
      </div>
    </ChatProvider>
  );
}

export default App;
