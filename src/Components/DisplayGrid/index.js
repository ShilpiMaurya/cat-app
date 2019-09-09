import React from "react";
import "./index.css";
function DisplayGrid(props) {
  if (!props.favoriteData) {
    return "No data";
  }
  const jsxArray = [];
  for (let i = 0; i < props.favoriteData.length; i++) {
    jsxArray.push(
      <div
        style={{
          backgroundImage: `url("${props.favoriteData[i].image.url}")`,
          width: "400px",
          height: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "5px",
          borderRadius: "5px"
        }}
      ></div>
    );
  }
  return <div className="display-grid-container">{jsxArray}</div>;
}
export default DisplayGrid;
