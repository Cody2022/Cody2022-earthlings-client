import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const { user } = useAuth0();
    const [conversationList, setConversationList] = useState([]);
    
    let email = user.email

  useEffect(() => {
    const getConversations = async (email) => {
      try {
        const res = await axios.get(`/conversation/${email}`);
        console.log(res);
        setConversationList(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getConversations(email);
  }, [email]);
    

  const convo = JSON.stringify(conversationList);
  console.log(`convo is:${convo}`);

  return (
    <div>
      <h1>This is the official chat messenger page. Coming Soon!!</h1>
      <p>Test render of user conversations:</p>
          <br />
          
          <h1>{convo}</h1>
    </div>
  );
};

export default ChatPage;
