import React, { useState } from "react";
import styles from "./CreateProductModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { uploadImgToCloudinary } from "../../../../store/apis/upload";
import { getBrands } from "../../../../store/apis/brand";
import { createProduct } from "../../../../store/apis/product";
import { setBrands } from "../../../../store/slices/brands";
import { addProduct } from "../../../../store/slices/products";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, UploadImg } from "../../../FormElements/FormElements";

const CreateBrandModal = ({ setIsModalShow }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productPrice: "",
    productExpireDate: "",
    productImgSrc: null,
  });
  const [selectValue, setSelectValue] = useState("Please select a brand");
  const {
    brandData: { brands },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const uploadImgHandler = (e) => {
    uploadImgToCloudinary(e.target.files[0], "products")
      .then((res) => {
        setFormData({
          ...formData,
          productImgSrc: res.secure_url,
        });
      })
      .catch((err) => alert(err));
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
    setFormData({
      ...formData,
      [inputName]: value,
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
    setFormData({
      ...formData,
      productBrand: brand._id,
    });
    setSelectValue(brand.name);
  };
  const createProductHandler = () => {
    const {
      productName,
      productBrand,
      productPrice,
      productExpireDate,
      productImgSrc,
    } = formData;
    if (
      productName === "" ||
      productBrand === "" ||
      productPrice === "" ||
      productExpireDate === "" ||
      productImgSrc === null
    ) {
      return alert("Please fill the blank");
    }
    createProduct({
      name: productName,
      brand: productBrand,
      imgSrc: productImgSrc,
      price: +productPrice,
      expireDate: productExpireDate,
    })
      .then((res) => {
        if (!res.errors) {
          dispatch(addProduct(res.data.createProduct));
          setIsModalShow(false);
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ModalOutline
      title="Create New Product"
      closeModal={() => setIsModalShow(false)}
      onConfirm={createProductHandler}
    >
      <form className={styles.createProductForm}>
        <div className={styles.formItem}>
          <div className={styles.label}>Name:</div>
          <Input
            type="text"
            value={formData.productName}
            onChange={inputChangeHandler("productName")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Brand:</div>
          <Select
            value={selectValue}
            options={brands}
            fetchOptions={fetchOptions}
            onChange={onSelectChangeHandler}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Price:</div>
          <Input
            type="text"
            value={formData.productPrice}
            onChange={inputChangeHandler("productPrice")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Expire Date:</div>
          <Input
            type="date"
            value={formData.productExpireDate}
            onChange={inputChangeHandler("productExpireDate")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Image:</div>
          <UploadImg
            text="Choose A Photo"
            imgSrc={formData.productImgSrc}
            onChange={uploadImgHandler}
          />
        </div>
      </form>
    </ModalOutline>
  );
};

export default CreateBrandModal;
