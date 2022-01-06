import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Tag from "./Tag";

const TagList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tags, setTags] = useState([]);

  const loadTags = () => {
    const url = `/api/v1/tags`;
    fetch(url)
      .then(response => response.json())
      .then(
        (tag) => {
          setIsLoaded(true);
          setTags(tag);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const reloadTags = () => {
    setTags([]);
    loadTags();
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="row">
      <SideBar/>
      <div className="d-flex flex-column col me-3 ms-1">
        <div className="row row-cols-auto">
          {tags.length < 1
            ? <div className="fs-4 fw-lighter text-center">No tags found.</div>
            : tags.map(tag => {
                return (
                  <Tag key={tag.id} tag={tag} reloadTags={reloadTags}/>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default TagList;