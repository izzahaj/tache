import React from "react";

const DeleteButton = (props) => {
  const deleteItem = () => {
    const url = `/api/v1/tasks/${props.taskId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
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
    <button className="btn btn-sm btn-outline-danger mx-1" onClick={deleteItem}>Delete</button>
  );
};

export default DeleteButton;