import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation} from "react-i18next";
import SelectLanguage from "../Translator/SelectLanguage"
import Header from "./Header";
import { menuButton } from "../Styles/Styles";

const Navbar = () => {
  const { t } = useTranslation();

  const navigate=useNavigate();
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
          <Link to="/">
            <img
              src={IAmHereLogo}
              style={{ width: 75, height: 75 }}
              alt="application logo"
            />
          </Link>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {t("i_am_T")}<span> </span>{t("here_T")}
          </Typography>
          <Header className={menuButton}> 
          </Header>
          <SelectLanguage />
          {!isAuthenticated && (
            <Button
              onClick={() => {
                loginWithRedirect();
              }}
              variant="contained"
              sx={{ mr: 3 }}
            >
              {t("login_T")}
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
                <MenuItem onClick={() => {
                  navigate("/profile")
                  handleClose();
                }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => {
                  navigate("/chat")
                  handleClose();
                }}>Chat Messenger</MenuItem>
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

