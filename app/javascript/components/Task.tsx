import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteTask";
import EditTask from "./EditTask";
import moment from "moment";

type Props = {
  task: {
    id: number,
    description: string,
    deadline: string,
    priority: string
  },
  loadTasks: Function
};

const Task = ({ task, loadTasks }: Props) => {
  return (
    <div className="d-grid shadow-sm text-start bg-secondary bg-opacity-25 rounded mb-2 py-1">
      <div className="row hstack">
        <div className="col-auto ms-3">
          <div><strong>{task.description}</strong></div>
          <small className="hstack">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-minus me-2" viewBox="0 0 16 16">
              <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            {task.deadline === null
              ? "--"
              : moment(task.deadline).calendar({
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd, D MMM YYYY',
                  sameElse: 'dddd, D MMM YYYY'
                })
            }
          </small>
        </div>
        <div className="col-auto ms-auto me-2">
          <div className="hstack gap-1">
            <Link to={`tasks/${task.id}`} className="btn btn-sm btn-outline-dark mx-1">View</Link>
            <EditTask taskId={task.id} load={loadTasks} buttonStyle={"btn btn-sm btn-outline-dark mx-1"}/>
            <DeleteButton taskId={task.id} loadTasks={loadTasks} buttonStyle={"btn btn-sm btn-outline-danger mx-1"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;