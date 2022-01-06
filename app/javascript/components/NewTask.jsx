import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TagsInput from "./TagsInput";

const NewTask = (props) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [tag_list, setTagList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
    setTagList([]);
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = "/api/v1/tasks";

    const body = {
      description,
      deadline,
      priority,
      tag_list
    }

    fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          props.reloadTasks();
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
    hideModal();
  };

  return (
    <>
      <button onClick={showModal} className="btn btn-secondary text-start my-2">+ Create New Task</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row mb-3">
              <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputDescription" onChange={event => setDescription(event.target.value)} required/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputDeadline" className="col-sm-2 col-form-label">Deadline</label>
              <div className="col-sm-10">
                <input type="date" className="form-control" id="inputDeadline" onChange={event => setDeadline(event.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPriority" className="col-sm-2 col-form-label">Priority</label>
              <div className="col-sm-10">
                <select className="form-select" id="inputPriority" onChange={event => setPriority(event.target.value)}>
                  <option value="">No Priority</option>
                  <option value="Low Priority">Low Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="High Priority">High Priority</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputTags" className="col-sm-2 col-form-label">Tags</label>
              <div className="col-sm-10">
                <TagsInput tag_list={tag_list} setTagList={setTagList} formStyle={"form-control"}/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleSubmit} type="button" className="btn btn-secondary">Create Task</button>
            <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default NewTask;
