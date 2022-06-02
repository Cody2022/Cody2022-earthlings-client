import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Grid, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Grid container>
        <Grid item>
          <img
            src={IAmHereLogo}
            style={{ width: 75, height: 75 }}
            alt="application logo"
          />
        </Grid>
        <Grid>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            I Am <br />
            Here
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
