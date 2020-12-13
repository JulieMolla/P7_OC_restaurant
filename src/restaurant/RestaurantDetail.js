import React from "react";
import { RatingList } from "./RatingList";
import RatingForm from "./RatingForm";
import { useState } from "react";
import { GOOGLE_API_KEY } from "../map/google-api-key";

function RestaurantDetail({ restaurant, onClose }) {
  const [ratings, setRatings] = useState(restaurant.ratings);

  const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${props.restaurant.lat},${props.restaurant.long}&key=${GOOGLE_API_KEY}`;

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

      <RatingList ratings={ratings} />

      <RatingForm onSubmit={handleAddRating} />
    </div>
  );
}

export default RestaurantDetail;
