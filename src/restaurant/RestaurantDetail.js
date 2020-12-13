import React from "react";
import { RatingList } from "./RatingList";
import RatingForm from "./RatingForm";
import { useState } from "react";
import { getStreetViewImage } from "../map/map.utils";

function RestaurantDetail({ restaurant, onClose }) {
  const [ratings, setRatings] = useState(restaurant.ratings);

  const url = getStreetViewImage(restaurant.lat, restaurant.long);

  function handleAddRating(rating) {
    setRatings([...ratings, rating]);
  }

  function handleClose() {
    onClose({ ...restaurant, ratings });
  }

  return (
    <div>
      <h1>{restaurant.restaurantName}</h1>
      <button onClick={handleClose}>Fermer</button>
      <img src={url} alt={restaurant.restaurantName}></img>
      <p>{restaurant.address}</p>

      <RatingList ratings={ratings} />

      <RatingForm onSubmit={handleAddRating} />
    </div>
  );
}

export default RestaurantDetail;
