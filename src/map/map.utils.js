import { GOOGLE_API_KEY } from "./google-api-key";

export function getStreetViewImage(lat, lng) {
  return `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export function fetchReverseGeocoding(lat, lng) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  ).then((response) => response.json());
}
