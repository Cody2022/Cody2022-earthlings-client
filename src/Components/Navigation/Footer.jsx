import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import { Button } from "@mui/material";
import { fontStyle } from "@mui/system";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <Box>
      <h3 style={{ color: "blue", textAlign: "center", marginTop: "0px" }}>
        I AM HERE: Connecting Newcomers with Volunteers
      </h3>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Who We Are</FooterLink>
            {/* <FooterLink href="/signup">Sign Up</FooterLink> */}
            {/* <FooterLink href="/login">Login</FooterLink> */}
            <Button
              onClick={() => {
                loginWithRedirect();
              }}
              variant="text"
              sx={{ mr: 0, ml: -6, color: "white"}}
              
            >
              Login/SignUp
            </Button>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Transportation</FooterLink>
            <FooterLink href="#">Translation</FooterLink>
            <FooterLink href="#">Accomodation</FooterLink>
            <FooterLink href="#">Employment</FooterLink>
          </Column>
          <Column>
            <Heading>Our Developers</Heading>
            <FooterLink href="https://www.linkedin.com/in/ryancaruthcalgary/">Ryan Caruth</FooterLink>
            <FooterLink href="https://www.linkedin.com/in/sixu-cody-zheng">Cody Zheng</FooterLink>
            <FooterLink href="https://github.com/zia20">Fowzia Hassan</FooterLink>
            <FooterLink href="https://www.linkedin.com/in/edmund-lee-alberta/">Edmund Lee</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.linkedin.com/company/inceptionultd/mycompany/">
              <i className="fab fa-linkedin">
                <span style={{ marginLeft: "10px" }}>Linkedin</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.instagram.com/inceptionu_ltd/">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="https://twitter.com/_InceptionU">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.youtube.com/results?search_query=inceptionU">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
