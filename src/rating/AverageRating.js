import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { calculateAverageRating } from "../restaurant/restaurant.utils";
import { round } from "../utils";

/**
 * Component affichant la note moyenne d'un restaurant
 * @param {*} param0
 */
function AverageRating({ restaurant }) {
  const [averageRating, setAverageRating] = useState(0); // valeur de la note moyenne

  // hook exécuter au changement de restaurant
  useEffect(() => {
    const result = calculateAverageRating(restaurant); // calcule la note moyenne
    setAverageRating(result); // modifie la valeur afficher par le component
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
      {/* Affiche une valeur arrondie à 1 décimale */}({round(averageRating, 1)}
      )
    </>
  );
}

export default AverageRating;
