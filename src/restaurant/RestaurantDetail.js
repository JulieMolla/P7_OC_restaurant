import React from "react";
import { RatingList } from "./RatingList";
import RatingForm from "./RatingForm";
import { GOOGLE_API_KEY } from "../map/google-api-key";

function RestaurantDetail({ restaurant, onClose }) {
  const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${props.restaurant.lat},${props.restaurant.long}&key=${GOOGLE_API_KEY}`;

  return (
    <div>
      <h1>{restaurant.restaurantName}</h1>
      <button onClick={onClose}>Fermer</button>
      <img src={url} alt={restaurant.restaurantName}></img>

      <RatingList restaurant={restaurant} />

      <RatingForm></RatingForm>
    </div>
  );
}

export default RestaurantDetail;
