import React from "react";
import styles from "./CreateBrandModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";

const CreateBrandModal = ({ setIsModalShow }) => {
  return (
    <ModalOutline
      title="Create New Brand"
      closeModal={() => setIsModalShow(false)}
    >adfaf</ModalOutline>
  );
};

export default CreateBrandModal;
