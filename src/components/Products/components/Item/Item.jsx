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

const Item = ({ product }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    brandName: "",
    brandImgSrc: "",
  });
  const dispatch = useDispatch();

  const onEditHandler = () => {
    // getUserById(user._id)
    //   .then((res) => {
    //     setIsEdit(true);
    //     setEditData({
    //       ...editData,
    //       username: res.data.user.username,
    //     });
    //   })
    //   .catch((err) => alert(err));
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
    // setIsEdit(false);
    // setEditData({
    //   username: "",
    //   role: "Admin",
    // });
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
          {/* <input
            type="text"
            value={editData.username}
            onChange={inputHandler("username")}
          />
          <input
            type="text"
            value={editData.role}
            onChange={inputHandler("role")}
          /> */}
        </>
      ) : (
        <>
          <div className={styles.imgWrapper}>
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
