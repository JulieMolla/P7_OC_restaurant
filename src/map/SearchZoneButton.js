import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { RestaurantContext } from "../restaurant/RestaurantContext";
import { GoogleApiContext } from "./GoogleApiContext";

/**
 * Component représentant un bouton à afficher sur la carte
 * et qui permet de rechercher dans la zone afficher par la carte
 */
function SearchZoneButton() {
  const google = useContext(GoogleApiContext);
  const {
    clearSearchResults,
    addRestaurants,
    setListView,
    setLoading,
  } = useContext(RestaurantContext);

  /** Au clique sur le bouton */
  function handleSearchClick() {
    setLoading(true); // passe l'application en mode chargement
    clearSearchResults(); // efface les précédents résultats de recherche
    google.clearPosition(); // efface la position pour la recherche recherche
    // lance la recherche
    google.searchNearby((results) => {
      addRestaurants(results); // ajoute les restaurants à la liste
      setLoading(false); // désactive le mode chargement
    });
    setListView(); // active la vue liste
  }

  return (
    <Button
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        margin: "10px",
        backgroundColor: "white",
      }}
      onClick={handleSearchClick}
    >
      Rechercher dans cette zone
    </Button>
  );
}

export default SearchZoneButton;
