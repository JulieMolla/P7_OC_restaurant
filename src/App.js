import './App.css';
import SimpleMap from './map/SimpleMap';
import RestaurantList from './restaurant/RestaurantList'
import restaurants from './restaurant/restaurants.json'
import RestaurantDetail from './restaurant/RestaurantDetail';
import { useState } from 'react';
import RestaurantFilter from './restaurant/RestaurantFilter'
import { calculateAverageRating } from "./restaurant/restaurant.utils";


function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filter, setFilter] = useState({ rating: [0, 5] });

  const filteredRestaurant = restaurants.filter(restaurant => {
    const rating = calculateAverageRating(restaurant.ratings)
    console.log(restaurant.restaurantName, rating)
    return filter.rating[0] <= rating && rating <= filter.rating[1]
  })

  function handleSelectRestaurant(restaurant) {
    console.log(restaurant)
    setSelectedRestaurant(restaurant);
  }


  let listOrDetail;
  if (selectedRestaurant) {
    listOrDetail = <RestaurantDetail restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />;
  }
  else {
    listOrDetail = <RestaurantList restaurants={filteredRestaurant} onClickItem={handleSelectRestaurant} />
  }


  return (
    <>
      <header>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <SimpleMap restaurants={filteredRestaurant} />

        <div className="sideBar">
          <RestaurantFilter value={filter.rating} onChangeFilter={value => setFilter({ rating: value })} />
          {listOrDetail}
        </div>
      </main>
    </>
  );
}

export default App;
