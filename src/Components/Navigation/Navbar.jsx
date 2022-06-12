import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <img
            src={IAmHereLogo}
            style={{ width: 75, height: 75 }}
            alt="application logo"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            I Am <br />
            Here
          </Typography>

          {!isAuthenticated && (
            <Button
              onClick={() => {
                loginWithRedirect();
              }}
              variant="contained"
              sx={{ mr: 3 }}
            >
              Login
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Button
                variant="contained"
                sx={{ mr: 3 }}
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {user.name}
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => logoutWithRedirect()}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
