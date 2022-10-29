import React, { useState } from "react";
import styles from "./CreateBrandModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { uploadImgToCloudinary } from "../../../../store/apis/upload";
import { createBrand } from "../../../../store/apis/brand";
import { addBrand } from "../../../../store/slices/brands";
import { useDispatch } from "react-redux";
import { Input, UploadImg } from "../../../FormElements/FormElements";

const CreateBrandModal = ({ setIsModalShow }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    brandImgSrc: null,
  });
  const dispatch = useDispatch();

  const uploadImgHandler = (e) => {
    uploadImgToCloudinary(e.target.files[0], "brands")
      .then((res) => {
        setFormData({
          ...formData,
          brandImgSrc: res.secure_url,
        });
      })
      .catch((err) => alert(err));
  };

  const createBrandHandler = (closeModal) => {
    const { brandName, brandImgSrc } = formData;
    if (brandName === "" || brandImgSrc === null) {
      return alert("Brand name or brand logo cannot be blank");
    }
    createBrand({ name: brandName, imgSrc: brandImgSrc })
      .then((res) => {
        if (!res.errors) {
          dispatch(addBrand(res.data.createBrand));
          closeModal();
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <ModalOutline
      title="Create New Brand"
      closeModal={() => setIsModalShow(false)}
      onConfirm={createBrandHandler}
    >
      <form className={styles.createBrandForm}>
        <div className={styles.formItem}>
          <div className={styles.label}>Name:</div>
          <Input
            type="text"
            value={formData.brandName}
            onChange={(e) =>
              setFormData({
                ...formData,
                brandName: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Logo Image:</div>
          <UploadImg
            imgSrc={formData.brandImgSrc}
            text="Choose A Photo"
            onChange={uploadImgHandler}
          />
        </div>
      </form>
    </ModalOutline>
  );
};

export default CreateBrandModal;
