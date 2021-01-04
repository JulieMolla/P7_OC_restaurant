import React from "react";
import "./RestaurantListItem.css";
import AverageRating from "../rating/AverageRating";
import { Box, Card } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { round } from "../utils";
import Marker from "../map/Marker";

/** Component affichant la distance */
function RestaurantDistance({ restaurant }) {
  if (!restaurant.distance) {
    return null;
  }

  // Si la distance est inférieur à 1km on transforme pour afficher en mètre
  if (restaurant.distance < 1) {
    return <>({restaurant.distance * 1000}m)</>;
  }

  return <>({round(restaurant.distance, 1)}km)</>;
}

/**
 * Component affichant un restaurant pour un liste
 * @prop {*} restaurant: restaurant affiché
 * @prop {*} index: index du restaurant dans la liste
 * @prop {*} isHover: indique si l'élément est survolé
 * @prop {*} onClick: callback exécutée au click sur l'élément
 * @prop {*} onHover: callback exécutée au survole de l'élément
 */
function RestaurantListItem({ restaurant, index, isHover, onClick, onHover }) {
  function handleClick() {
    onClick(restaurant);
  }

  function handleMouseEnter() {
    onHover(restaurant);
  }

  function handleMouseLeave() {
    onHover(null);
  }

  return (
    <Card
      className="RestaurantListItem"
      elevation={1}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box component="div" className="index">
        <Marker
          restaurant={restaurant}
          isHover={isHover}
          style={{ marginLeft: 0, marginTop: 0 }}
        >
          {index}
        </Marker>
      </Box>
      <div className="info">
        <header>
          <h3>
            {restaurant.restaurantName}{" "}
            {restaurant.from === "search" ? <VerifiedUserIcon /> : null}
          </h3>
          <small>
            <AverageRating restaurant={restaurant} />
          </small>
        </header>
        <p>
          {restaurant.address} <RestaurantDistance restaurant={restaurant} />
        </p>
      </div>
    </Card>
  );
}

export default RestaurantListItem;
