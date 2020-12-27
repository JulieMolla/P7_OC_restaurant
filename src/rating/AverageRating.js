import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { calculateAverageRating } from "../restaurant/restaurant.utils";
import { round } from "../utils";

function AverageRating({ restaurant }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const result = calculateAverageRating(restaurant);
    setAverageRating(result);
  }, [restaurant]);

  return (
    <>
      <Rating
        name="read-only"
        value={averageRating}
        readOnly
        precision={0.5}
        size="small"
      />
      ({round(averageRating, 1)})
    </>
  );
}

export default AverageRating;
