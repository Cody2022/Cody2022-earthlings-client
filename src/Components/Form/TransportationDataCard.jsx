import React from "react";
import { Button, Card, Collapse, Link, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const TransportationData = (props) => {
  const transportInfo = props.transportInfo;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <Card sx={{pl:1, margin:1, height: "100%", minWidth: 330 }}>
      <Typography variant="h5">
        {new Date(transportInfo.date).toDateString()}
      </Typography>
      <Typography >{transportInfo.email}</Typography>
      <Typography>
        Start Time:{" "}
        {new Date(transportInfo.startTime).toLocaleString("en-US", {
          hour12: false,
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography>
        End Time:{" "}
        {new Date(transportInfo.endTime).toLocaleString("en-US", {
          hour12: false,
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography >Languages:</Typography>
      <ul style={{marginTop:4, marginBottom:4}}>
        {transportInfo.languages.map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <Typography>Accessories:</Typography>
      <ul style={{marginTop:4, marginBottom:4}}>
        {transportInfo.accessories.map((accessory, index) => {
          return <li key={index}>{accessory}</li>;
        })}
      </ul>
      <Button sx={{ color: "blue" }}>About the volunteer(Will link the volunteer profile later)</Button>
    </Card>
  );
};

export default TransportationData;
