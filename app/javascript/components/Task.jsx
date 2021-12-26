import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import EditTask from "./EditTask";

const Task = () => {
  let navigate = useNavigate();
  
  const currTask = { description: '', deadline: '', timedue: '', priority: '' }; 
  const [task, setTask] = useState(currTask);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const url = `/api/v1/tasks/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(
        (task) => {
          setIsLoaded(true);
          setTask(task);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const deleteTask = () => {
    const url = `/api/v1/tasks/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .then(() => navigate("/"))
      .catch(error => console.log(error.message));
  };

  return (
    <div className="row">
      <SideBar/>
      <div className="d-flex flex-column col">
        <div className="p-5 mb-4 ms-2 me-3 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 f1-bold">
              {task.description}
            </h1>
            <h3>{task.priority}</h3>
            <br/>
            <p>Date: {task.deadline}</p>
            <p>Time: {task.timedue}</p>
            <p>Tags: </p>
            <br/>
            <div className="row">
              <div className="col-md-8">
                <Link to="/" type="button" className="btn btn-secondary">Back to Task List</Link>
              </div>
              <div className="col-md-4">
                <EditTask/>
                <button type="button" className="btn btn-danger" onClick={deleteTask}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;