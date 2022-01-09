import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TagsInput from "./TagsInput";

type Props = {
  reloadTasks: Function
};

const NewTask = ({ reloadTasks }: Props) => {
  const taskData = { description: "", deadline: "", priority: "" };
  const [task, setTask] = useState(taskData);
  const [tag_list, setTagList] = useState<string[]>([]);
 
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setTagList([]);
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement; 
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    const url = "/api/v1/tasks";

    const body = {
      task,
      tag_list
    }

    fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRF-Token": token.content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          reloadTasks();
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
    hideModal();
  };

  return (
    <>
      <button onClick={showModal} className="btn btn-secondary text-start my-2 hstack">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
        </svg>
        Create New Task
      </button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="description" onChange={handleChange} required/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="deadline" className="col-sm-2 col-form-label">Deadline</label>
              <div className="col-sm-10">
                <input type="date" className="form-control" name="deadline" onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
              <div className="col-sm-10">
                <select className="form-select" name="priority" onChange={handleChange}>
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
                <TagsInput tag_list={tag_list} setTagList={setTagList} />
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
