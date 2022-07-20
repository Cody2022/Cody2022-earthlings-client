import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Grid, Input, ListItem, Paper, Typography } from "@mui/material";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"
import ChatRoom from "../Messenger/ChatRoom";
import Conversation from "../Messenger/Conversation";

const ChatPage = () => {
  const { user, isLoading } = useAuth0();
  const [conversationList, setConversationList] = useState([]);
  const [currentChat, setCurrentChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef();
  const scrollRef = useRef();
// set socket connection in useEffect in order to not be called every rerender
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  //Update message list if there is any changes in arrival messages
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessageList((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    const grabUser = async () => {
      //send event to server
      socket.current.emit("addUser", user.email)
      //Take event from server
      socket.current.on("getUsers", users => {
        console.log(users)
      })
    }
    if (isLoading === false) {
      grabUser();
    }
  }, [user, isLoading]);

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
  
  //Fetch messages
  useEffect(() => {
    const getMessages = async () => {
        try {
        const response = await axios.get(`/messages/${currentChat._id}`);
        setMessageList(response.data);
        } catch (err) {
        console.log(err.messge);
      }
    }
    getMessages();
  }, [currentChat._id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chatText = {
      sender: user.email,
      message: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member => member !== user.email);
//Send the message
    socket.current.emit("sendMessage", {
      senderId: user.email,
      receiverId,
      message: newMessage,
    });

    try {
      const res = await axios.post('/messages/', chatText);
      setMessageList([...messageList, res.data])
      setNewMessage("");
    } catch (err) {
      console.log(err.message)
    }
  };

  //useEffect that will automatically scroll into view
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messageList])

  if (isLoading) {
    return <div>isLoading...</div>;
  }
  return (
    <Box sx={{
      display: 'flex',
      padding: 1
    }}>
      <Paper elevation={24}>
        <Typography variant="h6" gutterBottom={true} sx={{
          padding: 1
        }}>My Connections</Typography>
        {conversationList.map((c) => (
          <ListItem onClick={() => setCurrentChat(c)}>
            <Conversation
              conversation={c}
              currentUser={user}
              isLoading={isLoading}
            />
          </ListItem>
        ))}
      </Paper>
      <Paper elevation={24} sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 1,
        height: '70vh'
      }}>
          <Box style={{
          flexGrow: 1,
            overflow: 'auto'
        }}>
        {currentChat ? (
          <Grid>
            {messageList.map((m) => (
              <ListItem ref={scrollRef}>
                <ChatRoom chatText={m} own={m.sender === user.email} />
              </ListItem>
            ))}
          </Grid>
        ) : (
            <Typography variant='h5'>
            Open a conversation to start a chat
          </Typography>
            )}
            </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: 'double'}} >
          <Input
            sx={{
              width: '80%',
            }}
          placeholder="Write Something"
          onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
        />
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} sx={{
            borderRadius: 5,
            marginLeft: '20px'
          }}>Send</Button>
          </Box>
      </Paper>
    </Box>
  );
};

export default ChatPage;
