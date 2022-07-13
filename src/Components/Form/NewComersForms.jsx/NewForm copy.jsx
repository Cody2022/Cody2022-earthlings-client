import React, { useState, setState } from "react";
import FormUserDetails from "./FormUserDetails";

const NewForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLan] = useState("");
  const [contactInfo, setcontactInfo] = useState("");
  const [step] = useState("");

  const state = {
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    language: "",
    contactInfo: "",
  };

  //Proceed to the next step
  const nextStep = () => {
    const { step } = state;
    setState({
      step: step + 1,
    });
  };

  //Go back to previous step
  const prevStep = () => {
    const { step } = state;
    setState({
      step: step - 1,
    });
  };

  //Handle fields change
  const handleChange = (input) => (e) => {
    setState({ [input]: e.target.value });
  };

  const values = { firstName, lastName, email, language, contactInfo };

  switch (step) {
    case 1:
      return (
        <div>Hello NewForm
        <FormUserDetails
          // nextStep={nextStep}
          // handleChange={handleChange}
          // values={values}
        />
        </div>
      );
    case 2:
      return <h1> FormUserDetails</h1>;
    case 3:
      return <h1> Confirm</h1>;
    case 4:
      return <h1> Sucess</h1>;
  }
};

export default NewForm;
