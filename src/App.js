import './App.css';
import SimpleMap from './map/SimpleMap';
import RestaurantList from './restaurant/RestaurantList'
import restaurantsData from './restaurant/restaurants.json'
import RestaurantDetail from './restaurant/RestaurantDetail';
import { useState, useEffect } from 'react';
import RestaurantFilter from './restaurant/RestaurantFilter'
import { calculateAverageRating } from "./restaurant/restaurant.utils";


function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filter, setFilter] = useState({ rating: [0, 5] });
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const filteredRestaurant = restaurants.filter(restaurant => {
      const rating = calculateAverageRating(restaurant.ratings)
      console.log(restaurant.restaurantName, rating)
      return filter.rating[0] <= rating && rating <= filter.rating[1]
    })
    setFilteredRestaurants(filteredRestaurant)
  }, [filter, restaurants])

  function handleSelectRestaurant(restaurant) {
    console.log(restaurant)
    setSelectedRestaurant(restaurant);
  }

  function handleCloseRestaurant(closedRestaurant) {
    console.log("toto", closedRestaurant)
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.restaurantName != closedRestaurant.restaurantName) {
        return restaurant;
      } else {
        return closedRestaurant;
      }
    })

    setRestaurants(updatedRestaurants)
    setSelectedRestaurant(null);

  }


  let listOrDetail;
  if (selectedRestaurant) {
    listOrDetail = <RestaurantDetail restaurant={selectedRestaurant} onClose={handleCloseRestaurant} />;
  }
  else {
    listOrDetail = <>
      <RestaurantFilter value={filter.rating} onChangeFilter={value => setFilter({ rating: value })} />

      <RestaurantList restaurants={filteredRestaurants} onClickItem={handleSelectRestaurant} />
    </>
  }


  return (
    <>
      <header>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <SimpleMap restaurants={filteredRestaurants} />

        <div className="sideBar">

          {listOrDetail}
        </div>
      </main>
    </>
  );
}

export default App;
