import React from 'react'
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from '../../images/i-am-here-logo.png'

const Navbar = () => {
  return (
      <AppBar position='sticky'>
          <img src={IAmHereLogo} width={75} height={75} alt="application logo" />
      </AppBar>
  )
}

export default Navbar