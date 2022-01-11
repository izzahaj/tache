import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../customhooks/hooks";
import { getTags } from "../reducers/tagsReducer";
import SideBar from "./SideBar";
import Tag from "./Tag";

const TagList = () => {
  const tags = useAppSelector((state) => state.tags.value);
  const dispatch = useAppDispatch();

  const loadTags = () => {
    const url = `/api/v1/tags`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch tag data.");
        }
        return response.json();
      })
      .then(
        (tags) => {
          dispatch(getTags(tags));
          console.log("Ok");
        })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="row">
      <SideBar/>
      <div className="d-flex flex-column col me-3 ms-1">
        <div className="mt-2">
          <h1>Tags</h1>
        </div>
        <div className="fs-4 fw-lighter text-center">{tags.length < 1 ? "No" : tags.length} tags found.</div>
        <div className="row row-cols-auto d-grif">
          { tags.map(tag => {
              return (
                <Tag key={tag.id} tag={tag} loadTags={loadTags}/>
              )
            })}
        </div>
      </div>
    </div>
  );
};

export default TagList;