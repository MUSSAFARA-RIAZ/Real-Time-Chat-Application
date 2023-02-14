import React, { useEffect, useState } from 'react';
import './App.css';

export default function Chat({socket,Username,Room}) {
  const [message,setMessage]=useState("");
 // const [messageList,setmessageList]=useState([]);

  const sendmessage= async ()=>{
    if(message!==""){
      const MessageData={
        Room:Room,
        author:Username,
        msg:message,
        
        time: new Date(Date.now()).getHours() + ":" +
        new Date(Date.now()).getMinutes() + ":" +   new Date(Date.now()).getSeconds(),


      }
      await socket.emit("send_msg",MessageData);
     // setmessageList((list)=>[...list,MessageData]);


    }
  };
 
  
  // useEffect(()=>{
  //   socket.on("receive_msg",(data)=>{
  //     console.log(data);

  //     //setmessageList((list)=>[...list,data])  

  //   });

  // },[socket]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
     console.log(data);
     
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>Chat Live</div>
      <div className='chat-body'>

      
      </div>
      <div className='chat-footer'>
        <input placeholder='hey...' type="text" 
        onChange={(event)=>{
          setMessage(event.target.value);

        }}
        
        
        
        />
        <button onClick={sendmessage}>Sent</button>
      </div>
    </div>
  )
}
