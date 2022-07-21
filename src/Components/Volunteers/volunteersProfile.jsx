import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VolunteersProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, isLoading } = useAuth0();
  const date_create = moment().format("DD-MM-YYYY");
  const [sinceDate, setsinceDate] = useState();
  const [usersList, setUserList] = useState([]);
  // const [scheduleLists, setScheduleLists] = useState([]);
  // const [titleSchedule, setTitleSchedule] = useState('');
  // const [emailSchedule, setEmailSchedule] = useState('');

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

  if (isLoading || !user || !usersList) {
    return <div>Loading...</div>;
  }
  return (
    <div className="row">
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
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
              <li>Languages: {user.languages.join("\r\n")}</li>
              <li>Member Since: {date_create}</li>
            </Typography>
            <Button onClick={handleOpen}>Bio</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {user.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Hi my name is {user.name} and I am volunteer who speaks the following languages 
            {user.languages.join("\r\n")}. I have been a volunteer member since {date_create}.
          </Typography>
        </Box>
      </Modal>
          </CardContent>     
        </Card>
      ))}
      </Grid>
      </Grid>
      </Paper>
    </div>
  );
};

export default VolunteersProfile;
