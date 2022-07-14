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
      <Typography sx={{ pl: 0 , paddingTop:0 , paddingBottom:0, marginBottom:1 }}>Languages:</Typography>
      <ul>
        {transportInfo.languages.map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <Typography>Accessories:</Typography>
      <ul>
        {transportInfo.accessories.map((accessory, index) => {
          return <li key={index}>{accessory}</li>;
        })}
      </ul>
      {/* <List
        sx={{ width: "100%", maxWidth: 330, bgcolor: "background.paper" }}
        component="nav"
      >
        <ListItemButton sx={{ pl: 0 , paddingTop:0 , paddingBottom:0 }}onClick={handleClick}>
          <ListItemText sx={{display:"flex"}} primary="Languages:" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
         { transportInfo.languages.map((language, index) => {
          return <ListItemText sx={{ pl: 4, }} key={index}>{language}</ListItemText>;
        })}
        </Collapse>
      </List>

      <List
        sx={{ width: "100%", maxWidth: 330, bgcolor: "background.paper" }}
        component="nav"
      >
        <ListItemButton sx={{ pl: 0 , paddingTop:0 , paddingBottom:0 }}onClick={handleClick}>
          <ListItemText sx={{display:"flex"}} primary="Languages:" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
         { transportInfo.languages.map((language, index) => {
          return <ListItemText sx={{ pl: 4, }} key={index}>{language}</ListItemText>;
        })}
        </Collapse>
      </List> */}
      <Button sx={{ color: "blue" }}>About the volunteer</Button>
    </Card>
  );
};

export default TransportationData;
