import React from "react";
import { Link } from "react-router-dom";
import Filters from "./Filters"

const SideBar = () => {
  return (
    <div className="col-sm-4 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100" style={{width: "280px"}}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto mx-2 text-white text-decoration-none">
        <div className="fs-3">Tâche</div>
      </Link>
      <br/>
      <form className="d-flex mx-2">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-sm btn-outline-light" type="submit">Search</button>
      </form>
      <hr/>
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            Task List
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link text-white">
            Completed
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link text-white">
            Today
          </Link>
        </li>
        <Filters/>
      </ul>
    </div>
  )
}

export default SideBar;