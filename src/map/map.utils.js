import { GOOGLE_API_KEY } from "./google-api-key";

export function getStreetViewImage(lat, lng) {
  return `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export function fetchReverseGeocoding(lat, lng) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  ).then((response) => response.json());
}

export function calculateDistance(p1, p2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(p2.lat - p1.lat); // deg2rad below
  var dLon = deg2rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(p1.lat)) *
      Math.cos(deg2rad(p2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
