import React from 'react'
import { calculateAverageRating } from "./restaurant.utils";
import Rating from '@material-ui/lab/Rating';


function RestaurantListItem(props) {
    const restaurant = props.restaurant;
    const averageRating = Math.round(calculateAverageRating(restaurant.ratings) * 10) / 10;
    return (
        <li onClick={() => props.onClick(restaurant)}>
            {restaurant.restaurantName}
            <Rating name="read-only" value={averageRating} readOnly precision={0.5} size="small" />
            ({ averageRating})
            {restaurant.address}
        </li>
    )
}

export default RestaurantListItem

