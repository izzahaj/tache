import React from "react";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

const Today = () => {
  return (
    <div className="row">
      <SideBar/>
      <TaskList filter={"today"}/>
    </div>
  );
};

export default Today;