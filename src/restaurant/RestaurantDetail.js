import React, { useState, useContext, useEffect } from "react";
import { RatingList } from "../rating/RatingList";
import RatingForm from "../rating/RatingForm";
import { getStreetViewImage } from "../map/map.utils";
import { RestaurantContext } from "./RestaurantContext";
import AverageRating from "../rating/AverageRating";
import { Button, IconButton, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function RestaurantDetail() {
  const { selected, setListView, updateRestaurant } = useContext(
    RestaurantContext
  );

  const [restaurant, setRestaurant] = useState(selected);

  useEffect(() => {
    setRestaurant(selected);
  }, [selected]);

  const url = getStreetViewImage(selected.lat, selected.long);

  function handleAddRating(rating) {
    const updatedRestaurant = {
      ...restaurant,
      ratings: [...restaurant.ratings, rating],
    };

    setRestaurant(updatedRestaurant);
    updateRestaurant(updatedRestaurant);
  }

  function handleClose() {
    setListView();
  }

  return (
    <Paper style={{ margin: "20px", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{restaurant.restaurantName}</h1>
        <span>
          <AverageRating restaurant={restaurant} />
        </span>
        <span style={{ flexGrow: 1 }}></span>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <p>{restaurant.address}</p>
      <div style={{ textAlign: "center" }}>
        <img src={url} alt={restaurant.restaurantName}></img>
      </div>

      <RatingList ratings={restaurant.ratings} />

      <Paper
        elevation={3}
        m={2}
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <h6>Ajouter un avis</h6>
        <RatingForm onSubmit={handleAddRating} />
      </Paper>

      <Button onClick={handleClose}>Fermer</Button>
    </Paper>
  );
}

export default RestaurantDetail;
