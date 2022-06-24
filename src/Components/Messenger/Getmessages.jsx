import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Getmessages = () => {
  const [conversations, setConversations] = useState([]);
  //Get the user information from Auth0
  const { user } = useAuth0();

  //Fetch all conversations from current user
  useEffect(() => {
    const getConversations = async () => {
      try {
        let response = await fetch(`/conversation/${user.email}`);
        let member = await response.json();
        console.log(`All conversations for this user are:`, member);
        return setConversations(member);
      } catch (err) {
        console.log(err.message);
      }
    };
    getConversations();
  }, [user.email]);

  return <div>Getmessages</div>;
};

export default Getmessages;
