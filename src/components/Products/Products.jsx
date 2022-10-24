import React from "react";
import styles from "./Products.module.scss";
import ContentLayout from "../ContentLayout/ContentLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  return (
    <ContentLayout title="Products">
      <div className={styles.body}>
        <div className={styles.listHead}>
          <span>Image</span>
          <span>Name</span>
          <span>Brand</span>
          <span>Price</span>
          <span>Expire Date</span>
          <span>Edit</span>
          <span>Delete</span>
          <span className={styles.filterIcon}>
            <FontAwesomeIcon icon={faFilter} />
          </span>
        </div>
        {/* <div className={styles.listWrapper}>
          {users && users.map((user) => <Item key={user._id} user={user} />)}
        </div> */}
      </div>
    </ContentLayout>
  );
};

export default Products;
