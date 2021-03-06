import React, { useState } from "react";
import TagsInput from "./TagsInput";

type Props = {
  searchInput: {
    searchValue: string,
    priority: string,
    sortValue: string,
    dueDate: string
  },
  setSearchInput: Function,
  tag_list: string[],
  setTagList: Function,
  loadTasks: Function
}

const SearchBar = ({ searchInput, setSearchInput, tag_list, setTagList, loadTasks }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement; 
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleSubmit = () => {
    loadTasks();
  };

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="searchValue" className="form-label">Search</label>
        <input className="form-control" type="search" placeholder="Search" name="searchValue" onChange={handleChange}/>
      </div>
      <div className="col-md-2">
        <label htmlFor="priority" className="form-label">Priority</label>
        <select className="form-select" name="priority" onChange={handleChange} value={searchInput.priority}>
          <option value="all">Show All</option>
          <option value="">No Priority</option>
          <option value="Low Priority">Low Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="High Priority">High Priority</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="sortValue" className="form-label">Sort by</label>
        <select className="form-select" name="sortValue" onChange={handleChange} value={searchInput.sortValue}>
          <option value="deadline">Deadline</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="dueDate" className="form-label">Due date</label>
        <select className="form-select" name="dueDate" onChange={handleChange} value={searchInput.dueDate}>
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
        <label htmlFor="tag_list" className="col col-form-label">Tags</label>
        <TagsInput tag_list={tag_list} setTagList={setTagList}/>
      </div>
      <div className="col-auto ms-auto">
        <button onClick={handleSubmit} type="button" className="btn btn-success">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;