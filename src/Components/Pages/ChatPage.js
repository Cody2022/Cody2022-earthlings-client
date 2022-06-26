import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const { user, isLoading } = useAuth0();
  const [conversationList, setConversationList] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversation/${user.email}`);
        setConversationList(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (isLoading === false) {
      getConversations();
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>isLoading...</div>;
  };

  return (
    <div>
      <h1>This is the official chat messenger page. Coming Soon!!</h1>
      <p>Test render:</p>
      <br />
      {conversationList.map((conversation) => (
        <div>{user.email}</div>
      ))}
    </div>
  );
};

export default ChatPage;
