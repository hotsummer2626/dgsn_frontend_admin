import React from "react";
import styles from "./DeleteBrandModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { useDispatch } from "react-redux";
import { deleteBrand as deleteBrandFn } from "../../../../store/apis/brand";
import { deleteBrand } from "../../../../store/slices/brands";

const DeleteBrandModal = ({ brandId, setIsModalShow }) => {
  const dispatch = useDispatch();

  const deleteBrandHandler = (closeModal) => {
    deleteBrandFn(brandId)
      .then((res) => {
        if (!res.errors) {
          dispatch(deleteBrand(brandId));
          closeModal();
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <ModalOutline
      title="Delete Brand"
      closeModal={() => setIsModalShow(false)}
      onConfirm={deleteBrandHandler}
    >
      <h3 className={styles.text}>Really want to delete the brand???</h3>
    </ModalOutline>
  );
};

export default DeleteBrandModal;
