import React from "react";
import styles from "./DeleteProductModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { useDispatch } from "react-redux";
import { deleteProduct as deleteProductFn } from "../../../../store/apis/product";
import { deleteProduct } from "../../../../store/slices/products";

const DeleteProductModal = ({ productId, setIsModalShow }) => {
  const dispatch = useDispatch();

  const deleteProductHandler = (closeModal) => {
    deleteProductFn(productId)
      .then((res) => {
        if (!res.errors) {
          dispatch(deleteProduct(productId));
          closeModal();
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <ModalOutline
      title="Delete Product"
      closeModal={() => setIsModalShow(false)}
      onConfirm={deleteProductHandler}
    >
      <h3 className={styles.text}>Really want to delete the product???</h3>
    </ModalOutline>
  );
};

export default DeleteProductModal;
