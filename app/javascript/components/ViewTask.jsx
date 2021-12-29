import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import EditTask from "./EditTask";

const ViewTask = () => {
  let navigate = useNavigate();
 
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timedue, setTimedue] = useState("");
  const [priority, setPriority] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  const loadTask = () => {
    const url = `/api/v1/tasks/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(
        ({description, deadline, timedue, priority}) => {
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
      );
  };
  const reloadTask = () => {
    setDescription(description);
    setDeadline(deadline);
    setTimedue(timedue);
    setPriority(priority);
    loadTask();
  };

  useEffect(() => {
    loadTask();
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
          reloadTask();
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
              {description}
            </h1>
            <h3>{priority}</h3>
            <br/>
            <p>Date: {deadline}</p>
            <p>Time: {timedue}</p>
            <p>Tags: </p>
            <br/>
            <div className="row">
              <div className="col-md-8">
                <Link to="/" type="button" className="btn btn-secondary">Back to Task List</Link>
              </div>
              <div className="col-md-4">
                <EditTask reloadTask={reloadTask}/>
                <button type="button" className="btn btn-danger mx-1" onClick={deleteTask}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;