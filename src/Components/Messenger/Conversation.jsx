import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Conversation = ({ conversation, currentUser, isLoading }) => {
  console.log(`convo is:`, conversation);
  const [user, setUser] = useState("");

  //Get the user
  useEffect(() => {
    const chatMembers = conversation.members.find(
      (member) => member !== currentUser.email
    );
    console.log("chatMembers are:", chatMembers);

    const getUsersFirstName = async () => {
      try {
        const response = await axios.get("/name?email=" + chatMembers);
        console.log(`response is:`, response);
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

  console.log("user is:", user);

  return (
    <div>
      {user.firstName} {user.lastName} - {user.email}
    </div>
  );
};

export default Conversation