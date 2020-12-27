import React, { useState, useContext, useEffect } from "react";

import { RestaurantContext } from "./RestaurantContext";
import { calculateAverageRating } from "./restaurant.utils";

import RestaurantFilter from "./RestaurantFilter";
import RestaurantList from "./RestaurantList";
import LoadMoreButton from "./LoadMoreButton";
import { GoogleApiContext } from "../map/GoogleApiContext";
import { calculateDistance } from "../map/map.utils";
import { round } from "../utils";

function FilteredRestaurantList() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [filter, setFilter] = useState([0, 5]);

  const google = useContext(GoogleApiContext);
  const { restaurants, setDisplayedRestaurants } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    const center = google.position;
    const bounds = google.map && google.map.getBounds();
    console.log("center", center);

    const filtered = restaurants
      .map((restaurant) => {
        const calculatedRating = calculateAverageRating(restaurant);
        const distance =
          center &&
          round(
            calculateDistance(center, {
              lat: restaurant.lat,
              lng: restaurant.long,
            }),
            2
          );
        return { ...restaurant, distance, calculatedRating };
      })
      .filter((restaurant) => {
        const { calculatedRating } = restaurant;
        const [min, max] = filter;
        const matchRating = min <= calculatedRating && calculatedRating <= max;
        const isOnMap =
          bounds &&
          bounds.contains({
            lat: restaurant.lat,
            lng: restaurant.long,
          });
        console.log("isOnMap", isOnMap);
        return matchRating && isOnMap;
      })
      .sort((a, b) => {
        return (
          a.distance - b.distance || b.calculatedRating - a.calculatedRating
        );
      });

    console.log("filtered", filtered);
    setFilteredRestaurants(filtered);
    setDisplayedRestaurants(filtered);
  }, [
    restaurants,
    filter,
    setDisplayedRestaurants,
    google.position,
    google.map,
  ]);

  return (
    <>
      <RestaurantFilter onFilter={setFilter} />
      <RestaurantList restaurants={filteredRestaurants} />
      <LoadMoreButton />
    </>
  );
}

export default FilteredRestaurantList;