import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import Task from "./Task";

const TaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const toggleCheckbox = (e, item) => {
    if (e.target.checked) {
      let arr = checkedBoxes;
      arr.push(item.id);

      setCheckedBoxes(arr);
    } else {
      let items = checkedBoxes.splice(checkedBoxes.indexOf(item.id), 1);
      setCheckedBoxes(items);
    }
    console.log(checkedBoxes);
  };

  const loadTasks = () => {
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
  }

  const reloadTasks = () => {
    setTasks([]);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
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
        <div className="d-grid">
          <NewTask reloadTasks={reloadTasks}/>
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                toggleCheckbox={toggleCheckbox}
                checkedBoxes={checkedBoxes}
                reloadTasks={reloadTasks}
              />
            );
          })}
        </div>
    </div>
  )
};

export default TaskList;
