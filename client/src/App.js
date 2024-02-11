import './App.css';
import React from 'react';
import { ChatProvider, useChat } from './contexts/ChatContext';
import ChatList from './components/ChatList/ChatList';
import MessageArea from './components/MessageArea/MessageArea';
import InputArea from './components/InputArea/InputArea';
import { AnimatePresence } from 'framer-motion';
import { MdArrowBack } from 'react-icons/md';

function ChatContainer() {
  const { currentChat, deselectChat } = useChat();

  return (
    <>
      <AnimatePresence>
        {!currentChat ? (
          // ChatList is only shown when there is no currentChat selected
          <ChatList key="chatList" />
        ) : (
          // MessageArea and InputArea are shown when currentChat is selected
          <React.Fragment key="messageArea">
            <button onClick={deselectChat} className="back-button">
              <MdArrowBack /> 
            </button>
            <MessageArea />
            <InputArea />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
function App() {

  return (
    <ChatProvider>
      <div className="app">
        <ChatContainer/>
      </div>
    </ChatProvider>
  );
}

export default App;
