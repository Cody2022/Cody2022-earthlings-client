import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "tachyons";
import { Provider, Heading, Subhead } from "rebass";
import {
  Hero,
  Flex,
  CallToAction,
  ScrollDownIndicator,
} from "react-landing-page";
// import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//This
function HomePage(props) {
  return (
    <Provider>
      <Hero
        color="white"
        backgroundImage="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_1280.jpg"
        //backgroundImage="https://image.freepik.com/free-vector/colorful-memphis-design-background-vector_53876-81744.jpg"
        //backgroundImage="https://image.freepik.com/free-vector/blue-abstract-acrylic-brush-stroke-textured-background_53876-86373.jpg"
        bg="black"
        bgOpacity={0.5}
      >
        <Subhead fontSize={[3, 6]}>Connecting Newcomers with Volunteers</Subhead>
        <Subhead fontSize={[3, 6]}>I Am Here</Subhead>
        <Flex mt={3}>
          <CallToAction bg="grey" mr={3} href="http://localhost:3000/newcomer">
            Newcomers
          </CallToAction>
          <CallToAction href= "http://localhost:3000/volunteer">Volunteers</CallToAction>
        </Flex>
        <ScrollDownIndicator />
      </Hero>
    </Provider>
  );
}

export default HomePage;
