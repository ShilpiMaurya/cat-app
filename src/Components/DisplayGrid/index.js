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
        className="fav-cats"
        style={{
          backgroundImage: `url("${props.favoriteData[i].image.url}")`
        }}
      ></div>
    );
  }
  return <div className="display-grid-container">{jsxArray}</div>;
}
export default DisplayGrid;
