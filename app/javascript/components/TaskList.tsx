import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import Task from "./Task";
import SearchBar from "./SearchBar";
import { Collapse } from "react-bootstrap";

interface TasksData {
  id: number,
  description: string,
  deadline: string,
  priority: string
}

const TaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState<TasksData[]>([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }

  const loadTasks = () => {
    const url = `/api/v1/tasks`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not fetch task data.");
      })
      .then(
        (tasks) => {
          setIsLoaded(true);
          setTasks(tasks);
        },
        (error) => {
          setIsLoaded(true);
          setError(error.message);
        })
  };

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
            <SearchBar setTasks={setTasks}/>
          </div>
        </Collapse>
        <div className="fs-4 fw-lighter text-center">{tasks.length < 1 ? "No" : tasks.length} tasks found.</div>
        <div className="pt-2 d-grid bg-white">
          <NewTask reloadTasks={reloadTasks}/>
        </div>
      </div>
      <div className="d-grid">
        <div>
          { error && <div className="fs-4 fw-lighter text-center">Error: {error}</div> }
          { !isLoaded
            ? <div className="fs-4 fw-lighter text-center">Loading tasks...</div>
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
