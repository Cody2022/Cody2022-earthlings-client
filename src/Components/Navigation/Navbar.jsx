import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <img
          src={IAmHereLogo}
          style={{ width: 75, height: 75 }}
          alt="application logo"
        />
        <Typography variant="h6">
          I Am <br />
          Here
        </Typography>
        <Box
          sx={{
            marginLeft: "1000px",
          }} 
        >
          <Button variant="contained">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
