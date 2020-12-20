import React from "react";
import Rating from "@material-ui/lab/Rating";

function RestaurantListItem({ restaurant, index, onClick, onHover }) {
  function handleClick() {
    onClick(restaurant);
  }

  function handleMouseEnter() {
    onHover(restaurant);
  }

  function handleMouseLeave() {
    onHover(null);
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
      style={getStyle(restaurant.isHover)}
    >
      [{index}] {restaurant.restaurantName}
      <Rating
        name="read-only"
        value={restaurant.averageRating}
        readOnly
        precision={0.5}
        size="small"
      />
      ({restaurant.averageRating}){restaurant.address}
    </li>
  );
}

export default RestaurantListItem;
