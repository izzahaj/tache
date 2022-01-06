import React, { useState } from "react";
import TagsInput from "./TagsInput";

const SearchBar = (props) => {
  const [tag_list, setTagList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("deadline");
  const [priority, setPriority] = useState("all");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e) => {
    const url = `/api/v1/tasks?description=${searchValue}&priority=${priority}&sort_value=${sortValue}&tag_list=${tag_list}&due_date=${dueDate}`;
    fetch(url)
      .then(response => response.json())
      .then(
        (task) => {
          setIsLoaded(true);
          props.setTasks(task);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="search" className="form-label">Search</label>
        <input className="form-control" type="search" placeholder="Search" id="search" onChange={event => setSearchValue(event.target.value)}/>
      </div>
      <div className="col-md-2">
        <label htmlFor="filterPriority" className="form-label">Priority</label>
        <select className="form-select" id="filterPriority" onChange={event => setPriority(event.target.value)} value={priority}>
          <option value="all">Show All</option>
          <option value="">No Priority</option>
          <option value="Low Priority">Low Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="High Priority">High Priority</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="sortBy" className="form-label">Sort by</label>
        <select className="form-select" id="sortBy" onChange={event => setSortValue(event.target.value)}>
          <option value="deadline">Deadline</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="dueDate" className="form-label">Due date</label>
        <select className="form-select" id="dueDate" onChange={event => setDueDate(event.target.value)}>
          <option value="all">Show All</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="this_week">This week</option>
          <option value="2_weeks">In 2 weeks</option>
          <option value="month">In a month</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="inputTags" className="col col-form-label">Tags</label>
        <TagsInput tag_list={tag_list} setTagList={setTagList} formStyle={"form-control-sm"}/>
      </div>
      <div className="col-auto ms-auto">
        <button onClick={handleSubmit} type="button" className="btn btn-success">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;