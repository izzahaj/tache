import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import EditTask from "./EditTask";
import moment from "moment";
import DeleteButton from "./DeleteTask";
import { useAppDispatch, useAppSelector } from "../customhooks/hooks";
import { setTask } from "../reducers/taskReducer";
import { setTagList } from "../reducers/tagListReducer";

const ViewTask = () => { 
  const task = useAppSelector((state) => state.task.value);
  const tag_list = useAppSelector((state) => state.tagList.value);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    const url1 = `/api/v1/tasks/${id}`;
    const url2 = `/api/v1/get_tag_list/${id}`;

    Promise.all([
      fetch(url1)
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not fetch task data.");
          }
          return response.json();
        }),
      fetch(url2)
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not fetch tags data.");
          }
          return response.json();
        }),
    ])
    .then(
      ([task, tag_list]) => {
        dispatch(setTask(task));
        dispatch(setTagList(tag_list.map((tag: { name: string; }) => tag.name)));
      })
    .then(() => console.log("Ok"))
    .catch(error => console.log(error))
  }, []);

  return (
    <div className="row">
      <SideBar/>
      <div className="d-flex flex-column col">
        <div className="p-5 mb-4 ms-2 me-3 bg-light rounded-3">
          <div className="container-fluid py-5">
            <div className="row display-4 ms-1">
              {task.description}
            </div>
            <div className="row display-6 fw-bold ms-1">
              {task.priority}
            </div>
            <br/>
            <br/>
            <div className="row ms-1">Deadline: {task.deadline === null
              ? ""
              : moment(task.deadline).calendar({
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd, D MMM YYYY',
                  sameElse: 'dddd, D MMM YYYY'
                })}
            </div>
            <br/>
            <div className="row ms-1 hstack">Tags: {tag_list.map(tag => {
              return (
                <div key={tag} className="col-auto py-1 px-2 ms-2 bg-darkblue rounded shadow-sm text-white">
                  {tag}
                </div>
              )
            })}
            </div>
            <br/>
            <div className="row">
              <div className="col-md-8">
                <Link to="/" type="button" className="btn btn-secondary">Back to Task List</Link>
              </div>
              <div className="col ms-auto">
                <EditTask taskId={id} load={() => null} buttonStyle={"btn btn-secondary mx-1"}/>
                <DeleteButton taskId={id} buttonStyle={"btn btn-danger mx-1"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
