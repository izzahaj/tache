import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteTask";
import EditTask from "./EditTask";
import moment from "moment";

const Task = (props) => {
  return (
    <div className="d-grid shadow-sm text-start bg-secondary bg-opacity-25 rounded mb-2 py-1">
      <div className="row hstack">
        <div className="col-auto ms-3">
          <div><strong>{props.task.description}</strong></div>
          <small>
            {props.task.deadline === null
              ? ""
              : moment(props.task.deadline).calendar({
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
            <Link to={`tasks/${props.task.id}`} className="btn btn-sm btn-outline-dark mx-1">View</Link>
            <EditTask taskId={props.task.id} reload={props.reloadTasks} buttonStyle={"btn btn-sm btn-outline-dark mx-1"}/>
            <DeleteButton taskId={props.task.id} reloadTasks={props.reloadTasks} buttonStyle={"btn btn-sm btn-outline-danger mx-1"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;