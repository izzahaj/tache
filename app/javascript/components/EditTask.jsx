import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import TagsInput from "./TagsInput";

const EditTask = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [tag_list, setTagList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };  

  useEffect(() => {
    const url1 = `/api/v1/tasks/${props.taskId}`;
    const url2 = `/api/v1/get_tag_list/${props.taskId}`;
    Promise.all([
      fetch(url1).then(response => response.json()),
      fetch(url2).then(response => response.json())
    ]).then(
      ([{ description, deadline, priority }, tag_list]) => {
        setIsLoaded(true);
        setDescription(description);
        setDeadline(deadline);
        setPriority(priority);
        setTagList(tag_list.map(tag => {
          return tag.name;
        }));
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/tasks/${props.taskId}`;

    const body = {
      description,
      deadline,
      priority,
      tag_list
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          props.reload();
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
    hideModal();
  };

  return (
    <>
      <button onClick={showModal} className={props.buttonStyle}>Edit</button>
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
                <input type="date" className="form-control" id="inputDeadline" onChange={event => setDeadline(event.target.value)} value={deadline === null ? '' : deadline}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPriority" className="col-sm-2 col-form-label">Priority</label>
              <div className="col-sm-10">
                <select className="form-select" id="inputPriority" onChange={event => setPriority(event.target.value)} value={priority}>
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
                <TagsInput tag_list={tag_list} setTaglist={setTagList}/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleUpdate} type="button" className="btn btn-secondary">Update</button>
            <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditTask;
