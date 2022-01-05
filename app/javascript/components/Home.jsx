import React from "react";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div className="row">
      <SideBar/>
      <TaskList filter={"tasks"}/>
    </div>
  );
};

export default Home;
