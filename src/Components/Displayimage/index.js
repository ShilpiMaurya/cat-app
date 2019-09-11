import React from "react";
import "./index.css";

const Displayimage = props => {
  console.log("props", props.image);
  return (
    <div
      className="img"
      style={{
        backgroundImage: `url("${props.image}")`
      }}
    ></div>
  );
};
export default Displayimage;
