import React from "react";
import { useNavigate } from "react-router";

const DeleteTask = (props) => {
  let navigate = useNavigate();
  const deleteTask = () => {
    const url = `/api/v1/tasks/${props.taskId}`;
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
  }

  return(
    <button onClick={deleteTask} className={props.buttonStyle}>Delete</button>
  );
};

export default DeleteTask;