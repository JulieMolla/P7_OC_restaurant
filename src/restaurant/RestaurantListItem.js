import React from "react";
import { calculateAverageRating } from "./restaurant.utils";
import Rating from "@material-ui/lab/Rating";

function RestaurantListItem(props) {
  const averageRating = Math.round(calculateAverageRating(props.restaurant.ratings) * 10) / 10;

  function handleClick() {
    props.onClick(props.restaurant);
  }

  function handleMouseEnter() {
    props.onHover(props.restaurant);
  }

  function handleMouseLeave() {
    props.onHover(null);
  }

  function getStyle(isHover) {
    if (isHover) {
      return {
        fontWeight: "bold",
      };
    }
    return {};
  }

  return (
    <li
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={getStyle(props.restaurant.isHover)}
    >
      [{props.index}] {props.restaurant.restaurantName}
      <Rating name='read-only' value={averageRating} readOnly precision={0.5} size='small' />({averageRating})
      {props.restaurant.address}
    </li>
  );
}

export default RestaurantListItem;
