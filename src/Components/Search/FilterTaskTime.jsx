import React, { useState } from "react";
import { Button, Container, Modal, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BigCalendar from "../Calendar/BigCalendar";
import SearchTaskSlot from "./SearchTaskSlot";

const FilterTaskTime = () => {
  const [task, setTask] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [isPending, setIsPending] = useState(false);
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      task,
      email,
      startDate,
      endDate,
    };

    setIsPending(true);
    const data = JSON.stringify(newTask);
    try {
      const response = await fetch("/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.status === 200) {
        console.log("Success");
        console.log(`Created new task ${data}`);
        setRefresh((n) => n + 1);
        handleClose();
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }

    navigate("/schedule");
  };

  if (!filtered) {
    return <p className="mx-auto">Loading Data...</p>;
  }
  return (
    <>
      <Container>
        <Row>
          <h1 className="search text-warning text-center">Volunteers near me</h1>
          <div className="search">
            <SearchTaskSlot setSearch={setFiltered} refresh={refresh} />
          </div>
          {filtered.map((userLists, index) => {
            if (index < 8) {
              return <BigCalendar userLists={userLists} />;
            }
          })}
          <Button
            variant="success btn-warning shadow-none"
            onClick={handleShow}
          >
            Translate Form
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Translate Form</Modal.Title>
            </Modal.Header>

            <form className="mx-auto" onSubmit={handleSubmit}>
              <div>
                <label>Task</label>
                <br />
                <input
                  type="text"
                  className="shadow-none"
                  value={task}
                  onChange={(event) => {
                    setTask(event.target.value);
                  }}
                />
              </div>
              <div>
                <label>Info</label>
                <br />
                <input
                  type="text"
                  className="shadow-none"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <label>Start</label>
                <br />
                <input
                  type="text"
                  className="shadow-none"
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </div>
              <div>
                <label>End</label>
                <br />
                <input
                  type="text"
                  className="shadow-none"
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                />
              </div>
              <div>
                <br />
                {!isPending && (
                  <button
                    className="btn btn-lg btn-warning shadow-none"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
                {isPending && (
                  <button
                    className="btn btn-lg btn-warning shadow-none"
                    disabled
                    type="submit"
                  >
                    Request...
                  </button>
                )}
              </div>
            </form>
          </Modal>
        </Row>
      </Container>
    </>
  );
};

export default FilterTaskTime;
