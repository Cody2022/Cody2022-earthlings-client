import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import moment from "moment";

const Testing = () => {
  const date_create = moment().format("DD-MM-YYYY");
  const [usersList, setUserList] = useState([]);
  useEffect(() => {
    const usersList = async () => {
      try {
        // let response = await fetch("/users");
        const response = await fetch("/volunteerusers");
        const usersInfo = await response.json();
        return setUserList(usersInfo);
      } catch (ex) {
        console.log(ex);
      }
    };
    usersList();
  }, []);

  return (
    <div>
      {usersList.map((user) => (
        <Card key={user._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <li> Name: {user.name} </li>
              <li>Email: {user.email}</li>
              <li>Languages: {user.languages.join(", ")}</li>
              <li>Memmber Since: {date_create}</li>
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              aria-label="contacts"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Volunteer Name" primaryTypographyProps={user.name} />
                  <ListItemText primaryTypographyProps={user.name} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText inset primary={user.email} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={user.languages.join(", ")} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={date_create} />
                </ListItemButton>
              </ListItem>
            </List>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse timeout="auto" unmountOnExit>
            {/* <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent> */}
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default Testing;
