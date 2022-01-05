import React, { useState } from "react";
import TagsInput from "./TagsInput";

const SearchBar = (props) => {
  const [tag_list, setTag_List] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("deadline");
  const [priority, setPriority] = useState("all");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e) => {
    const url = `/api/v1/${props.filter}?description=${searchValue}&priority=${priority}&sort_value=${sortValue}&tag_list=${tag_list}`;
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
      <div className="col-md-3">
        <label htmlFor="sortBy" className="form-label">Sort by</label>
        <select className="form-select" id="sortBy" onChange={event => setSortValue(event.target.value)}>
          <option value="deadline">Deadline</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="filterPriority" className="form-label">Priority</label>
        <select className="form-select" id="filterPriority" onChange={event => setPriority(event.target.value)} value={priority}>
          <option value="all">Show All</option>
          <option value="">No Priority</option>
          <option value="Low Priority">Low Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="High Priority">High Priority</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="inputTags" className="col col-form-label">Tags</label>
        <TagsInput tag_list={tag_list} setTag_List={setTag_List} formStyle={"form-control-sm"}/>
      </div>
      <div className="col-auto ms-auto">
        <button onClick={handleSubmit} type="button" className="btn btn-success">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;