import "./App.css";
import SimpleMap from "./map/SimpleMap";
import RestaurantList from "./restaurant/RestaurantList";
import restaurantsData from "./restaurant/restaurants.json";
import RestaurantDetail from "./restaurant/RestaurantDetail";
import { useState, useEffect } from "react";
import RestaurantFilter from "./restaurant/RestaurantFilter";
import { calculateAverageRating } from "./restaurant/restaurant.utils";
import RestaurantForm from "./restaurant/RestaurantForm";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantForm, setRestaurantForm] = useState(null);
  const [filter, setFilter] = useState({ rating: [0, 5] });
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const filteredRestaurant = restaurants.filter((restaurant) => {
      const rating = calculateAverageRating(restaurant.ratings);
      const min = filter.rating[0];
      const max = filter.rating[1];
      return (min <= rating && rating <= max) || restaurant.isCreating;
    });
    setFilteredRestaurants(filteredRestaurant);
  }, [filter, restaurants]);

  function handleSelectRestaurant(restaurant) {
    console.log("select", restaurant);

    const updatedRestaurants = restaurants
      .filter((restaurant) => !restaurant.isCreating)
      .map((restaurantItem) => {
        if (restaurant && restaurantItem.id === restaurant.id) {
          return { ...restaurantItem, isHover: false, isSelected: true };
        } else {
          return { ...restaurantItem, isSelected: false };
        }
      });

    setRestaurants(updatedRestaurants);
    setRestaurantForm(null);
    setSelectedRestaurant(restaurant);

    console.log(restaurants);
  }

  function handleCreateRestaurant(restaurant) {
    console.log("create", restaurant);
    const newRestaurant = { ...restaurant, id: Date.now(), isCreating: true, ratings: [] };
    setSelectedRestaurant(null);
    setRestaurantForm(newRestaurant);

    const updatedRestaurants = restaurants.map((restaurantItem) => {
      return { ...restaurantItem, isHover: false, isSelected: false };
    });

    setRestaurants([...updatedRestaurants, newRestaurant]);
  }

  function handleSaveRestaurant(closedRestaurant) {
    console.log("save", closedRestaurant);
    const updatedRestaurants = restaurants.map((restaurant) => {
      if (restaurant.id === closedRestaurant.id) {
        return { ...closedRestaurant, isHover: false, isSelected: false, isCreating: false };
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    setSelectedRestaurant(null);
    setRestaurantForm(null);
  }

  function handleCloseRestaurantForm() {
    const updatedRestaurants = restaurants.filter((restaurant) => !restaurant.isCreating);
    setRestaurants(updatedRestaurants);
    setRestaurantForm(null);
  }

  function handleHoverRestaurant(hoverRestaurant) {
    const updatedRestaurants = restaurants.map((restaurant) => {
      if (hoverRestaurant && restaurant.id === hoverRestaurant.id) {
        return { ...restaurant, isHover: true };
      } else {
        return { ...restaurant, isHover: false };
      }
    });

    setRestaurants(updatedRestaurants);
  }

  function getRestaurantView() {
    if (selectedRestaurant) {
      return <RestaurantDetail restaurant={selectedRestaurant} onClose={handleSaveRestaurant} />;
    } else if (restaurantForm) {
      return (
        <RestaurantForm restaurant={restaurantForm} onSave={handleSaveRestaurant} onClose={handleCloseRestaurantForm} />
      );
    } else {
      return (
        <>
          <RestaurantFilter value={filter.rating} onChangeFilter={(value) => setFilter({ rating: value })} />
          <RestaurantList
            restaurants={filteredRestaurants}
            onSelectRestaurant={handleSelectRestaurant}
            onHoverRestaurant={handleHoverRestaurant}
          />
        </>
      );
    }
  }

  return (
    <>
      <header></header>
      <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <SimpleMap
          restaurants={filteredRestaurants}
          onHoverRestaurant={handleHoverRestaurant}
          onSelectRestaurant={handleSelectRestaurant}
          onCreateRestaurant={handleCreateRestaurant}
        />

        <div className='sideBar'>{getRestaurantView()}</div>
      </main>
    </>
  );
}

export default App;
