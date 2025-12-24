import {useState} from 'react'
import {Chatbot} from 'supersimpledev'
import LoadingSpinnerGif from '../assets/loadingSpinner.gif'
import dayjs from 'dayjs'

import './ChatInput.css'

 function ChatInput({chatMessages,setChatMessages}){

  const [inputText,setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);
  }

  function clearChat(){
    setChatMessages([]);
    localStorage.setItem('messages',JSON.stringify([]));
  }

  async function sendMessage(){
  if(inputText==''){
    return;
  }
  const timeNow = dayjs().valueOf();
  const newChatMessages = [
        ...chatMessages,
        {
          message:inputText,
          time: `${dayjs(timeNow).format('h:mma')}`,
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
          time: `${dayjs(timeNow).format('h:mma')}`,
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
       
          <button 
           className="clear-button"
           onClick={clearChat}>Clear Chat</button>
      </div>  
    )
}

export {ChatInput}
