import './App.css';
import React, { useState, useEffect } from 'react';
import { ChatProvider, useChat } from './contexts/ChatContext';
import ChatList from './components/ChatList/ChatList';
import MessageArea from './components/MessageArea/MessageArea';
import InputArea from './components/InputArea/InputArea';
import { AnimatePresence } from 'framer-motion';
import { Box, IconButton} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // Importing MUI back icon
import Login from './components/Login/Login'

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
            <IconButton 
             onClick={deselectChat}
             sx={{margin:1}}
             variant="contained"
             >
              <ArrowBackIosNewIcon/>
             </IconButton>
            <MessageArea />
            <InputArea />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage to set the authenticated state
    const currentUser = localStorage.getItem('userId');
    console.log("current user:",{currentUser});    
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token&&!!currentUser);
  }, []);

  const handleLoginSuccess = () => {    
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the stored token
    setIsAuthenticated(false); // Update state to reflect that the user is logged out
  };


  return (
    <div>
      {isAuthenticated ? (
        // If authenticated, render the main chat component
        <ChatProvider>
          <Box sx={{ flexGrow: 1 }}>
            <ChatContainer />
          </Box>
        </ChatProvider>
      ) : (      
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
  </div>
    // <ChatProvider>
    //   <Box sx={{ flexGrow: 1 }}>
    //     <ChatContainer />
    //   </Box>
    // </ChatProvider>
  );
}

export default App;
