import React, { useState } from "react";

type Props = {
  tag_list: string[]
  setTagList: Function,
};

const TagsInput = ({ tag_list, setTagList }: Props) => {
  const [tagInput, setTagInput] = useState("");

  const removeTag = (i: number) => {
    const newTags = [ ...tag_list ];
    newTags.splice(i, 1);
    setTagList(newTags);
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value
    if (e.key === 'Enter' && val) {
      if (tag_list.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      e.preventDefault();
      setTagList([...tag_list, val]);
      setTagInput("");
      console.log(tag_list);
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tag_list.length - 1);
    }
  };

  return (
    <div className="form-control input-tag d-grid">
      <ul className="input-tag__tags">
        {tag_list.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>x</button>
          </li>
        ))}
        <li className="input-tag__tags__input">
          <input
            type="text"
            className="form-control-sm"
            name="tag_list"
            onKeyDown={inputKeyDown}
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
          />
        </li>
      </ul>
    </div>
  );
};

export default TagsInput;