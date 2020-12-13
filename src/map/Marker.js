import React from "react";

function getStyle(props) {
  const size = 30;
  const normalStyle = {
    // position: "absolute",
    width: size,
    height: size,
    marginLeft: -size / 2,
    marginTop: -size / 2,
    backgroundColor: "grey",
    borderRadius: size,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const hoverStyle = { ...normalStyle, backgroundColor: "red" };
  const selectedStyle = { ...normalStyle, backgroundColor: "green" };

  if (props.restaurant.isSelected || props.restaurant.isCreating) {
    return selectedStyle;
  }
  if (props.restaurant.isHover) {
    return hoverStyle;
  }

  return normalStyle;
}

function Marker(props) {
  function handleClick() {
    props.onClick(props.restaurant);
  }

  function handleMouseEnter() {
    props.onHover(props.restaurant);
  }

  function handleMouseLeave() {
    props.onHover(null);
  }

  return (
    <div style={getStyle(props)} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {props.index}
    </div>
  );
}

export default Marker;
