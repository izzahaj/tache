import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { useAppDispatch } from "../customhooks/hooks";
import { removeTag } from "../reducers/tagsReducer";

type Props = {
  tag: {
    id: number,
    name: string
  }
}

const DeleteTag = ({ tag }: Props) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };  

  const deleteTag = () => {
    const url = `/api/v1/tags/${tag.id}`;
    const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;

    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token.content,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not delete tag.");
        } 
        return response.json();
      })
      .then(() => dispatch(removeTag(tag.id)))
      .then(() => console.log("Ok"))
      .catch(error => console.log(error.message));
    hideModal();
  };

  return (
    <>
      <button className="btn btn-sm btn-outline-dark ms-2" onClick={showModal}>
        X
      </button>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Delete Tag: {tag.name}</Modal.Title>
        </Modal.Header>
        <ModalBody className="text-center">
          <p>This action will remove the tag from all tasks.</p>
          <p>Are you sure you want to delete this tag?</p>
        </ModalBody>
        <Modal.Footer>
          <button onClick={hideModal} className="btn btn-secondary me-auto">Cancel</button>
          <button onClick={deleteTag} type="button" className="btn btn-danger">Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTag;