import React from "react";
import DeleteTag from "./DeleteTag";

const Tag = (props) => {
  return (
    <div className="col">
      <div className="row">
        {props.tag.name}
      </div>
      <div>
        <DeleteTag tagName={props.tag.name} tagId={props.tag.id} reloadTags={props.reloadTags}/>
      </div>
    </div>
  );
};

export default Tag;