import React, { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";
import RestaurantListItem from "./RestaurantListItem";

function RestaurantList({ restaurants }) {
  const { selected, hover, setHoverRestaurant, setDetailView } = useContext(
    RestaurantContext
  );

  function isSelected(restaurant) {
    return restaurant === selected;
  }

  function isHover(restaurant) {
    return restaurant === hover;
  }

  return restaurants.map((restaurant, index) => (
    <RestaurantListItem
      key={index}
      index={index + 1}
      isSelected={isSelected(restaurant)}
      isHover={isHover(restaurant)}
      restaurant={restaurant}
      onClick={setDetailView}
      onHover={setHoverRestaurant}
    />
  ));
}

export default RestaurantList;
