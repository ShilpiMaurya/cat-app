import React from "react";
import "./index.css";

const Button = props => {
  return <button onClick={props.onButtonClick}>{props.children}</button>;
};
export default Button;
