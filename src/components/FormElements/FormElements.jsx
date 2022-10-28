import React, { useState } from "react";
import styles from "./FormElements.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faUpload } from "@fortawesome/free-solid-svg-icons";

export const Input = ({ type, value, onChange, className }) => {
  return (
    <input
      type={type}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export const Select = ({
  value,
  options,
  fetchOptions,
  onChange,
  className,
}) => {
  const [isOptionsShow, setIsOptionsShow] = useState(false);

  const toggleSelect = () => {
    if (options) {
      return setIsOptionsShow(!isOptionsShow);
    }
    setIsOptionsShow(true);
    fetchOptions();
  };

  const onClickOptionHandler = (option) => () => {
    onChange(option);
    setIsOptionsShow(false);
  };
  return (
    <div className={`${styles.selectWrapper} ${className}`}>
      <div className={styles.select} onClick={toggleSelect}>
        <div>{value}</div>
        <div className={`${styles.icon} ${isOptionsShow ? styles.active : ""}`}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
      {isOptionsShow && (
        <div className={styles.options}>
          {options &&
            options.map((option) => (
              <div
                key={option._id}
                className={styles.option}
                onClick={onClickOptionHandler(option)}
              >
                <div>
                  <img src={option.imgSrc} alt="option" />
                </div>
                <div>{option.name}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export const UploadImg = ({ imgSrc, text, onChange, className }) => {
  return (
    <div className={`${styles.uploadWrapper} ${className}`}>
      {imgSrc && (
        <div className={styles.imgWrapper}>
          <img src={imgSrc} alt="upload" />
        </div>
      )}
      <label htmlFor="uploadImg">
        <FontAwesomeIcon icon={faUpload} />
        &nbsp; {text}
      </label>
      <input
        type="file"
        accept="image/*"
        id="uploadImg"
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
};
