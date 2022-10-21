import React from "react";
import "./global.scss";
import styles from "./App.module.scss";
import Menu from "./components/Menu/Menu";
import Content from "./components/Content/Content";

const App = () => {
  return (
    <div className={styles.container}>
      <Menu />
      <Content />
    </div>
  );
};

export default App;
