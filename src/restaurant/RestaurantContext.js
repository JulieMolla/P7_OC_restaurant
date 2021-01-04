import React, { Component, createContext } from "react";

import restaurantsJson from "./restaurants.json";

// créer un context
export const RestaurantContext = createContext();

/**
 * Wrapper component pour initialiser le context
 */
class RestaurantContextProvider extends Component {
  state = {
    restaurants: [...restaurantsJson], // tous les restaurants
    displayed: [], // restaurants affichés
    view: "LIST", // vue active
    isLoading: false, // indique si des restaurants sont en train de charger
  };

  /**
   * met à jour les restaurants affichés
   * @param {*} restaurants: restaurant à afficher
   */
  setDisplayedRestaurants = (restaurants) => {
    this.setState({ displayed: restaurants });
  };

  /**
   * Ajoute un restaurant à la liste
   * @param {*} restaurant
   */
  addRestaurant = (restaurant) => {
    const newRestaurant = { ratings: [], ...restaurant }; // créer une copie du restaurant à créer en initialisant ratings

    this.setState((state) => ({
      ...state,
      restaurants: [...state.restaurants, newRestaurant], // ajoute le restaurant à la liste de tous les résultats
    }));
    this.setDetailView(newRestaurant); // active la vue detail
  };

  /**
   * Met à jour un restaurant dans la liste
   * @param {*} updatedRestaurant
   */
  updateRestaurant = (updatedRestaurant) => {
    // remplace l'ancienne version du restaurant pour le nouveau
    const updatedRestaurants = this.state.restaurants.map((restaurant) => {
      if (restaurant.id === updatedRestaurant.id) {
        return updatedRestaurant;
      }
      return restaurant;
    });

    this.setState({ restaurants: updatedRestaurants }); // met à jour la liste des restaurants
  };

  /**
   * Défini un restaurant comme étant survolé
   */
  setHoverRestaurant = (restaurant) => {
    this.setState({ hover: restaurant });
  };

  /**
   * Supprime les restaurants provenant de google de la liste
   */
  clearSearchResults = () => {
    // récupère tous le restaurant dont le champs from n'est pas search
    const filteredRestaurants = this.state.restaurants.filter(
      (restaurant) => restaurant.from !== "search"
    );

    this.setState({ restaurants: filteredRestaurants }); // met à jour la liste des restaurants
  };

  /**
   * Ajoute plusieurs restaurants
   * @param {*} restaurants: tableau de restaurant à ajouter
   */
  addRestaurants = (restaurants) => {
    this.setState((state) => {
      return {
        ...state,
        restaurants: [...state.restaurants, ...restaurants],
      };
    });
  };

  /** Change l'état de la vue en liste */
  setListView = () => {
    this.setState({
      selected: undefined, // réinitialise le restaurant sélectionné
      hover: undefined, // réinitialise le restaurant survolé
      view: "LIST", // nouvel état de la vue
    });
  };

  /** Change l'état de la vue en formulaire */
  setFormView = (restaurant) => {
    this.setState({
      selected: undefined, // réinitialise le restaurant sélectionné
      hover: undefined, // réinitialise le restaurant survolé
      form: restaurant, // restaurant actif pour le formulaire
      view: "FORM", // nouvel état de la vue
    });
  };

  /** Change l'état de la vue en détail */
  setDetailView = (restaurant) => {
    this.setState({
      selected: restaurant, // restaurant à afficher
      hover: undefined, // réinitialise le restaurant survolé
      view: "DETAIL", // nouvel état de la vue
    });
  };

  /** Modifie l'état en chargement */
  setLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  /**
   * fonction de rendu du component
   */
  render() {
    return (
      <RestaurantContext.Provider
        value={{
          // rend accessible le state aux composants enfants
          ...this.state,
          /// rend accessible les methodes aux composants enfants
          clearSearchResults: this.clearSearchResults,
          addRestaurants: this.addRestaurants,
          setDisplayedRestaurants: this.setDisplayedRestaurants,
          addRestaurant: this.addRestaurant,
          setHoverRestaurant: this.setHoverRestaurant,
          setListView: this.setListView,
          setFormView: this.setFormView,
          setDetailView: this.setDetailView,
          updateRestaurant: this.updateRestaurant,
          setLoading: this.setLoading,
        }}
      >
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}

export default RestaurantContextProvider;
