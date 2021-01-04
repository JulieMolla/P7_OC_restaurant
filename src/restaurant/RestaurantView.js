import React, { useContext } from "react";
import RestaurantDetail from "./RestaurantDetail";
import RestaurantForm from "./RestaurantForm";
import FilteredRestaurantList from "./FilteredRestaurantList";
import { RestaurantContext } from "./RestaurantContext";

/**
 * Component permettant d'afficher une vue différent en fonction de l'état de l'application
 */
function RestaurantView() {
  const { view } = useContext(RestaurantContext); // Récupération de la vue active depuis le context

  if (view === "DETAIL") {
    return <RestaurantDetail />; // Vue détail
  } else if (view === "FORM") {
    return <RestaurantForm />; // Vue formulaire
  }
  return <FilteredRestaurantList />; // Vue liste
}

export default RestaurantView;
