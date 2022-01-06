import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";

const DeleteTag = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };  

  const deleteTag = () => {
    const url = `/api/v1/tags/${props.tagId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          props.reloadTags()
          return response.json();
        } 
        throw new Error("Network error.");
      })
      .catch(error => console.log(error.message));

  };

  return (
    <>
      <button className="btn btn-sm btn-outline-danger mx-1" onClick={showModal}>Delete</button>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Delete Tag: {props.tagName}</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <p>This action will remove the tag from all tasks.</p>
          <p>Are you sure you want to delete this tag?</p>
        </ModalBody>
        <Modal.Footer>
          <button onClick={deleteTag} type="button" className="btn btn-danger">Delete</button>
          <button onClick={hideModal} className="btn btn-secondary">Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTag;