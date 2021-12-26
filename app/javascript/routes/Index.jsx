import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Task from "../components/Task";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/tasks/:id" element={<Task />}/>
    </Routes>
  </Router>
)