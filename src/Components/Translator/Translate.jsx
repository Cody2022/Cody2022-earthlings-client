import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
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

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(HttpApi) // passes i18n down to react-i18next

  .init({
    // the translations
    // (tip move them in a JSON file and import them,

    fallbackLng: "en",
    detection: {  
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
  },
  backend: {
    loadPath: '/assets/locales//{{lng}}/translations.json',
  },
  react: {useSuspense: false}
  });

function Translate() {
  const { t } = useTranslation();

  return <h2>{t('welcome_to_earthlings')}</h2>;
}

export default Translate;


