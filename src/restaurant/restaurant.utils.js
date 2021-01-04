/**
 * calcule la note moyenne du restaurant
 * @param {*} restaurant
 */
export function calculateAverageRating(restaurant) {
  const div = Math.max(
    (restaurant.totalRatings || 0) + // nombre de notes venant de google
      ((restaurant.ratings && restaurant.ratings.length) || 0), // nombre de commentaires de l'objet restaurant (json + créés depuis l'app)
    1 // Utilise Math.max pour éviter les divisions par zéro
  );

  if (!restaurant.ratings) {
    // s'il n'y a pas de commentaires
    return restaurant.rating || 0; // retourne la note provenant de google, 0 sinon
  }

  let totalRating = restaurant.rating * restaurant.totalRatings || 0; // initialise le total des notes avec les notes de google
  for (let index = 0; index < restaurant.ratings.length; index++) {
    // ajoute les notes de chaque commentaires au total
    const rating = restaurant.ratings[index];
    totalRating += rating.stars;
  }
  return totalRating / div; // divise pour obtenir la moyenne
}
