import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import EditTask from "./EditTask";
import moment from "moment";

const ViewTask = () => {
  let navigate = useNavigate();
 
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
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
            <p>Deadline: {deadline === null
              ? ""
              : moment(deadline).calendar({
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd, D MMM YYYY',
                  sameElse: 'dddd, D MMM YYYY'
                })}
            </p>
            <p>Tags: </p>
            <br/>
            <div className="row">
              <div className="col-md-8">
                <Link to="/" type="button" className="btn btn-secondary">Back to Task List</Link>
              </div>
              <div className="col-md-4">
                <EditTask taskId={id} reload={reloadTask} buttonStyle={"btn btn-secondary mx-1"}/>
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
