import React, { useEffect, useState } from "react";
import "./App.css";

export default function Chat({ socket, Username, Room }) {
  const [message, setMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setmessageList((list) => [...list, data]);
    });
  }, [socket]);
  const sendmessage = async () => {
    if (message !== "") {
      const MessageData = {
        Room: Room,
        author: Username,
        msg: message,

        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };

      //send_msg was written as send_message
      await socket.emit("send_msg", MessageData);
      setmessageList((list) => [...list, MessageData]);
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Chat Live</div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return <p>{messageContent.msg}</p>;
        })}
      </div>
      <div className="chat-footer">
        <input
          value={message}
          placeholder="hey..."
          type="text"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendmessage();
          }}
        />
        <button onClick={sendmessage}>Sent</button>
      </div>
    </div>
  );
}
