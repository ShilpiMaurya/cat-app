import React from "react";
import "./index.css";

const Display1 = props => {
  return (
    <div className="display">
      <img src={props.image} alt="catimage" style={props.sty} />
    </div>
  );
};
export default Display1;
