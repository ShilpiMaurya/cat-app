import React from "react";
import "./index.css";

const Displayimage = props => {
  console.log("props", props.image);
  return (
    <div className="display">
      <img src={props.image} alt="catimage" style={props.imagestyle} />
    </div>
  );
};
export default Displayimage;
