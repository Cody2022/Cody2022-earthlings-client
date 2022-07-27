import { Box, Card, Paper, Typography } from "@mui/material";
import React from "react";

const AccomData = (props) => {
  const accomInfo = props.accomInfo;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            p: 1.5,
            width: 280,
            height: 300,
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
        </Paper>
      </Box>
    </div>
  );
};

export default AccomData;
