import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import Task from "./Task";
import SearchBar from "./SearchBar";
import { Collapse } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../customhooks/hooks"
import { setTasks } from "../reducers/tasksReducer";

const TaskList = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const tasks = useAppSelector((state) => state.tasks.value);
  const searchData = { searchValue: "", priority: "all", sortValue: "deadline", dueDate: "" }
  const [searchInput, setSearchInput] = useState(searchData);
  const [tag_list, setTagList] = useState<string[]>([])
  const dispatch = useAppDispatch();
  
  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }

  const loadTasks = () => {
    const url = `/api/v1/tasks?description=${searchInput.searchValue}&priority=${searchInput.priority}&sort_value=${searchInput.sortValue}&due_date=${searchInput.dueDate}&tag_list=${tag_list}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch task data.");
        }
        return response.json();
      })
      .then(tasks => dispatch(setTasks(tasks)))
      .then(() => console.log("Ok"))
      .catch(error => console.log(error))
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="d-flex flex-column col me-3 ms-1">
      <div className="sticky-top bg-white">
        <div className="hstack mt-2">
          <div>
            <h1>Task List</h1>
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
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              tag_list={tag_list}
              setTagList={setTagList}
              loadTasks={loadTasks}
            />
          </div>
        </Collapse>
        <div className="fs-4 fw-lighter text-center">{tasks.length < 1 ? "No" : tasks.length} tasks found.</div>
        <div className="pt-2 d-grid bg-white">
          <NewTask loadTasks={loadTasks}/>
        </div>
      </div>
      <div className="d-grid">
        <div>
          { tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  loadTasks={loadTasks}
                />
              );
          })}
        </div>
      </div>
    </div>
  )
};

export default TaskList;
