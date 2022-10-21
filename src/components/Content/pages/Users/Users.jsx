import React from "react";
import styles from "./Users.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item/Item";

const Users = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Users</h2>
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div>Create Item</div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.listHead}>
          <span>Username</span>
          <span>Role</span>
          <span>Edit</span>
          <span>Delete</span>
          <span className={styles.filterIcon}>
            <FontAwesomeIcon icon={faFilter} />
          </span>
        </div>
        <div className={styles.listWrapper}>
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Users;
