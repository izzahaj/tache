import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewTask from "./NewTask";

const TaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const url = "/api/v1/tasks";
    fetch(url)
      .then(response => response.json())
      .then(
        (task) => {
          setIsLoaded(true);
          setTasks(task);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  return (
    <div className="d-flex flex-column col">
      <h1 className="mt-2">Hello User!</h1>
      <br/>
      <NewTask/>
      {tasks.map(task => (
        <div key={task.id} className="shadow-sm text-start bg-secondary bg-opacity-25 rounded me-3 ms-1 mb-2">
          <div className="row">
            <div className="col-auto">
              <input className="form-check-input ms-2 mt-3" type={"checkbox"}/>
            </div>
            <div className="col-auto">
              <div><strong>{task.description}</strong></div>
              <small>{task.deadline} {task.timedue}</small>
            </div>
            <div className="col-auto ms-auto me-2">
              <Link to={`tasks/${task.id}`} className="btn btn-sm btn-outline-dark mt-2">View</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default TaskList;
