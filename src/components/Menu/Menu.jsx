import React from "react";
import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faBagShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth";

const links = [
  { id: 1, name: "Users", icon: faUser, to: "/dashboard" },
  { id: 2, name: "Brands", icon: faGlobe, to: "/dashboard/brands" },
  { id: 3, name: "Products", icon: faBagShopping, to: "/dashboard/products" },
];

const Menu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <h1>DGSN</h1>
      <div className={styles.linkWrapper}>
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`${styles.link} ${
              link.to === location.pathname ? styles.active : ""
            }`}
          >
            <div className={styles.icon}>
              <FontAwesomeIcon icon={link.icon} />
            </div>
            <div>{link.name}</div>
          </Link>
        ))}
        <div className={styles.logoutMargin}></div>
        <div
          key="logout"
          className={styles.link}
          onClick={() => {
            dispatch(logout());
          }}
        >
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
