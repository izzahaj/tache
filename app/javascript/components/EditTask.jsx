import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
import TagsInput from "./TagsInput";

const EditTask = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timedue, setTimedue] = useState("");
  const [priority, setPriority] = useState("");
  
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };  

  useEffect(() => {
    const url = `/api/v1/tasks/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(
        ( { description, deadline, timedue, priority }) => {
          setIsLoaded(true);
          setDescription(description);
          setDeadline(deadline);
          setTimedue(timedue);
          setPriority(priority);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const handleUpdate = (e) => {
    // confirmation
    e.preventDefault();

    const url = `/api/v1/tasks/${id}`;

    const body = {
      description,
      deadline,
      timedue,
      priority
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          props.reloadTask();
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
    hideModal();
    // insert alert "Task edited successfully!"
  };

  return (
    <>
      <button onClick={showModal} className="btn btn-secondary mx-1">Edit</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
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
                <input type="time" className="form-control" id="inputTimdue" onChange={event => setTimedue(event.target.value)} value={timedue}/>
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
            <button onClick={handleUpdate} type="submit" className="btn btn-secondary">Update</button>
            <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditTask;
