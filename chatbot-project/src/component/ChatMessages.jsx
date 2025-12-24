
import {useRef,useEffect} from 'react';
import {ChatMessage} from './ChatMessage';

import './ChatMessages.css'


 function ChatMessages({chatMessages}){
      //useState returns two arrays one is original and another is modified 
        //array destructuring
      const chatMessagesRef = useRef(null)
        useEffect(()=>{
          const containerElem=chatMessagesRef.current;
          if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        },[chatMessages]);
  
          return (                
          <>
                {
                  chatMessages.length==0 
                   && <div className = "welcome-container">
                      Welcome to the chatbot project! Send a message using the textbox below
                    </div>
                }         
            <div className="chat-messages-container" ref={chatMessagesRef}> 
              {chatMessages.map((chatMessage)=>{
                return (
                  <ChatMessage message={chatMessage.message}
                    sender = {chatMessage.sender}
                    time={chatMessage.time}
                     key={chatMessage.id} />
                )
                })}
              </div>  
          </>
          )
    }

export {ChatMessages}    