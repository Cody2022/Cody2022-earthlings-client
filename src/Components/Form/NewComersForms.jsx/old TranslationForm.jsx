import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import FontAwesomeIcon from "react-fontawesome"

import { translateFormStyles } from "../Styles/Styles";

const TranslationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [choose, setChoose] = useState("");
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComplain = {
      firstName,
      lastName,
      email,
      date,
      choose,
      text,
    };
    setIsPending(true);
    console.log(newComplain);
    const data = JSON.stringify(newComplain);
    try {
      await fetch("/translateRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div>
      <div style={translateFormStyles}>
        <Container fluid>
          <Row>
            <Col>
                <FontAwesomeIcon icon="fab fa-wpforms" />
            </Col>
            <Col>
              <div>
                <h1 className="animate__animated animate__shakeY">
                  We are here to assist you!
                </h1>
                <h5>Please complete the form below</h5>
                <form onSubmit={handleSubmit}>
                  <label>
                    <br />
                    First Name:
                  </label>
                  <br />
                  <input
                    className="rounded text-success"
                    type="text"
                    required
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                  <br />
                  <label>Last Name:</label>
                  <br />
                  <input
                    className="rounded text-success"
                    type="text"
                    required
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                  <br />
                  <label>Email:</label>
                  <br />
                  <input
                    className="rounded text-success"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <br /> <br />
                  <label>Translation Request</label> <br />
                  <input
                    className="rounded"
                    type="datetime-local"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />
                  <br /> <br />
                  <label htmlFor="comments">Choose a type:</label>
                  <br />
                  <select
                    className="rounded mb-3"
                    id="comments"
                    value={choose}
                    onChange={(event) => {
                      setChoose(event.target.value);
                    }}
                  >
                    <option value="Document">Document</option>
                    <option value="Appointment">Appointment</option>
                    <option value="Online Chat">Online Chat</option>
                    <option value="School Appointment">
                      School Appointment
                    </option>
                    <option value="Other">Other</option>
                  </select>
                  <br />
                  <textarea
                    className="rounded"
                    rows="4"
                    cols="50"
                    placeholder="Write your comments"
                    value={text}
                    onChange={(event) => {
                      setText(event.target.value);
                    }}
                  ></textarea>
                  <br />
                  {!isPending && (
                    <Button
                      className="mt-3 shadow-none"
                      variant="outline-success"
                      size="lg"
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
                  {isPending && (
                    <Button
                      className="mt-3 shadow-none"
                      disabled
                      variant="outline-success"
                      size="lg"
                      type="submit"
                    >
                      Submiting...
                    </Button>
                  )}
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TranslationForm;
