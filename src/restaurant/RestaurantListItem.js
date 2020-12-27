import React from "react";
import "./RestaurantListItem.css";
import AverageRating from "../rating/AverageRating";
import { Avatar, Box, Card } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { round } from "../utils";
import Marker from "../map/Marker";

function RestaurantDistance({ restaurant }) {
  if (!restaurant.distance) {
    return null;
  }

  if (restaurant.distance < 1) {
    return <>({restaurant.distance * 1000}m)</>;
  }

  return <>({round(restaurant.distance, 1)}km)</>;
}

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

  function getStyle(isHover) {
    if (isHover) {
      return {
        borderLeft: "5px solid red",
      };
    }
    return {
      borderLeft: "5px solid transparent",
    };
  }

  return (
    <Card
      className="RestaurantListItem"
      elevation={1}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // style={getStyle(isHover)}
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
