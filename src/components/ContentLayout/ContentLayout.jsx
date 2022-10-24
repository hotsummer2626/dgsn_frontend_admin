import React from "react";
import styles from "./ContentLayout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ContentLayout = ({ title, createHandler, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.iconWrapper} onClick={createHandler}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div>Create Item</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContentLayout;
