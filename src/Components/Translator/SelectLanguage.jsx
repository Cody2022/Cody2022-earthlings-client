import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import cookies from 'js-cookie';
import i18next from 'i18next';
import classNames from 'classnames';
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import "flag-icon-css/css/flag-icons.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ukr',
    name: 'україни',
    country_code: 'ua',
  },
]

function SelectLanguage(){
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
  
    useEffect(() => {
      console.log('Setting page stuff')
      document.body.dir = currentLanguage.dir || 'ltr'
      document.title = t('app_title')
    }, [currentLanguage, t])

    return (
        <div className="container">
          <div className="language-select">
            <div className="d-flex justify-content-end align-items-center language-select-root">
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <LanguageIcon />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {languages.map(({ code, name, country_code }) => (
                    <li key={country_code}>
                      <a
                        href="#"
                        className={classNames('dropdown-item', {
                          disabled: currentLanguageCode === code,
                        })}
                        onClick={() => {
                          i18next.changeLanguage(code)
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
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SelectLanguage;
