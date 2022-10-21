import React from "react";
import styles from "./Content.module.scss";
import Users from "./pages/Users/Users";

const Content = () => {
  return (
    <div className={styles.container}>
      <Users />
    </div>
  );
};

export default Content;
