import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteTask";

const Task = (props) => {
  return (
    <div className="d-grid shadow-sm text-start bg-secondary bg-opacity-25 rounded mb-2 py-1">
      <div className="row hstack gap-2">
        <div className="col-auto">
          <input
            className="form-check-input ms-2"
            type="checkbox"
            value={props.task.id}
            checked={props.checkedBoxes.find((p) => p.id === props.task.id)}
            onChange={(e) => props.toggleCheckbox(e, props.task)}
          />
        </div>
        <div className="col-auto">
          <div><strong>{props.task.description}</strong></div>
          <small>{props.task.deadline} {props.task.timedue}</small>
        </div>
        <div className="col-auto ms-auto me-2">
          <div className="hstack gap-1">
            <Link to={`tasks/${props.task.id}`} className="btn btn-sm btn-outline-dark mx-1">View</Link>
            <button className="btn btn-sm btn-outline-dark mx-1">Edit</button>
            <DeleteButton taskId={props.task.id} reloadTasks={props.reloadTasks}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;