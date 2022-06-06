import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <img
            src={IAmHereLogo}
            style={{ width: 75, height: 75 }}
            alt="application logo"
          />
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            I Am <br />
            Here
          </Typography>
          <Button variant="contained" sx={{ mr: 10 }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
