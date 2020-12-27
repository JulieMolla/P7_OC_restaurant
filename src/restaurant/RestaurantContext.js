import React, { Component, createContext } from "react";

import restaurantsJson from "./restaurants.json";

export const RestaurantContext = createContext();

class RestaurantContextProvider extends Component {
  state = {
    restaurants: [...restaurantsJson],
    filter: [0, 5],
    displayed: [],
    view: "LIST",
  };

  setDisplayedRestaurants = (restaurants) => {
    this.setState({ displayed: restaurants });
  };

  addRestaurant = (restaurant) => {
    const newRestaurant = { ratings: [], ...restaurant };
    this.setState((state) => ({
      ...state,
      restaurants: [...state.restaurants, newRestaurant],
    }));
    this.setDetailView(newRestaurant);
  };

  updateRestaurant = (updatedRestaurant) => {
    const updatedRestaurants = this.state.restaurants.map((restaurant) => {
      if (restaurant.id === updatedRestaurant.id) {
        return updatedRestaurant;
      }
      return restaurant;
    });

    this.setState({ restaurants: updatedRestaurants });
  };

  filterRestaurants = (filter) => {
    this.setState({ filter });
  };

  setHoverRestaurant = (restaurant) => {
    this.setState({ hover: restaurant });
  };

  clearSearchResults = () => {
    const filteredRestaurants = this.state.restaurants.filter(
      (restaurant) => restaurant.from !== "search"
    );
    this.setState({ restaurants: filteredRestaurants });
  };

  addRestaurants = (restaurants) => {
    this.setState((state) => {
      return {
        ...state,
        restaurants: [...state.restaurants, ...restaurants],
      };
    });
  };

  setListView = () => {
    this.setState({
      selected: undefined,
      hover: undefined,
      view: "LIST",
    });
  };

  setFormView = (restaurant) => {
    this.setState({
      selected: undefined,
      hover: undefined,
      form: restaurant,
      view: "FORM",
    });
  };

  setDetailView = (restaurant) => {
    this.setState({
      selected: restaurant,
      hover: undefined,
      view: "DETAIL",
    });
  };

  render() {
    return (
      <RestaurantContext.Provider
        value={{
          ...this.state,
          clearSearchResults: this.clearSearchResults,
          addRestaurants: this.addRestaurants,
          setDisplayedRestaurants: this.setDisplayedRestaurants,
          addRestaurant: this.addRestaurant,
          setHoverRestaurant: this.setHoverRestaurant,
          setListView: this.setListView,
          setFormView: this.setFormView,
          setDetailView: this.setDetailView,
          filterRestaurants: this.filterRestaurants,
          updateRestaurant: this.updateRestaurant,
        }}
      >
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}

export default RestaurantContextProvider;
