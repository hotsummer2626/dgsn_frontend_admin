import React, { useEffect } from "react";
import styles from "./Users.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item/Item";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/apis/user";
import { setUsers } from "../../store/slices/users";
import ContentLayout from "../ContentLayout/ContentLayout";

const Users = () => {
  const {
    userData: { users },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (!res.errors) {
          dispatch(setUsers(res.data.users));
        } else {
          alert(res.errors[0].message);
        }
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <ContentLayout title="Users">
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
          {users && users.map((user) => <Item key={user._id} user={user} />)}
        </div>
      </div>
    </ContentLayout>
  );
};

export default Users;
