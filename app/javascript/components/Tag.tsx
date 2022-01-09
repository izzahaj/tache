import React from "react";
import DeleteTag from "./DeleteTag";

type Props = {
  tag: {
    id: number,
    name: string
  },
  reloadTags: Function
}

const Tag = ({tag, reloadTags}: Props) => {
  return (
    <div className="col-auto py-1 ms-2 mt-2 bg-paleyellow rounded shadow-sm text-black">
      <div className="hstack ">
        {tag.name}
        <DeleteTag tag={tag} reloadTags={reloadTags}/>
      </div>
    </div>
  );
};

export default Tag;