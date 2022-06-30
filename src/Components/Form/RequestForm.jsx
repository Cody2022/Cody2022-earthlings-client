import React from "react";
import bootstrap from "bootstrap";

const RequestForm = () => {
  return (
    <div className="container">
      <h1>Request Form</h1>
      <form>
        <label for="Tasks">Choose a tasks:</label>

        <select name="tasks" id="task">
          <option value="Translation">Translation</option>
          <option value="Transportion">Transportion</option>
          <option value="Support">Support</option>
          <option value="Accommadation">Accommadation</option>
        </select>

        <div className="form-group">
          <h3>Request 1</h3>
          <input className="form-control"></input>
        </div>

        <div className="form-group">
          <h3>Request 1</h3>
          <textarea className="form-control"></textarea>
        </div>

        <div>
          <button className="btn btn-lg btn-info">SUMBIT REQUEST</button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
