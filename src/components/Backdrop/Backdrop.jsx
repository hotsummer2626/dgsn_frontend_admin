import React from "react";
import ReactDOM from "react-dom";
import styles from "./Backdrop.module.scss";

const backdropRoot = document.getElementById("backdrop-root");

const Backdrop = (props) => {
  const onClickHandler = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.container} ${props.className}`}
      onClick={props.isPropagation ? () => {} : onClickHandler}
    >
      {props.children}
    </div>,
    backdropRoot
  );
};

export default Backdrop;
