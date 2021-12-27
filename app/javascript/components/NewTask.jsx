import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import TagsInput from "./TagsInput";

const NewTask = () => {
  let navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [timedue, setTimedue] = useState('');
  const [priority, setPriority] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "/api/v1/tasks";

    const body = {
      description,
      deadline,
      timedue,
      priority
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .then(() => navigate(`/`))
      .catch(error => console.log(error.message));
  };

  return (
    <>
      <button onClick={showModal} className="sticky-top d-grid btn btn-secondary text-start me-3 ms-1 mb-2">+ Create New Task</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row mb-3">
              <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputDescription" onChange={event => setDescription(event.target.value)} value={description} required/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputDeadline" className="col-sm-2 col-form-label">Deadline</label>
              <div className="col-sm-10">
                <input type="date" className="form-control" id="inputDeadline" onChange={event => setDeadline(event.target.value)} value={deadline}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputTimedue" className="col-sm-2 col-form-label">Time</label>
              <div className="col-sm-10">
                <input type="time" className="form-control" id="inputTimedue" onChange={event => setTimedue(event.target.value)} value={timedue}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPriority" className="col-sm-2 col-form-label">Priority</label>
              <div className="col-sm-10">
                <select className="form-select" id="inputPriority" onChange={event => setPriority(event.target.value)} value={priority}>
                  <option value="No Priority">No Priority</option>
                  <option value="Low Priority">Low Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="High Priority">High Priority</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputTags" className="col-sm-2 col-form-label">Tags</label>
              <div className="col-sm-10">
                <TagsInput/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleSubmit} type="submit" className="btn btn-secondary">Create Task</button>
            <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default NewTask;
