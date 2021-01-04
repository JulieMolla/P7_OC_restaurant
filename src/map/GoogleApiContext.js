import React, { Component, createContext } from "react";

// créer un context
export const GoogleApiContext = createContext();

/**
 * Wrapper component pour initialiser le context
 */
class GoogleApiContextProvider extends Component {
  state = {
    initialCenter: { lat: 48.8534, lng: 2.3488 }, // position initiale de la carte
    initialZoom: 12, // zoom initial de la carte
    position: null, // position de l'utilisateur ou de l'adresse recherchée
  };

  /**
   * Permet de récupérer la librairie google maps api au chargement de la carte
   */
  onGoogleApiLoaded = ({ map, maps }) => {
    const places = new maps.places.PlacesService(map); // initialise la librairie places
    const geocoder = new maps.Geocoder(); // initialise la librairie geocoding

    // ajoute les librairie au state pour les rendres accessble dans toute l'application
    this.setState({
      map,
      maps,
      places,
      geocoder,
    });
  };

  /**
   * Réinitialise la carte à son état initial
   */
  resetMapToInitialState = () => {
    const { map, initialCenter, initialZoom } = this.state;
    this.deleteExistingMarker(); // supprime le marker de position existant
    map.setCenter(initialCenter); // déplace la carte à la position initiale
    map.setZoom(initialZoom); // rétablit le zoom initial

    // réinitialise la position de l'utilisateur et les données liées à la pagination de la recherche
    this.setState({
      position: null,
      hasMoreResults: false,
      loadMoreResults: null,
    });
  };

  /**
   * efface la donnée correspondant à la position de l'utilisateur ou sa recherche
   */
  clearPosition = () => {
    this.setState({ position: null });
  };

  /**
   * Supprime le marker indiquant la position de l'utilisateur ou la recherche
   */
  deleteExistingMarker() {
    if (this.state.marker) {
      // si un marker existe
      this.state.marker.setMap(null); // retire le marker de la carte
      this.setState({ marker: null }); // efface l'objet marker en mémoire
    }
  }

  /**
   * Créer un marker et zoom à l'endroit où il est positionné
   * @param {*} position
   */
  setPositionMarkerAndPan = (position) => {
    const { maps, map } = this.state;
    this.deleteExistingMarker(); // supprime le précédent marker

    // instancie un nouveau marker et le place sur la carte
    const marker = new maps.Marker({
      position,
      map,
    });

    // garde
    this.setState({ marker, position, pagination: null });

    // déplacement et zoom sur la position du marker
    map.setCenter(position);
    map.setZoom(14);
  };

  /**
   *
   * @param {*} position
   * @param {*} onResults:
   */
  searchAroundPosition = (position, onResults) => {
    const { geocoder } = this.state;

    // créé un marker et déplace la carte
    this.setPositionMarkerAndPan(position);

    // lance une requête pour récupérer l'adresse correspondant à la position
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        // l'api a répondu correctement
        if (results[0]) {
          // s'il y a 1 résultat
          const result = results[0];

          // lance la recherche de restaurant
          this.searchNearby((results) => {
            // callback exécutée à la reception des résultats
            // on exécute la callback passée en paramètre pour retourner les resultats et l'adresse
            onResults(results, result.formatted_address);
          });
        } else {
          // Pas d'adresse à la position
          console.warn("No results found");
        }
      } else {
        // la requête geocoder a échoué
        console.warn("Geocoder failed due to: " + status);
      }
    });
  };

  searchAroundAddress = (address, onResults) => {
    const { geocoder } = this.state;

    // lance une requête pour récupérer la position correspondant à l'adresse
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        // l'api a répondu correctement
        if (results[0]) {
          // s'il y a 1 résultat
          const result = results[0];

          // créé un marker et déplace la carte
          this.setPositionMarkerAndPan(result.geometry.location.toJSON());

          // lance la recherche de restaurant
          this.searchNearby((results) => {
            // callback exécutée à la reception des résultats
            // on exécute la callback passée en paramètre pour retourner les resultats et l'adresse
            onResults(results, result.formatted_address);
          });
        } else {
          // Pas d'adresse à la position
          window.alert("No results found");
        }
      } else {
        // la requête geocoder a échoué
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };

  /**
   * Recherche les restaurants à proximité de la position
   * @param {*} onResults: callback a exécuter pour renvoyer les résultats
   */
  searchNearby = (onResults) => {
    // initialise un objet requête
    const request = {
      bounds: this.state.map.getBounds(), // recherche dans les limites de la carte
      type: "restaurant", // recherche les établissements de type restaurant
    };

    // lance la recherche
    this.state.places.nearbySearch(request, (results, status, pagination) => {
      if (status === "OK") {
        // l'api a répondu correctement

        // transforme les resultats de recherche pour les avoir sous la même forme que dans l'application
        const restaurants = results.map((result) => {
          const location = result.geometry.location.toJSON();

          return {
            id: result.place_id,
            placeId: result.place_id, // id google
            restaurantName: result.name,
            address: result.vicinity,
            lat: location.lat,
            long: location.lng,
            ratings: [], // initialise le tableau contenant les commentaires créer depuis l'app
            rating: result.rating, // note moyenne dans google
            totalRatings: result.user_ratings_total, // nombre total de notes venant de google
            from: "search", // permet d'identifier les restaurants provenant de la recherche google
          };
        });

        // renvoie les résultats grâce à la callback passée en paramètre
        onResults(restaurants);

        // garde une référence vers l'objet pagination pour obtenir plus de résultat plus tard
        this.setState({ pagination });
      }
    });
  };

  /**
   * Récupère des informations détaillées sur le restaurant
   * @param {*} restaurant: restaurant pour lequel obtenir le detail depuis google
   * @param {*} onReviews: callback pour récupérer les commentaires google
   */
  getDetail = (restaurant, onReviews) => {
    const { placeId } = restaurant;

    if (!placeId) {
      // si ce n'est pas un restaurant venant de google
      onReviews([]); // on exécute la callback avec un tableau vide car il n'y a pas commentaires google
      return;
    }

    // paramètres pour la requête détail
    const request = {
      placeId, // id du restaurant dans google
      fields: ["reviews"], // on souhaite récupérer uniquement le champs "reviews"
    };

    // lance la requête détail
    this.state.places.getDetails(request, (place, status) => {
      if (status === "OK") {
        // transforme les commentaires venant de google dans le format utilisé par l'application
        const reviews = place.reviews.map((review) => ({
          stars: review.rating,
          comment: review.text,
        }));

        // exécute la callback pour renvoyer les commentaires google
        onReviews(reviews);
      }
    });
  };

  render() {
    return (
      <GoogleApiContext.Provider
        value={{
          // rend accessible toutes les propriétés du state
          ...this.state,
          // rend accessible les méthodes
          onGoogleApiLoaded: this.onGoogleApiLoaded,
          searchAroundPosition: this.searchAroundPosition,
          searchAroundAddress: this.searchAroundAddress,
          searchNearby: this.searchNearby,
          resetMapToInitialState: this.resetMapToInitialState,
          clearPosition: this.clearPosition,
          getDetail: this.getDetail,
        }}
      >
        {/* affiche les components fils */}
        {this.props.children}
      </GoogleApiContext.Provider>
    );
  }
}

export default GoogleApiContextProvider;
