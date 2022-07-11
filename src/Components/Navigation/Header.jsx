import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button} from "@mui/material";

function Header() {
  return (
    <>
    <header className='header'>
        <div>
        <Link className='links' color="white" to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link className='links' color="white" to="/newcomer">
            <Button color="inherit">Newcomer</Button>
          </Link>
          <Link className='links' color="white" to="/Volunteer">
            <Button color="inherit">Volunteer</Button>
          </Link>
          <Link className='links' color="white" to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link className='links' color="white" to="/chat">
            <Button color="inherit">Chat</Button>
          </Link>
          <Link className='links' color="white" to="/admin">
            <Button color="inherit">Admin</Button>
          </Link>
        </div>
    </header>
    
    </>
  )
}

export default Header