import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Paper, TextField } from "@material-ui/core";
import { getStreetViewImage } from "../map/map.utils";
import { RestaurantContext } from "./RestaurantContext";

/**
 * Component formulaire de création
 */
function RestaurantForm() {
  const { form, setListView, addRestaurant } = useContext(RestaurantContext); // récupération du context restaurant

  const [restaurantName, setRestaurantName] = useState(""); // valeur du champs restaurantName
  const [address, setAddress] = useState(""); // valeur du champs adresse
  const [image, setImage] = useState(""); // image du restaurant (récupérer grâce à l'api street view)
  const [hasError, setHasError] = useState(false); // indique si le formulaire n'est pas valide

  // hook pour initialiser les champs du formulaire
  useEffect(() => {
    if (form.restaurantName) {
      setRestaurantName(form.restaurantName);
    }
    if (form.address) {
      setAddress(form.address);
    }
    if (form.lat && form.long) {
      const url = getStreetViewImage(form.lat, form.long); // récupère l'image street view correspondant à la position
      setImage(url);
    }
  }, [form]);

  /**
   * envoie du formulaire
   */
  function handleSubmit(event) {
    event.preventDefault(); //empêche l'action par défaut du navigateur pour l'évènement submit de s'exécuter

    // vérifie les champs du formulaire
    if (restaurantName === "" || address === "") {
      setHasError(true);
      return;
    }

    setHasError(false);
    addRestaurant({ ...form, restaurantName, address }); // ajoute le restaurant à la liste des restaurants du context
  }

  /** annule la création du formulaire */
  function handleCancel() {
    setHasError(false);
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

        {hasError && (
          <p style={{ color: "#f44336" }}>
            Veuillez renseigner le nom du restaurant et son adresse.
          </p>
        )}

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
