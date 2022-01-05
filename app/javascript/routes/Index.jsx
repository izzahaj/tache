import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ViewTask from "../components/ViewTask";
import Today from "../components/Today";
import Tomorrow from "../components/Tomorrow";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/tasks/:id" element={<ViewTask />}/>
      <Route path="/today" element={<Today />}/>
      <Route path="/tomorrow" element={<Tomorrow />}/>
    </Routes>
  </Router>
)