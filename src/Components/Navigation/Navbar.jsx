import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Button, Grid, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        {/* <Grid container> */}
        {/* <Grid item> */}
        <img
          src={IAmHereLogo}
          style={{ width: 75, height: 75 }}
          alt="application logo"
        />
        {/* </Grid> */}
        {/* <Grid item> */}
        <Typography variant="h6">
          I Am <br />
          Here
        </Typography>
        {/* </Grid> */}
        {/* <Grid item mt={2}> */}
          <Button variant="contained">Login</Button>
        {/* </Grid> */}
        {/* </Grid> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
