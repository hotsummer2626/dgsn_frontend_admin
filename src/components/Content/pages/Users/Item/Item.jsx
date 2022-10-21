import React from "react";
import styles from "./Item.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Item = () => {
  return (
    <div className={styles.container}>
      <div>sunny</div>
      <div>admin</div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  );
};

export default Item;
