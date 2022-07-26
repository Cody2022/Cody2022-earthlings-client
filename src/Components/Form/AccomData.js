import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import {useNavigate } from "react-router-dom";

const AccomData = (props) => {
  const accomInfo = props.accomInfo;
  const navigate=useNavigate();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            p: 1.5,
            width: 260,
            height: 240,
          },
        }}
      >
        <Paper elevation={5}>
          <Typography variant="h6">
            <b>FROM: {accomInfo.email}</b>
          </Typography>
          <Typography>Start Date:{accomInfo.startDate} </Typography>
          <Typography>End Date:{accomInfo.endDate} </Typography>
          <Typography>Number of Rooms:{accomInfo.numberOfRooms} </Typography>
          <Typography>
            Max Number of Tenants:{accomInfo.maxNumTenants}{" "}
          </Typography>
          <Typography>Location:{accomInfo.location} </Typography>
          <Typography>Allow Pets:{accomInfo.allowPets} </Typography>
          <Typography>
            Accommodation Type:{accomInfo.accommodationType}{" "}
          </Typography>
          <Typography>Accessible Home:{accomInfo.accessibleHome} </Typography>
          <Button 
          type="submit"
          color="primary"
          onClick={() => navigate("/chat")}
          >
            Let's Chat
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default AccomData;
