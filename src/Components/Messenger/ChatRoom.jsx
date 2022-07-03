import { Box, Typography } from "@mui/material";
import React from "react";

const ChatRoom = ({ chatText, own }) => {
  return (
    <Box>
      <div>
        <span>{chatText.sender}: </span>
        {own ? (
          <Typography
            variant="p"
            sx={{
              padding: 0.5,
              borderRadius: 20,
              backgroundColor: "#0A4289",
              color: "white",
            }}
          >
            {chatText.message}
          </Typography>
        ) : (
            <Typography
            variant="p"
              sx={{
              padding: 0.5,
              borderRadius: 20,
              backgroundColor: "#c9d3f2",
                color: "black",
            }}
          >
            {chatText.message}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default ChatRoom;
