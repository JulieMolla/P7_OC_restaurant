import { Avatar } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";

import { RestaurantContext } from "../restaurant/RestaurantContext";

/**
 * Retourne le style du marker
 */
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
  // const creatingStyle = { ...normalStyle, backgroundColor: "blue" };

  // if (isCreating) {
  //   return creatingStyle;
  // }

  if (isSelected) {
    return selectedStyle;
  }

  if (isHover) {
    return hoverStyle;
  }

  return normalStyle;
}

/**
 * Component utiliser pour indiquer la position des restaurants sur la carte
 * @prop {*} children: éléments fils contenant le numéro du marker
 * @prop {*} restaurant: restaurant associé au marker
 * @prop {*} style: style à appliquer au marker
 */
function Marker({ children, restaurant, style }) {
  // const [isCreating, setIsCreating] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { selected, hover, setHoverRestaurant, setDetailView } = useContext(
    RestaurantContext
  );

  // hook modifiant l'état du marker
  useEffect(() => {
    if (restaurant === selected) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [restaurant, selected]);

  // hook modifiant l'état du marker
  useEffect(() => {
    if (restaurant === hover) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  }, [restaurant, hover]);

  /**
   * Permet d'activer la vue détail au click sur le marker
   */
  function handleClick() {
    setDetailView(restaurant);
  }

  /**
   * Lorsque la souris entre dans la zone du marker
   */
  function handleMouseEnter() {
    setHoverRestaurant(restaurant);
  }

  /**
   * Lorsque la souris sort de la zone du marker
   */
  function handleMouseLeave() {
    setHoverRestaurant(undefined);
  }

  return (
    <Avatar
      style={getStyle({ isHover, isSelected, style })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Avatar>
  );
}

export default Marker;
