import React, { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { useSelector } from "react-redux";
import Menu from "../../components/Menu/Menu";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(auth.isLogged && auth.user?.token)) {
      navigate("/", { replace: true });
    }
  }, [auth]);
  
  return (
    <div className={styles.container}>
      <Menu />
      <Outlet />
    </div>
  );
};

export default Dashboard;
