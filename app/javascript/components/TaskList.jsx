import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewTask from "./NewTask";
import { useParams } from "react-router";

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

  // if checkbox is ticked, display option to mark as completed
  // add a boolean type column (completed/active) --> if completed, mark as true
  // when marked as completed, task list should filter out the completed tasks
  // add a separate view of all completed tasks on the side bar

  return (
    <div className="d-flex flex-column col me-3 ms-1">
      <div className="row">
        <div className="col-auto">
          <h1 className="mt-2">Hello User!</h1>
        </div>
        <div className="col-auto ms-auto">
          <button className="btn btn-outline-info mt-3">
            Mark as Completed
          </button>
        </div>
      </div>
        <br/>
        <NewTask/>
        {tasks.map(task => (
          <div key={task.id} className="shadow-sm text-start bg-secondary bg-opacity-25 rounded mb-2">
            <div className="row">
              <div className="col-auto">
                <input className="form-check-input ms-2 mt-3" type="checkbox"/>
              </div>
              <div className="col-auto">
                <div><strong>{task.description}</strong></div>
                <small>{task.deadline} {task.timedue}</small>
              </div>
              <div className="col-auto ms-auto me-2">
                <Link to={`tasks/${task.id}`} className="btn btn-sm btn-outline-dark mt-2 mx-1">View</Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
};

export default TaskList;
