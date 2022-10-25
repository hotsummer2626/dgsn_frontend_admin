import React, { useState } from "react";
import styles from "./CreateBrandModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { uploadImgToS3 } from "../../../../store/apis/upload";
import { createBrand } from "../../../../store/apis/brand";
import { addBrand } from "../../../../store/slices/brands";
import { useDispatch } from "react-redux";

const CreateBrandModal = ({ setIsModalShow }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    brandImgSrc: null,
  });
  const dispatch = useDispatch();

  const uploadImgHandler = (e) => {
    uploadImgToS3(e.target.files[0], "brands")
      .then((res) => {
        setFormData({
          ...formData,
          brandImgSrc: res.location,
        });
      })
      .catch((err) => alert(err));
  };

  const createBrandHandler = () => {
    const { brandName, brandImgSrc } = formData;
    if (brandName === "" || brandImgSrc === null) {
      return alert("Brand name or brand logo cannot be blank");
    }
    createBrand({ name: brandName, imgSrc: brandImgSrc })
      .then((res) => {
        if (!res.errors) {
          dispatch(addBrand(res.data.createBrand));
          setIsModalShow(false);
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
          <input
            type="text"
            id="brandName"
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
          <div className={styles.uploadWrapper}>
            {formData.brandImgSrc && (
              <div className={styles.imgWrapper}>
                <img src={formData.brandImgSrc} alt="brand logo" />
              </div>
            )}
            <label htmlFor="brandImgSrc">
              <FontAwesomeIcon icon={faUpload} />
              &nbsp; Choose A Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="brandImgSrc"
              style={{ display: "none" }}
              onChange={uploadImgHandler}
            />
          </div>
        </div>
      </form>
    </ModalOutline>
  );
};

export default CreateBrandModal;
