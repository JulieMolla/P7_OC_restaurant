import { CircularProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";
import RestaurantListItem from "./RestaurantListItem";

/** Component pour afficher une liste de restaurant */
function RestaurantList({ restaurants }) {
  const {
    selected,
    hover,
    setHoverRestaurant,
    setDetailView,
    isLoading,
  } = useContext(RestaurantContext); // récupération du context

  /**
   * Vérifie si le restaurant est celui sélectionné
   */
  function isSelected(restaurant) {
    return restaurant === selected;
  }

  /**
   * Vérifie si le restaurant est celui survolé
   */
  function isHover(restaurant) {
    return restaurant === hover;
  }

  // S'il y a des restaurants en chargement, ou la variables restaurants n'est pas défini (à l'initialisation de l'app)
  if (isLoading || !restaurants) {
    // on affiche un loader
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  // Si la liste des restaurants est vide
  if (!restaurants.length) {
    // on affiche un message
    return (
      <p style={{ padding: 20, textAlign: "center" }}>
        Aucun restaurant dans cette zone correspondant à vos critères
      </p>
    );
  }

  // Liste des restaurants
  // chaques object restaurant est transformé en component RestaurantListItem
  return restaurants.map((restaurant, index) => (
    <RestaurantListItem
      key={index}
      index={index + 1}
      isSelected={isSelected(restaurant)}
      isHover={isHover(restaurant)}
      restaurant={restaurant}
      onClick={setDetailView}
      onHover={setHoverRestaurant}
    />
  ));
}

export default RestaurantList;
