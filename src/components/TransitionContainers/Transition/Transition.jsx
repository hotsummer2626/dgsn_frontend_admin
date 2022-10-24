import React, { useState, useEffect } from "react";
import styles from "./Transition.module.scss";
import { CSSTransition } from "react-transition-group";

const Transition = (props) => {
  const [isShow, setIsShow] = useState(false);

  const inParam = props.isShow || isShow;
  const setInParam = props.setIsShow || setIsShow;

  useEffect(() => {
    if (props.defaultShow) {
      setInParam(true);
    }
  }, []);

  return (
    <CSSTransition
      in={inParam}
      timeout={200}
      classNames={{
        enter: styles[`${props.className}Enter`],
        enterActive: styles[`${props.className}EnterActive`],
        enterDone: styles[`${props.classNames}EnterDone`],
        exit: styles[`${props.className}Exit`],
        exitActive: styles[`${props.className}ExitActive`],
        exitDone: styles[`${props.className}ExitDone`],
      }}
      unmountOnExit
    >
      {props.children}
    </CSSTransition>
  );
};

export default Transition;
