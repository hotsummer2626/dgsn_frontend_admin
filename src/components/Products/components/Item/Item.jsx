import React, { useState } from "react";
import styles from "./Item.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../../../store/apis/product";
import { UploadImg, Select, Input } from "../../../FormElements/FormElements";
import { getBrands } from "../../../../store/apis/brand";
import { setBrands } from "../../../../store/slices/brands";
import { uploadImgToCloudinary } from "../../../../store/apis/upload";

const Item = ({ product }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    productName: "",
    productBrand: "",
    productPrice: "",
    productExpireDate: "",
    productImgSrc: "",
  });
  const [selectValue, setSelectValue] = useState("");
  const {
    brandData: { brands },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    getProductById(product._id)
      .then((res) => {
        if (!res.errors) {
          setIsEdit(true);
          setEditData({
            ...editData,
            productName: res.data.product.name,
            productBrand: res.data.product._id,
            productPrice: res.data.product.price,
            productExpireDate: res.data.product.expireDate,
            productImgSrc: res.data.product.imgSrc,
          });
          setSelectValue(res.data.product.brand.name);
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  };

  const uploadImgHandler = (e) => {
    uploadImgToCloudinary(e.target.files[0], "products").then((res) => {
      setEditData({
        ...editData,
        productImgSrc: res.secure_url,
      }).catch((err) => alert(err));
    });
  };

  const fetchOptions = () => {
    getBrands()
      .then((res) => {
        if (!res.errors) {
          dispatch(setBrands(res.data.brands));
        } else alert(res.errors[0].message);
      })
      .catch((err) => alert(err));
  };

  const onSelectChangeHandler = (brand) => {
    setEditData({
      ...editData,
      productBrand: brand._id,
    });
    setSelectValue(brand.name);
  };

  const confirmEditHandler = () => {
    // setIsEdit(false);
    // dispatch(
    //   updateUser({
    //     id: user._id,
    //     username: editData.username,
    //     role: "Admin",
    //   })
    // );
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
    setEditData({
      productName: "",
      productBrand: "",
      productPrice: "",
      productExpireDate: "",
      productImgSrc: "",
    });
    setSelectValue("");
  };

  const inputChangeHandler = (inputName) => (e) => {
    let value = e.target.value;
    if (
      inputName === "productPrice" &&
      "" !== value.replace(/\d{1,}\.{0,1}\d{0,}/, "")
    ) {
      value =
        value.match(/\d{1,}\.{0,1}\d{0,}/) === null
          ? ""
          : value.match(/\d{1,}\.{0,1}\d{0,}/);
    }
    setEditData({
      ...editData,
      [inputName]: value,
    });
  };
  return (
    <div className={styles.container}>
      {isEdit ? (
        <>
          <UploadImg
            className={styles.editInput}
            imgSrc={editData.productImgSrc}
            text="Choose A New Photo"
            onChange={uploadImgHandler}
          />
          <Input
            className={styles.editInput}
            type="text"
            value={editData.productName}
            onChange={inputChangeHandler("productName")}
          />
          <Select
            className={styles.editInput}
            value={selectValue}
            options={brands}
            fetchOptions={fetchOptions}
            onChange={onSelectChangeHandler}
          />
          <Input
            className={styles.editInput}
            type="text"
            value={editData.productPrice}
            onChange={inputChangeHandler("productPrice")}
          />
          <Input
            className={styles.editInput}
            type="date"
            value={editData.productExpireDate}
            onChange={inputChangeHandler("productExpireDate")}
          />
        </>
      ) : (
        <>
          <div className={styles.displayImgWrapper}>
            <img src={product.imgSrc} alt="logo" />
          </div>
          <div>{product.name}</div>
          <div>{product.brand.name}</div>
          <div>{product.price}</div>
          <div>{product.expireDate}</div>
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
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  );
};

export default Item;
