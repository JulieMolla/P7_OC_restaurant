import React, { useState, useEffect, useContext } from "react";
import GoogleMapReact from "google-map-react";
import DropDownMenu from "./DropDownMenu";
import { GOOGLE_API_KEY } from "./google-api-key";
import { GoogleApiContext } from "./GoogleApiContext";
import { RestaurantContext } from "../restaurant/RestaurantContext";
import Marker from "./Marker";
import CreateMarker from "./CreateMarker";
import SearchZoneButton from "./SearchZoneButton";

/**
 * Component affichant la carte
 * @param {*} param0
 */
function SimpleMap() {
  const [createMarker, setCreateMarker] = useState(undefined); // marker affiché lors de la création
  const [dropdownMenu, setDropdownMenu] = useState(false); // menu contextuel

  const google = useContext(GoogleApiContext);
  const { selected, displayed, view, setFormView, setListView } = useContext(
    RestaurantContext
  );

  // hook exécuter au changement de vue pour supprimer le marker de création, au passage au mode liste et détail
  useEffect(() => {
    if (view !== "FORM") {
      setCreateMarker(undefined);
    }
  }, [view]);

  /**
   * Au clique sur la carte, créer le marker de création et le menu contextuel, ou les supprimes s'ils sont déjà présents
   * @param {*} params: position sur la carte
   */
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

  /**
   * Au clique sur le menu contextuel pour créer un restaurant
   * Activ
   */
  function handleCreateRestaurant() {
    setDropdownMenu(false); // ferme le menu

    // lance une requête pour récupérer l'adresse correspondant au marker de création
    google.geocoder.geocode({ location: createMarker }, (results, status) => {
      if (status === "OK") {
        // si la réponse est valide
        if (results[0]) {
          // s'il y a des résultats
          const address = results[0].formatted_address; // Récupère l'adresse du premier resultat

          // active la vue formulaire, avec un restaurant correspondant à la position et l'adresse
          setFormView({
            lat: createMarker.lat,
            long: createMarker.lng,
            address,
          });
        } else {
          // pas de résultat pour l'adresse
          // active la vue formulaire
          setFormView({
            lat: createMarker.lat,
            long: createMarker.lng,
          });
        }
      } else {
        // erreur lors de la requête pour l'adresse
        // active la vue formulaire
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
