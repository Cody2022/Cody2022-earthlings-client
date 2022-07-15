import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Conversation = ({ conversation, currentUser, isLoading }) => {
  const [user, setUser] = useState("");

  //Get the user
  useEffect(() => {
    const chatMembers = conversation.members.find(
      (member) => member !== currentUser.email
    );

    const getUsersFirstName = async () => {
      try {
        const response = await axios.get("/name?email=" + chatMembers);
        setUser(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUsersFirstName();
  }, [currentUser, conversation, isLoading]);

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <div style={{cursor: 'pointer'}}>
      {user.firstName} {user.lastName} - {user.email}
    </div>
  );
};

export default Conversation