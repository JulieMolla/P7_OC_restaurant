import React, { useState, useContext, useEffect } from "react";
import { RatingList } from "../rating/RatingList";
import RatingForm from "../rating/RatingForm";
import { getStreetViewImage } from "../map/map.utils";
import { RestaurantContext } from "./RestaurantContext";
import AverageRating from "../rating/AverageRating";
import { Button, IconButton, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { GoogleApiContext } from "../map/GoogleApiContext";

/**
 * Component pour la vue détail
 */
function RestaurantDetail() {
  const { selected, setListView, updateRestaurant } = useContext(
    RestaurantContext
  ); // récupération du context restaurant

  const google = useContext(GoogleApiContext); // récupération du context google

  const [restaurant, setRestaurant] = useState(selected); // restaurant affiché
  const [reviews, setReviews] = useState([]); // commentaires provenant de google

  useEffect(() => {
    setRestaurant(selected);
    google.getDetail(selected, setReviews); // Récupère le détail du restaurant pour mettre à jour
  }, [selected, google]);

  const url = getStreetViewImage(selected.lat, selected.long);

  /**
   * Permet d'ajouter un commentaire
   * @param {*} rating
   */
  function handleAddRating(rating) {
    // créer une copie du restaurant en y ajoutant le nouveau commentaire
    const updatedRestaurant = {
      ...restaurant,
      ratings: [...restaurant.ratings, rating], // ajoute le nouveau commentaire aux anciens commentaires
    };

    setRestaurant(updatedRestaurant); // met à jour le restaurant dans le component
    updateRestaurant(updatedRestaurant); // met à jour le restaurant dans le context
  }

  /**
   * Pour fermer la vue détail
   */
  function handleClose() {
    setListView(); // change l'état de la vue dans le context
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

        {/* Permet d'espacer les éléments */}
        <span style={{ flexGrow: 1 }}></span>

        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <p>{restaurant.address}</p>

      <div style={{ textAlign: "center" }}>
        <img src={url} alt={restaurant.restaurantName}></img>
      </div>

      {/* Commentaire google */}
      <RatingList ratings={reviews} />
      {/* commentaire ajouter manuellement */}
      <RatingList ratings={restaurant.ratings} />

      {/* Formulaire d'ajout de commentaire */}
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
