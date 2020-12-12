import React from "react";
import Rating from "@material-ui/lab/Rating";
import { GOOGLE_API_KEY } from "../map/google-api-key";

function RestaurantDetail(props) {
  const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${props.restaurant.lat},${props.restaurant.long}&key=${GOOGLE_API_KEY}`;
  return (
    <div>
      <h1>{props.restaurant.restaurantName}</h1>
      <button onClick={props.onClose}>Fermer</button>
      <img src={url} alt={props.restaurant.restaurantName}></img>

      <ul>
        {props.restaurant.ratings.map((rating, index) => (
          <li key={index}>
            {" "}
            <Rating name='read-only' value={rating.stars} readOnly precision={0.5} size='small' />
            {rating.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetail;
