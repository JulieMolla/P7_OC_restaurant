import RestaurantListItem from './RestaurantListItem';


function RestaurantList(props) {
    return (<ul>
        {
            props.restaurants.map(restaurant => (
                <RestaurantListItem
                    key={restaurant.restaurantName}
                    restaurant={restaurant}
                    onClick={props.onClickItem}
                />
            ))
        }
    </ul>)
}

export default RestaurantList;
