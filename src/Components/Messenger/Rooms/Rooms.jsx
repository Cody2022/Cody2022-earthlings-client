import { useState } from "react";
import io from "socket.io-client";
import Chat from "../Chat/Chat";

const socket = io.connect("http://localhost:5000");

const Rooms = () => {
  const [username, setUserName] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join-room", room);
      setShowChat(true);
    }
  };

  if (!socket) {
    return <p>...loading</p>;
  }

  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="RoomID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Rooms;
