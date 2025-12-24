import { useState } from 'react';
import { ChatInput } from './component/ChatInput';
import { ChatMessages } from './component/ChatMessages';

import './App.css'

    function App(){
          const [chatMessages,setChatMessages]= useState([]);

      return (
          <>
          <div className = "app-container">

            <ChatMessages 
              chatMessages={chatMessages} />

            <ChatInput 
              chatMessages={chatMessages} 
              setChatMessages={setChatMessages}
            /> 
            </div>  
          </>
      )
    }

export default App
