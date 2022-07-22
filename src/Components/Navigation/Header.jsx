import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button} from "@mui/material";

function Header(props) {
  const userData = props.userData
  return (
    <>
    <header className='header'>
        <div>
        <Link className='links' fontSize="28px" to="/">
            <Button color="inherit">Home</Button>
          </Link>
          {userData && userData.isNewcomer && <Link className='links' color="white" to="/newcomer">
            <Button color="inherit">Newcomer</Button>
          </Link>}
          {userData && userData.isVolunteer && <Link className='links' color="white" to="/Volunteer">
            <Button color="inherit">Volunteer</Button>
          </Link>}
          <Link className='links' color="white" to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link className='links' fontSize="28px" to="/chat">
            <Button color="inherit">Chat</Button>
          </Link>
          <Link className='links' fontSize="28px" to="/admin">
            <Button color="inherit">Admin</Button>
          </Link>
        </div>
    </header>
    
    </>
  )
}

export default Header