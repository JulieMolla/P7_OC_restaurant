export function calculateAverageRating(restaurant) {
  // if (!ratings || !ratings.length) {
  //   return 0;
  // }

  const div = Math.max(
    (restaurant.totalRatings || 0) +
      ((restaurant.ratings && restaurant.ratings.length) || 0),
    1
  );

  if (!restaurant.ratings) {
    return restaurant.rating || 0;
  }

  let totalRating = restaurant.rating * restaurant.totalRatings || 0;
  for (let index = 0; index < restaurant.ratings.length; index++) {
    const rating = restaurant.ratings[index];
    totalRating += rating.stars;
  }
  return totalRating / div;
}
