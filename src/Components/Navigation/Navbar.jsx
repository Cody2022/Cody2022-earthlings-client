import React from "react";
import AppBar from "@mui/material/AppBar";
import IAmHereLogo from "../../images/i-am-here-logo.png";
import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation} from "react-i18next";


const Navbar = () => {
  const { t } = useTranslation();
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
          {t('i_am_T')} <br />
          {t('here_T')}
          </Typography>
          {/* <Button variant="contained" sx={{ mr: 10 }}>LOGIN</Button> */}
          <Button variant="contained" sx={{ mr: 10 }}>{t('login_T')}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
