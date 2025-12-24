import {useState} from 'react'
import {Chatbot} from 'supersimpledev'
import LoadingSpinnerGif from '../assets/loadingSpinner.gif'

import './ChatInput.css'

 function ChatInput({chatMessages,setChatMessages}){

  const [inputText,setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);
  }

  async function sendMessage(){
  
  if(inputText==''){
    return;
  }

  const newChatMessages = [
        ...chatMessages,
        {
          message:inputText,
          sender:'user',
          id:crypto.randomUUID()
        }
      ];

      setChatMessages(
      [
        ...newChatMessages,
        {
          message:<img src={LoadingSpinnerGif} className="loading-spinner"/>,
          sender:'robot',
          id:crypto.randomUUID()
        }
      ]
    );

    const response =await Chatbot.getResponseAsync(inputText);
      setChatMessages(
      [
        ...newChatMessages,
        {
          message:response,
          sender:'robot',
          id:crypto.randomUUID()
        }
      ]
    );
    
    setInputText('');
  }

    return (
      <div className="chat-input-container">  
        <input 
            type="text" 
            placeholder= "Send the a message to Chatbot"
            size="30"
            onChange = {saveInputText}
            value = {inputText}
            className="chat-input"
            onKeyDown ={e => {
              if(e.key === 'Enter')
              {
                sendMessage();
              } else if(e.key === 'Escape'){
                  setInputText('');
              }
            }}
        />
        <button 
          onClick={sendMessage}
          className = "send-button"> Send </button>
      </div>  
    )
}

export {ChatInput}
