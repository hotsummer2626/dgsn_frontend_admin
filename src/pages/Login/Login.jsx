import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginFn } from "../../store/apis/auth";
import { login } from "../../store/slices/auth";
import { Select } from "../../components/FormElements/FormElements";

const Login = () => {
  const [activeInput, setActiveInput] = useState({
    username: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLogged && auth.user?.token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);
  const resetForm = () => {
    setActiveInput({ username: "", password: "" });
    setErrorMsg(null);
    setFormData({ username: "", password: "" });
  };
  const onFocusHandler = (inputName) => () =>
    setActiveInput({ ...activeInput, [inputName]: true });
  const onBlurHandler = (inputName) => (e) => {
    if (e.target.value === "") {
      setActiveInput({ ...activeInput, [inputName]: false });
    }
  };
  const onChangeHandler = (inputName) => (e) =>
    setFormData({ ...formData, [inputName]: e.target.value });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (formData.username === "" && formData.password === "") {
      return setErrorMsg("Please input username and password");
    }
    loginFn(formData)
      .then((res) => {
        if (!res.errors) {
          setErrorMsg(null);
          dispatch(login(res.data.login));
          resetForm();
          navigate("/dashboard", { replace: true });
        } else {
          setErrorMsg(res.errors[0].message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={onSubmitHandler}>
          <label
            htmlFor="username"
            className={activeInput.username ? styles.active : ""}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            onFocus={onFocusHandler("username")}
            onBlur={onBlurHandler("username")}
            onChange={onChangeHandler("username")}
            value={formData.username}
            className={activeInput.username ? styles.active : ""}
          />
          <label
            htmlFor="password"
            className={activeInput.password ? styles.active : ""}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onFocus={onFocusHandler("password")}
            onBlur={onBlurHandler("password")}
            onChange={onChangeHandler("password")}
            value={formData.password}
            className={activeInput.password ? styles.active : ""}
          />
          {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
