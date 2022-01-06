import React, { useState } from "react";

const TagsInput = (props) => {
  const [tagInput, setTagInput] = useState("");

  const removeTag = (i) => {
    const newTags = [ ...props.tag_list ];
    newTags.splice(i, 1);
    props.setTagList(newTags);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (props.tag_list.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      e.preventDefault();
      props.setTagList([...props.tag_list, val]);
      setTagInput("");
      console.log(props.tag_list);
    } else if (e.key === 'Backspace' && !val) {
      removeTag(props.tag_list.length - 1);
    }
  };

  return (
    <div className="form-control input-tag d-grid">
      <ul className="input-tag__tags">
        {props.tag_list.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>x</button>
          </li>
        ))}
        <li className="input-tag__tags__input">
          <input
            type="text"
            className={props.formStyle}
            id="inputTags"
            onKeyDown={inputKeyDown}
            value={tagInput}
            onChange={event => setTagInput(event.target.value)}
          />
        </li>
      </ul>
    </div>
  );
};

export default TagsInput;