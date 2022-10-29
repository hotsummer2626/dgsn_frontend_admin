import React, { useState } from "react";
import styles from "./Item.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getBrandById } from "../../../../store/apis/brand";
import { uploadImgToCloudinary } from "../../../../store/apis/upload";
import { Input, UploadImg } from "../../../FormElements/FormElements";
import { updateBrand as updateBrandFn } from "../../../../store/apis/brand";
import { updateBrand } from "../../../../store/slices/brands";
import Transition from "../../../TransitionContainers/Transition/Transition";
import DeleteBrandModal from "../DeleteBrandModal/DeleteBrandModal";

const Item = ({ brand }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    brandName: "",
    brandImgSrc: "",
  });
  const [isModalShow, setIsModalShow] = useState(false);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    getBrandById(brand._id)
      .then((res) => {
        if (!res.errors) {
          setIsEdit(true);
          setEditData({
            ...editData,
            brandName: res.data.brand.name,
            brandImgSrc: res.data.brand.imgSrc,
          });
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  };

  const uploadImgHandler = (e) => {
    uploadImgToCloudinary(e.target.files[0], "brands")
      .then((res) => {
        setEditData({
          ...editData,
          brandImgSrc: res.secure_url,
        });
      })
      .catch((err) => alert(err));
  };

  const confirmEditHandler = () => {
    const { brandName, brandImgSrc } = editData;
    if (brandName === "" || brandImgSrc === null) {
      return alert("Brand name or brand logo cannot be blank");
    }
    updateBrandFn({
      id: brand._id,
      name: editData.brandName,
      imgSrc: editData.brandImgSrc,
    })
      .then((res) => {
        if (!res.error) {
          dispatch(updateBrand(res.data.updateBrand));
        }
        setIsEdit(false);
      })
      .catch((err) => alert(err));
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
    setEditData({
      brandName: "",
      brandImgSrc: "",
    });
  };

  const inputHandler = (inputName) => (e) =>
    setEditData({
      ...editData,
      [inputName]: e.target.value,
    });

  return (
    <div className={styles.container}>
      {isEdit ? (
        <>
          <UploadImg
            className={styles.editInput}
            imgSrc={editData.brandImgSrc}
            text="Choose A New Photo"
            onChange={uploadImgHandler}
          />
          <Input
            className={styles.editInput}
            type="text"
            value={editData.brandName}
            onChange={inputHandler("brandName")}
          />
        </>
      ) : (
        <>
          <div className={styles.displayImgWrapper}>
            <img src={brand.imgSrc} alt="logo" />
          </div>
          <div>{brand.name}</div>
        </>
      )}
      <div className={styles.icon}>
        {isEdit ? (
          <>
            <FontAwesomeIcon icon={faCheck} onClick={confirmEditHandler} />
            <FontAwesomeIcon icon={faXmark} onClick={cancelEditHandler} />
          </>
        ) : (
          <FontAwesomeIcon icon={faPenToSquare} onClick={onEditHandler} />
        )}
      </div>
      <div className={styles.icon}>
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => setIsModalShow(true)}
        />
      </div>
      <Transition isShow={isModalShow} className="fade">
        <DeleteBrandModal brandId={brand._id} setIsModalShow={setIsModalShow} />
      </Transition>
    </div>
  );
};

export default Item;
