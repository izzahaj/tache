import React from "react";
import DeleteTag from "./DeleteTag";

type Props = {
  tag: {
    id: number,
    name: string
  },
  loadTags: Function
}

const Tag = ({tag, loadTags}: Props) => {
  return (
    <div className="col-auto py-1 ms-2 mt-2 bg-paleyellow rounded shadow-sm text-black">
      <div className="hstack ">
        {tag.name}
        <DeleteTag tag={tag} loadTags={loadTags}/>
      </div>
    </div>
  );
};

export default Tag;