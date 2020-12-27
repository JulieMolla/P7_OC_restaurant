import React, { useState, useEffect, useContext } from "react";
import GoogleMapReact from "google-map-react";
import DropDownMenu from "./DropDownMenu";
import { GOOGLE_API_KEY } from "./google-api-key";
import { GoogleApiContext } from "./GoogleApiContext";
import { RestaurantContext } from "../restaurant/RestaurantContext";
import Marker from "./Marker";
import CreateMarker from "./CreateMarker";
import { Button } from "@material-ui/core";
import SearchZoneButton from "./SearchZoneButton";

function SimpleMap({ zoom = 12, ...props }) {
  const [createMarker, setCreateMarker] = useState(undefined);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const google = useContext(GoogleApiContext);
  const { selected, displayed, view, setFormView, setListView } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    if (view !== "FORM") {
      setCreateMarker(undefined);
    }
  }, [view]);

  function handleClickMap(params) {
    if (selected || createMarker) {
      setCreateMarker(undefined);
      setDropdownMenu(false);
      setListView();
    } else {
      setCreateMarker(params);
      setDropdownMenu(true);
    }
  }

  function handleCreateRestaurant() {
    setDropdownMenu(false);

    google.geocoder.geocode({ location: createMarker }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const address = results[0].formatted_address;
          setFormView({
            lat: createMarker.lat,
            long: createMarker.lng,
            address,
          });
        } else {
          setFormView({
            lat: createMarker.lat,
            long: createMarker.lng,
          });
        }
      } else {
        setFormView({
          lat: createMarker.lat,
          long: createMarker.lng,
        });
      }
    });
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY, libraries: ["places"] }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={google.onGoogleApiLoaded}
        defaultCenter={google.initialCenter}
        defaultZoom={google.initialZoom}
        onClick={handleClickMap}
      >
        {displayed.map((restaurant, index) => (
          <Marker
            key={index}
            lat={restaurant.lat}
            lng={restaurant.long}
            restaurant={restaurant}
          >
            {index + 1}
          </Marker>
        ))}
        {createMarker && (
          <CreateMarker lat={createMarker.lat} lng={createMarker.lng} />
        )}
      </GoogleMapReact>

      <SearchZoneButton />

      {dropdownMenu && createMarker && (
        <DropDownMenu
          y={createMarker.y}
          x={createMarker.x}
          onCreateRestaurant={handleCreateRestaurant}
        />
      )}
    </div>
  );
}

export default SimpleMap;
