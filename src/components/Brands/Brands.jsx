import React, { useState } from "react";
import styles from "./Brands.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ContentLayout from "../ContentLayout/ContentLayout";
import Transition from "../TransitionContainers/Transition/Transition";
import CreateBrandModal from "./components/CreateBrandModal/CreateBrandModal";

const Brands = () => {
  const [isModalShow, setIsModalShow] = useState(false);

  const createHandler = () => {
    setIsModalShow(true);
  };
  return (
    <ContentLayout title="Brands" createHandler={createHandler}>
      <div className={styles.body}>
        <div className={styles.listHead}>
          <span>Logo</span>
          <span>Name</span>
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
      <Transition isShow={isModalShow} className="fade">
        <CreateBrandModal setIsModalShow={setIsModalShow} />
      </Transition>
    </ContentLayout>
  );
};

export default Brands;
