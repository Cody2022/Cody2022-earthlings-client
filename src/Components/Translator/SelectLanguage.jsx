import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import cookies from "js-cookie";
import i18next from "i18next";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import "flag-icon-css/css/flag-icons.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import PublicIcon from "@mui/icons-material/Public";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ukr",
    name: "Українська",
    country_code: "ua",
  },
];

function LanguageDialog({ onSelect, open }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Select Language</DialogTitle>
      <List sx={{ pt: 0 }}>
        {languages.map(({ code, name }) => (
          <ListItem button onClick={() => onSelect(code)} key={code}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

function SelectLanguage() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const close = useCallback((newCode) => {
    setOpen(false);
    if (newCode) {
      i18next.changeLanguage(newCode);
    }
  }, []);

  useEffect(() => {
    console.log("Setting page stuff");
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <div className="container">
      <div className="language-select">
        <div className="d-flex justify-content-end align-items-center language-select-root">
          <div className="dropdown">
            <IconButton aria-label="delete" onClick={() => setOpen(true)}>
              <PublicIcon />
            </IconButton>
            <LanguageDialog open={open} onSelect={close} />
            {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <a
                    href="#"
                    className={classNames("dropdown-item", {
                      disabled: currentLanguageCode === code,
                    })}
                    onClick={() => {
                      i18next.changeLanguage(code);
                    }}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code} mx-2`}
                      style={{
                        opacity: currentLanguageCode === code ? 0.5 : 1,
                      }}
                    ></span>
                    {name}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectLanguage;
