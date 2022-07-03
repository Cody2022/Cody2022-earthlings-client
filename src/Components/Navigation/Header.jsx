import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <>
    <header className='header'>
        <div>
        <Link component={useNavigate} color="white" underline="none" to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link component={useNavigate} color="white" underline="none" to="/newcomer">
            <Button color="inherit">Newcomer</Button>
          </Link>
          <Link component={useNavigate} color="white" underline="none" to="/Volunteer">
            <Button color="inherit">Volunteer</Button>
          </Link>
          <Link component={useNavigate} color="white" underline="none" to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link component={useNavigate} color="white" underline="none" to="/chat">
            <Button color="inherit">Chat</Button>
          </Link>
          <Link component={useNavigate} color="white" underline="none" to="/admin">
            <Button color="inherit">Admin</Button>
          </Link>
        </div>
    </header>
    
    </>
  )
}

export default Header