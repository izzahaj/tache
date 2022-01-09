import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import TagsInput from "./TagsInput";

type Props = {
  taskId: number | string | undefined,
  reload: Function,
  buttonStyle: string
};

const EditTask = ({ taskId, reload, buttonStyle }: Props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const taskData = { description: "", deadline: "", priority: "" };
  const [task, setTask] = useState(taskData);
  const [tag_list, setTagList] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };  

  useEffect(() => {
    const url1 = `/api/v1/tasks/${taskId}`;
    const url2 = `/api/v1/get_tag_list/${taskId}`;

    Promise.all([
      fetch(url1)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Could not fetch task data.");
        }),
      fetch(url2)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Could not fetch tags data.");
        }),
    ])
    .then(
      ([task, tag_list]) => {
        setIsLoaded(true);
        setTask(task);
        setTagList(tag_list.map((tag: { name: string; }) => tag.name)); 
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error.message);
      })
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement; 
    setTask({ ...task, [name]: value });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    const url = `/api/v1/tasks/${taskId}`;

    const body = {
      task,
      tag_list
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRF-Token": token.content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    })
      .then(response => {
        if (response.ok) {
          reload();
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
    hideModal();
  };
  return (
    <>
      <button onClick={showModal} className={buttonStyle}>Edit</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        { error && <div>Error: {error}</div> }
        { !isLoaded
          ? <div>Loading task info...</div>
          : <form>
              <Modal.Body>
                <div className="row mb-3">
                  <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" name="description" onChange={handleChange} value={task.description} required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="deadline" className="col-sm-2 col-form-label">Deadline</label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" name="deadline" onChange={handleChange} value={task.deadline === null ? '' : task.deadline}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
                  <div className="col-sm-10">
                    <select className="form-select" name="priority" onChange={handleChange} value={task.priority}>
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
                <button onClick={handleUpdate} type="button" className="btn btn-secondary">Update</button>
                <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
              </Modal.Footer>
            </form>}
      </Modal>
    </>
  );
};

export default EditTask;