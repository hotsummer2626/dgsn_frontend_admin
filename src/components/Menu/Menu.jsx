import React from "react";
import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faBagShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { id: 1, name: "Users", icon: faUser, to: "/users" },
  { id: 2, name: "Brands", icon: faGlobe, to: "/brands" },
  { id: 3, name: "Products", icon: faBagShopping, to: "/products" },
];

const Menu = () => {
  return (
    <div className={styles.container}>
      <h1>DGSN</h1>
      <div className={styles.linkWrapper}>
        {links.map((link) => (
          <div
            key={link.id}
            className={`${styles.link} ${
              link.name === "Users" ? styles.active : ""
            }`}
          >
            <div className={styles.icon}>
              <FontAwesomeIcon icon={link.icon} />
            </div>
            <div>{link.name}</div>
          </div>
        ))}
        <div className={styles.logoutMargin}></div>
        <div key="logout" className={styles.link}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
