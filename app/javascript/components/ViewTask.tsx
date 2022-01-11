import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import EditTask from "./EditTask";
import moment from "moment";

const ViewTask = () => {
  let navigate = useNavigate();
 
  const currTask = { description: "", deadline: "", priority: "" };
  const [task, setTask] = useState(currTask);
  const [tag_list, setTagList] = useState<string[]>([]);

  const { id } = useParams();

  const loadTask = () => {
    const url1 = `/api/v1/tasks/${id}`;
    const url2 = `/api/v1/get_tag_list/${id}`;

    Promise.all([
      fetch(url1)
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not fetch task data.");
          }
          return response.json();
        }),
      fetch(url2)
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not fetch tags data.");
          }
          return response.json();
        }),
    ])
    .then(
      ([task, tag_list]) => {
        setTask(task);
        setTagList(tag_list.map((tag: { name: string; }) => tag.name));
        console.log("Ok");
      })
    .catch(error => console.log(error))
  };
  
  useEffect(() => {
    loadTask();
  }, []);

  const deleteTask = () => {
    const url = `/api/v1/tasks/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token.content,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not delete task.");
        } 
        return response.json();
      })
      .then(() => {
        navigate("/");
        console.log("Ok");
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div className="row">
      <SideBar/>
      <div className="d-flex flex-column col">
        <div className="p-5 mb-4 ms-2 me-3 bg-light rounded-3">
          <div className="container-fluid py-5">
            <div className="row display-4 ms-1">
              {task.description}
            </div>
            <div className="row display-6 fw-bold ms-1">
              {task.priority}
            </div>
            <br/>
            <br/>
            <div className="row ms-1">Deadline: {task.deadline === null
              ? ""
              : moment(task.deadline).calendar({
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd, D MMM YYYY',
                  sameElse: 'dddd, D MMM YYYY'
                })}
            </div>
            <br/>
            <div className="row ms-1 hstack">Tags: {tag_list.map(tag => {
              return (
                <div key={tag} className="col-auto py-1 px-2 ms-2 bg-darkblue rounded shadow-sm text-white">
                  {tag}
                </div>
              )
            })}
            </div>
            <br/>
            <div className="row">
              <div className="col-md-8">
                <Link to="/" type="button" className="btn btn-secondary">Back to Task List</Link>
              </div>
              <div className="col ms-auto">
                <EditTask taskId={id} load={loadTask} buttonStyle={"btn btn-secondary mx-1"}/>
                <button type="button" className="btn btn-danger mx-1" onClick={deleteTask}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
