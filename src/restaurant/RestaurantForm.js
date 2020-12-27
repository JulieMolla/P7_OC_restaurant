import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Paper, TextField } from "@material-ui/core";
import { getStreetViewImage } from "../map/map.utils";
import { RestaurantContext } from "./RestaurantContext";

function RestaurantForm() {
  const { form, setListView, addRestaurant } = useContext(RestaurantContext);

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (form.restaurantName) {
      setRestaurantName(form.restaurantName);
    }
    if (form.address) {
      setAddress(form.address);
    }
    if (form.lat && form.long) {
      const url = getStreetViewImage(form.lat, form.long);
      setImage(url);
    }
  }, [form]);

  function handleSubmit(event) {
    event.preventDefault();

    // const restaurant =
    // onSave({ ...restaurant, restaurantName, address, ratings });

    addRestaurant({ ...form, restaurantName, address });
  }

  function handleCancel() {
    setListView();
  }

  return (
    <Paper style={{ margin: "20px", padding: "20px" }}>
      <h2>Nouveau Restaurant</h2>
      <img src={image} alt={restaurantName}></img>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Box component="div">
          <TextField
            id="restaurantName"
            label="Nom"
            value={restaurantName}
            onChange={(event) => {
              setRestaurantName(event.target.value);
            }}
            style={{ width: "100%", marginBotton: "10px" }}
          />
        </Box>

        <Box component="div" mb={1}>
          <TextField
            id="address"
            label="Adresse"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        </Box>

        <Button type="submit" variant="contained">
          Enregistrer
        </Button>

        <Button type="button" variant="contained" onClick={handleCancel}>
          Annuler
        </Button>
      </form>
    </Paper>
  );
}

export default RestaurantForm;
