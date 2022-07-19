import { Card, Typography } from "@mui/material";
import React from "react";

const AccomData = (props) => {
  const accomInfo = props.accomInfo;

  return (
    <div>
      <Card sx={{ m: 2, p: 2, maxWidth: 500, height: "90%" }}>
        <Typography variant="subtitle2">List ID:{accomInfo.email}</Typography>
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
      </Card>
    </div>
  );
};

export default AccomData;
