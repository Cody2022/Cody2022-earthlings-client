import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Col, Container, Row } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";


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

  return  <Container>
  <Row>
    <Col>
    <h1>{t("welcome_to_earthlings")}</h1>;
    </Col>
  </Row>
</Container>
}

export default Translate;


