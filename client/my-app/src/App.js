import "./App.css";
import io from "socket.io-client";

import { useState } from "react";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:3002");

function App() {
  const [Username, Setusername] = useState("");
  const [Room, Setroom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const JoinRoom = () => {
    if (Username !== "" && Room !== "") {
      socket.emit("join_room", Room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinRoom">
          <h3 className="joinRoom_Header">Join A Chat</h3>
          <input
            className="joinRoom_Inp"
            placeholder="Your Name..."
            type="text"
            onChange={(event) => {
              Setusername(event.target.value);
            }}
          />
          <input
            className="joinRoom_Inp"
            placeholder="ROOM ID"
            type="text"
            onChange={(event) => {
              Setroom(event.target.value);
            }}
          />

          <button className="joinRoom_btn" onClick={JoinRoom}>
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} Username={Username} Room={Room} />
      )}
    </div>
  );
}

export default App;
