import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import images from "../../images/ukraineFlag.jpg"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useTranslation} from "react-i18next";


function HomePage() {
  const wordTyping =  ["Newcomers", "connect", "with", "I Am Here"];
    const [ index, setIndex ] = useState(0);
    const [ blink, setBlink ] = useState(true);
    const [ subIndex, setSubIndex ] = useState(0);
    const [ reverse, setReverse ] = useState(false);

    useEffect(() => {
        if (index === wordTyping.length - 1 && subIndex === wordTyping[index].length) {
          return;
        }
    
        if (
          subIndex === wordTyping[index].length + 1 && 
          index !== wordTyping.length - 1 && 
          !reverse 
        ) {
          setReverse(true);
          return;
        }
    
        if (subIndex === 0 && reverse) {
          setReverse(false);
          setIndex((prev) => prev + 1);
          return;
        }
    
        const timeout = setTimeout(() => {
          setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === wordTyping[index].length ? 1000 :
                    150, parseInt(Math.random() * 350)));
    
        return () => clearTimeout(timeout);
      }, [subIndex, index, reverse]);
    
      // blinker
      useEffect(() => {
        const timeout2 = setTimeout(() => {
          setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
      }, [blink]);
      const click = function(){
          Navigate('/')
      }

  const { t } = useTranslation();
  return (
    <div>
      <Container>
    <Row className='mt-3'>
      <Col className='mt-5 pl-3'>
          <h1>Newcomers Connect with Volunteers</h1>
          <h2>
              {`Hello, and Welcome to ${wordTyping[index].substring(0, subIndex)}${blink ? "|" : ""}`}
          </h2>
          <a href='http://localhost:3000/translateForm'>
          <Button type='button' className='mt-3' variant="outline-success"  size="lg">Translate Form</Button></a>
      </Col>
      <Col>
        <img alt='parks' src={images}/>
      </Col>
    </Row>
  </Container>
          {t("landing_intro")}
    </div>
  );
}

export default HomePage;
