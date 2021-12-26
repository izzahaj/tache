import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

export default () => (
  <div className="row">
    <SideBar/>
    <TaskList/>
  </div>
);

