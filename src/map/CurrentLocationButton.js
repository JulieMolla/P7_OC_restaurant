import React, { useContext, useState } from "react";
import { GoogleApiContext } from "./GoogleApiContext";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import IconButton from "@material-ui/core/IconButton";

/**
 * Component, bouton de géolocalisation
 * @prop {*} onLocation
 */
function CurrentLocationButton({ onLocation, ...props }) {
  const [loadingCurrentLocation, setLoadingCurrent] = useState(false); // état du bouton (désactivé ou actif)

  const google = useContext(GoogleApiContext); // récupère le context

  /**
   * récupère la position de l'utilisateur
   */
  function setCurrentLocation() {
    if (navigator.geolocation) {
      setLoadingCurrent(true); // change l'état du bouton

      // Récupère la position de l'utilisateur grâce au navigateur
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // transforme la position pour google maps
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          onLocation(pos); // renvoie la position au component parent

          setLoadingCurrent(false); // change l'état du bouton
        },
        () => {
          setLoadingCurrent(false);
          console.warn("Erreur lors de la récupération de la position");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.warn("Le navigation ne support pas la géolocalisation");
    }
  }

  // on affiche le bouton seulement si le navigateur supporte la géolocalisation et si la map est chargée
  return (
    (navigator.geolocation && google.map && (
      <IconButton
        onClick={setCurrentLocation}
        {...props}
        disabled={loadingCurrentLocation}
      >
        {/* Change l'icone en fonction */}
        {loadingCurrentLocation ? <HourglassEmptyIcon /> : <MyLocationIcon />}
      </IconButton>
    )) ||
    null
  );
}

export default CurrentLocationButton;
