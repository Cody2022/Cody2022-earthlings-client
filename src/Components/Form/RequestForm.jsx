import React, { useState } from "react";
import axios from "axios";

const RequestForm = () => {

  const [input, setInput] = useState({
    title: '',
    content: ''
  })
  const handleChange = (event) => {
    //console.log(event.target);
    const {name, value} = event.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(input)
    const newRequest = {
      title:input.title,
      content:input.content
    }
    axios.post('https://localhost:5000/form', newRequest)
  }
  
  return (
    <div className="container">
      <h1>Request Form</h1>
      <form>
        {/* <label for="Tasks">Choose a tasks:</label>

        <select name="tasks" id="task">
          <option value="Translation">Translation</option>
          <option value="Transportion">Transportion</option>
          <option value="Support">Support</option>
          <option value="Accommadation">Accommadation</option>
        </select> */}

        <div className="form-group">
          <h3>Request 1</h3>
          <input
            onChange={handleChange}
            name="title"
            value={input.title}
            autoComplete="off"
            className="form-control"
          ></input>
        </div>

        <div className="form-group">
          <h3>Content 1</h3>
          <textarea
            onChange={handleChange}
            name="content"
            value={input.content}
            autoComplete="off"
            className="form-control"
          ></textarea>
        </div>

        <div>
          <button onClick={handleClick} className="btn btn-lg btn-info">SUMBIT REQUEST</button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
