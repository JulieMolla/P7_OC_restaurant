import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { getStreetViewImage } from "../map/map.utils";

function RestaurantForm({ restaurant, onSave, onClose }) {
  const [restaurantName, setRestaurantName] = useState(restaurant.restaurantName || "");
  const [address, setAddress] = useState(restaurant.address || "");
  const [ratings] = useState(restaurant.ratings || []);

  const url = getStreetViewImage(restaurant.lat, restaurant.long);

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...restaurant, restaurantName, address, ratings });
  }

  return (
    <div>
      <h2>Nouveau Restaurant</h2>

      <img src={url} alt={restaurant.restaurantName}></img>

      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <TextField
          id='restaurantName'
          label='Nom'
          value={restaurantName}
          onChange={(event) => {
            setRestaurantName(event.target.value);
          }}
        />

        <TextField
          id='address'
          label='Adresse'
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />

        <Button type='submit' variant='contained'>
          Envoyer
        </Button>

        <Button type='button' variant='contained' onClick={onClose}>
          Annuler
        </Button>
      </form>
    </div>
  );
}

export default RestaurantForm;
