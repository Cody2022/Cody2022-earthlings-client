import { Box, Typography } from "@mui/material";
import React from "react";

const ChatRoom = ({ chatText, own }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: own ? "flex-start" : "flex-end",
        width: "90%",
        margin: 2
      }}
    >
      <Box>
        {own ? (
          <Typography
            variant="p"
            sx={{
              padding: 1,
              paddingLeft: 1,
              borderRadius: 20,
              backgroundColor: "#0A4289",
              color: "white",
            }}
          >
            {chatText.sender}: {chatText.message}
          </Typography>
        ) : (
          <Typography
            variant="p"
            sx={{
              padding: 1,
              paddingLeft: 1,
              borderRadius: 20,
              backgroundColor: "#c9d3f2",
              color: "black",
            }}
          >
            {chatText.sender}: {chatText.message}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default ChatRoom;
