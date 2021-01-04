import React, { useState, useContext, useEffect } from "react";

import { RestaurantContext } from "./RestaurantContext";
import { calculateAverageRating } from "./restaurant.utils";

import RestaurantFilter from "./RestaurantFilter";
import RestaurantList from "./RestaurantList";
import LoadMoreButton from "./LoadMoreButton";
import { GoogleApiContext } from "../map/GoogleApiContext";
import { calculateDistance } from "../map/map.utils";
import { round } from "../utils";

/**
 * Component permettant d'afficher une liste de restaurant filtrée
 */
function FilteredRestaurantList() {
  const [filteredRestaurants, setFilteredRestaurants] = useState(undefined); // Liste des restaurants filtrée à afficher

  const [filter, setFilter] = useState([0, 5]); // Filtre utilisé

  const google = useContext(GoogleApiContext);
  const { restaurants, setDisplayedRestaurants, isLoading } = useContext(
    RestaurantContext
  );

  // Hook permettant de mettre à jour les restaurants affichés
  useEffect(() => {
    if (!google.map) {
      // si la carte n'est pas encore chargée la fonction n'est pas exécutée
      return;
    }

    const center = google.position; // on récupère la position de l'utilisateur ou l'adresse recherchée
    const bounds = google.map.getBounds(); // on récupère les limites visibles de la carte

    const filtered = restaurants
      .map((restaurant) => {
        // note moyenne des commentaires
        const calculatedRating = calculateAverageRating(restaurant);

        // calcule la distance par rapport à la position s'il y en a une
        const distance =
          center &&
          round(
            calculateDistance(center, {
              lat: restaurant.lat,
              lng: restaurant.long,
            }),
            2
          );

        return { ...restaurant, distance, calculatedRating }; // transforme le restaurant en y ajoutant le propriétés calculées
      })
      .filter((restaurant) => {
        const { calculatedRating } = restaurant;
        const [min, max] = filter;
        // vérifie si la note moyenne correspond au filtre
        const matchRating = min <= calculatedRating && calculatedRating <= max;

        // vérifie si le restaurant est visible sur la carte
        const isOnMap =
          bounds &&
          bounds.contains({
            lat: restaurant.lat,
            lng: restaurant.long,
          });

        return matchRating && isOnMap; // le restaurant s'il correspond aux deux critères
      })
      .sort((a, b) => {
        // trie les restaurants par distance croissante puis par note moyenne
        return (
          a.distance - b.distance || b.calculatedRating - a.calculatedRating
        );
      });

    setFilteredRestaurants(filtered); // met à jour les restaurant affichés dans le component
    setDisplayedRestaurants(filtered); // met à jour les restaurants affichés dans le context
  }, [
    // le hook est exécuté lorsque une des variables suivantes change
    restaurants,
    filter,
    setDisplayedRestaurants,
    google.position,
    google.map,
  ]);

  return (
    <>
      <RestaurantFilter onFilter={setFilter} />
      <RestaurantList restaurants={filteredRestaurants} />
      {!isLoading && <LoadMoreButton />}
    </>
  );
}

export default FilteredRestaurantList;
