import React from "react";
import Rating from '@material-ui/lab/Rating';


export function RatingList({
    restaurant
}) {
    return <ul>
        {restaurant.ratings.map((rating, index) => <li key={index}> <Rating name="read-only" value={rating.stars} readOnly precision={0.5} size="small" />
            {rating.comment}
        </li>)}
    </ul>;
}
