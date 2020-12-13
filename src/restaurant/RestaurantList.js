import RestaurantListItem from "./RestaurantListItem";

function RestaurantList(props) {
  return (
    <ul>
      {props.restaurants.map((restaurant, index) => (
        <RestaurantListItem
          key={index}
          index={index + 1}
          restaurant={restaurant}
          onClick={props.onSelectRestaurant}
          onHover={props.onHoverRestaurant}
        />
      ))}
    </ul>
  );
}

export default RestaurantList;
