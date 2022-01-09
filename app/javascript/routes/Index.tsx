import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ViewTask from "../components/ViewTask";
import TagList from "../components/TagList";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/tasks/:id" element={<ViewTask />}/>
      <Route path="/tags" element={<TagList />}/>
    </Routes>
  </Router>
)