import React from "react";

const CompletedButton = () => {
  const markCompleted = (taskid) => {
    const url = `/api/v1/tasks/${taskid}`;
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
      //.then(() => navigate("/"))
      .catch(error => console.log(error.message));
    //window.location.reload();
  };
  return (
    <button className="btn btn-outline-info mt-3" onClick={markCompleted}>
      Mark as Completed
    </button>
  );
};

export default CompletedButton;