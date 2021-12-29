import React from "react";

const DeleteButton = (props) => {
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
          props.reloadTasks()
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));
  };

  return (
    <button className="btn btn-sm btn-outline-danger mx-1" onClick={deleteTask}>Delete</button>
  );
};

export default DeleteButton;