import { CircularProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";
import RestaurantListItem from "./RestaurantListItem";

function RestaurantList({ restaurants }) {
  const {
    selected,
    hover,
    setHoverRestaurant,
    setDetailView,
    isLoading,
  } = useContext(RestaurantContext);

  function isSelected(restaurant) {
    return restaurant === selected;
  }

  function isHover(restaurant) {
    return restaurant === hover;
  }

  if (isLoading || !restaurants) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!restaurants.length) {
    return (
      <p style={{ padding: 20, textAlign: "center" }}>
        Aucun restaurant dans cette zone correspondant à vos critères
      </p>
    );
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
