import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatRoom from "../Messenger/ChatRoom";
import Conversation from "../Messenger/Conversation";

const ChatPage = () => {
  const { user, isLoading } = useAuth0();
  const [conversationList, setConversationList] = useState([]);
  const [currentChat, setCurrentChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

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
    // eslint-disable-next-line
  }, [isLoading]);

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  console.log(`Current chat is:`, currentChat)

  return (
    <div>
      <h1>This is the official chat messenger page. Coming Soon!!</h1>
      <p>List of conversations:</p>
      <div>
        <input placeholder="Search for friends" />
        {conversationList.map((c) => (
          <div onClick={() => setCurrentChat(c)}>
          <Conversation
            conversation={c}
            currentUser={user}
            isLoading={isLoading}
          />
            </div>
        ))}
      </div>
      <div>
        {
          currentChat ? (
            <div>
              <ChatRoom />
            </div>
          ) : (
            <span style={{display: 'flex', justifyContent: 'center'}}>Open a conversation to start a chat</span>
          )}
      </div>
    </div>
  );
};

export default ChatPage;
