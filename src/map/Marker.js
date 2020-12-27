import { Avatar } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";

import { RestaurantContext } from "../restaurant/RestaurantContext";

function getStyle({ isHover, isSelected, isCreating, style }) {
  const size = 30;
  const normalStyle = {
    // position: "absolute",
    width: size,
    height: size,
    marginLeft: -size / 2,
    marginTop: -size / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    lineHeight: "unset",
    ...style,
  };

  const hoverStyle = { ...normalStyle, backgroundColor: "red" };
  const selectedStyle = { ...normalStyle, backgroundColor: "green" };
  const creatingStyle = { ...normalStyle, backgroundColor: "blue" };

  if (isCreating) {
    return creatingStyle;
  }

  if (isSelected) {
    return selectedStyle;
  }

  if (isHover) {
    return hoverStyle;
  }

  return normalStyle;
}

function Marker({ children, restaurant, style }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { selected, hover, setHoverRestaurant, setDetailView } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    if (!restaurant) {
      setIsCreating(true);
    } else {
      setIsCreating(false);
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurant === selected) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [restaurant, selected]);

  useEffect(() => {
    if (restaurant === hover) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  }, [restaurant, hover]);

  function handleClick() {
    setDetailView(restaurant);
  }

  function handleMouseEnter() {
    setHoverRestaurant(restaurant);
  }

  function handleMouseLeave() {
    setHoverRestaurant(undefined);
  }

  return (
    <Avatar
      style={getStyle({ isHover, isSelected, isCreating, style })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Avatar>
  );
}

export default Marker;
