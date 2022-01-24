import React from "react";
import DeleteTag from "./DeleteTag";

type Props = {
  tag: {
    id: number,
    name: string
  }
}

const Tag = ({ tag }: Props) => {
  return (
    <div className="col-auto py-1 ms-2 mt-2 bg-paleyellow rounded shadow-sm text-black delete-tag">
      <div className="hstack">
        {tag.name}
        <DeleteTag tag={tag}/>
      </div>
    </div>
  );
};

export default Tag;