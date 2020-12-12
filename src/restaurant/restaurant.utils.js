export function calculateAverageRating(ratings) {
    let totalRating = 0;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        totalRating += rating.stars;
    }
    return totalRating / ratings.length;
}