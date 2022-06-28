import React from 'react'

const ChatRoom = ({chatText, own}) => {
  return (
    <div>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <p>{chatText.message}</p>
      </span>
    </div>
  );
}

export default ChatRoom