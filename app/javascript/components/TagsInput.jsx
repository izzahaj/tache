import React, { useState } from "react";

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      setTagInput(null);
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="">
      <ul>
        {tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>x</button>
          </li>
        ))}
        <li>
          <input type="text" className="form-control" id="inputTags" onKeyDown={inputKeyDown} ref={c => { setTagInput(c); }}/>
        </li>
      </ul>
    </div>
  );
};

export default TagsInput;