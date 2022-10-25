import React, { useState } from "react";
import styles from "./CreateProductModal.module.scss";
import ModalOutline from "../../../ModalOutline/ModalOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { uploadImgToS3 } from "../../../../store/apis/upload";
import { getBrands } from "../../../../store/apis/brand";
import { createProduct } from "../../../../store/apis/product";
import { setBrands } from "../../../../store/slices/brands";
import { addProduct } from "../../../../store/slices/products";
import { useSelector, useDispatch } from "react-redux";

const CreateBrandModal = ({ setIsModalShow }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productPrice: "",
    productExpireDate: "",
    productImgSrc: null,
  });
  const [selectValue, setSelectValue] = useState("Please select a brand");
  const [isSelectOptionsShow, setIsSelectOptionsShow] = useState(false);
  const {
    brandData: { brands },
    productData:{products}
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(products)

  const uploadImgHandler = (e) => {
    uploadImgToS3(e.target.files[0], "products")
      .then((res) => {
        setFormData({
          ...formData,
          productImgSrc: res.location,
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

  const onClickSelectHandler = () => {
    if (brands) {
      return setIsSelectOptionsShow(!isSelectOptionsShow);
    }
    setIsSelectOptionsShow(true);
    getBrands()
      .then((res) => {
        if (!res.errors) {
          dispatch(setBrands(res.data.brands));
        } else alert(res.errors[0].message);
      })
      .catch((err) => alert(err));
  };

  const onClickOptionHandler = (brand) => () => {
    setFormData({
      ...formData,
      productBrand: brand._id,
    });
    setSelectValue(brand.name);
    setIsSelectOptionsShow(false);
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
          <input
            type="text"
            id="productName"
            value={formData.productName}
            onChange={inputChangeHandler("productName")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Brand:</div>
          <div className={styles.selectWrapper}>
            <div className={styles.select} onClick={onClickSelectHandler}>
              <div>{selectValue}</div>
              <div
                className={`${styles.icon} ${
                  isSelectOptionsShow ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </div>
            </div>
            {isSelectOptionsShow && (
              <div className={styles.options}>
                {brands &&
                  brands.map((brand) => (
                    <div
                      key={brand._id}
                      className={styles.option}
                      onClick={onClickOptionHandler(brand)}
                    >
                      <div>
                        <img src={brand.imgSrc} alt="brand logo" />
                      </div>
                      <div>{brand.name}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Price:</div>
          <input
            type="text"
            id="productPrice"
            value={formData.productPrice}
            onChange={inputChangeHandler("productPrice")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Expire Date:</div>
          <input
            type="date"
            id="productExpireDate"
            value={formData.productExpireDate}
            onChange={inputChangeHandler("productExpireDate")}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Image:</div>
          <div className={styles.uploadWrapper}>
            {formData.productImgSrc && (
              <div className={styles.imgWrapper}>
                <img src={formData.productImgSrc} alt="product logo" />
              </div>
            )}
            <label htmlFor="productImgSrc">
              <FontAwesomeIcon icon={faUpload} />
              &nbsp; Choose A Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="productImgSrc"
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
