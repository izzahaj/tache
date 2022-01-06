import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sticky-top col-sm-4 d-flex flex-column flex-shrink-0 p-3 bg-mintgreen min-vh-100" style={{width: "280px", height: "100%"}}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto mx-2 text-black text-decoration-none">
        <div><h2>Tâche</h2></div>
      </Link>
      <hr/>
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-black" >
            Task List
          </NavLink>
        </li>
        <li>
          <NavLink to="/tags" className="nav-link text-black">
            Tags
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideBar;