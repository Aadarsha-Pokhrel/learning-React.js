import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png';

import './ChatMessage.css'


function ChatMessage({message , sender}){

    //destructuring the property  
        return (
            <div className={(sender==='robot')?"chat-message-robot":"chat-message-user"}>
              {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-message-profile" />
            ) }
              <div className="chat-message-text">  
              {message}
              </div> 
              {sender ==='user' && (
                <img src={UserProfileImage} className="chat-message-profile"/>
            )}
            </div>    
        )
    }

export {ChatMessage}