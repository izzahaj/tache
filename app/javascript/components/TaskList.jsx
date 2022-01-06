import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import Task from "./Task";
import SearchBar from "./SearchBar";
import { Collapse } from "react-bootstrap";

const TaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }

  const loadTasks = () => {
    const url = `/api/v1/tasks`;
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
  }

  const reloadTasks = () => {
    setTasks([]);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="d-flex flex-column col me-3 ms-1">
      <div className="sticky-top bg-white">
        <div className="hstack mt-2">
          <div>
            <h1>Hello User!</h1>
          </div>
          <div className="ms-auto">
            <button
              className="btn btn-dark"
              onClick={handleSearchBar}
              aria-controls="searchBar"
              aria-expanded={showSearchBar}
            >
              {showSearchBar ? "Hide Search Bar" : "Show Search Bar"}
            </button>
          </div>
        </div>
        <Collapse in={showSearchBar}>
          <div id="searchBar">
            <SearchBar tasks={tasks} setTasks={setTasks}/>
          </div>
        </Collapse>
        {tasks.length < 1 ? null : <div className="fs-4 fw-lighter text-center">{tasks.length} tasks found.</div>}
        <div className="pt-2 d-grid bg-white">
          <NewTask reloadTasks={reloadTasks}/>
        </div>
      </div>
      <div className="d-grid">
        <div>
          {tasks.length < 1
            ? <div className="fs-4 fw-lighter text-center">No tasks found.</div>
            : tasks.map(task => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    reloadTasks={reloadTasks}
                  />
                );
          })}
        </div>
      </div>
    </div>
  )
};

export default TaskList;
