import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { RestaurantContext } from "../restaurant/RestaurantContext";
import { GoogleApiContext } from "./GoogleApiContext";

function SearchZoneButton() {
  const google = useContext(GoogleApiContext);
  const { clearSearchResults, addRestaurants } = useContext(RestaurantContext);

  function handleSearchClick() {
    clearSearchResults();
    google.clearPosition();
    google.searchNearby((results) => {
      addRestaurants(results);
    });
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