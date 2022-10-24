import React, { useState, useEffect } from "react";
import styles from "./TransitionDelay.module.scss";
import { CSSTransition } from "react-transition-group";

const TransitionDelay = (props) => {
  const [isShow, setIsShow] = useState(false);
  const timeout = props.timeout;

  useEffect(() => {
    if (props.defaultShow) {
      setTimeout(() => {
        setIsShow(true);
      }, timeout);
    }
  }, []);

  return (
    <CSSTransition
      in={isShow}
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

export default TransitionDelay;
