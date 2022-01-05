import React from "react";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

const Tomorrow = () => {
  return (
    <div className="row">
      <SideBar/>
      <TaskList filter={"tomorrow"}/>
    </div>
  );
};

export default Tomorrow;