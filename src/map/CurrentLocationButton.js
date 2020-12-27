import React, { useContext, useState } from "react";
import { GoogleApiContext } from "./GoogleApiContext";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import IconButton from "@material-ui/core/IconButton";

function CurrentLocationButton({ onLocation, ...props }) {
  const [loadingCurrentLocation, setLoadingCurrent] = useState(false);

  const google = useContext(GoogleApiContext);

  function setCurrentLocation() {
    if (navigator.geolocation) {
      setLoadingCurrent(true);
      //   const infoWindow = new google.maps.InfoWindow();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocation(pos);

          //   const marker = new google.maps.Marker();
          //   marker.setPosition(pos);
          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(google.map);

          setLoadingCurrent(false);
        },
        () => {
          setLoadingCurrent(false);
          // handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  return (
    (navigator.geolocation && google.map && (
      <IconButton onClick={setCurrentLocation} {...props}>
        {loadingCurrentLocation ? <HourglassEmptyIcon /> : <MyLocationIcon />}
      </IconButton>
    )) ||
    null
  );
}

export default CurrentLocationButton;
