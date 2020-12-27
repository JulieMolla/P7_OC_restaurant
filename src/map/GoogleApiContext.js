import React, { Component, createContext } from "react";

export const GoogleApiContext = createContext();

class GoogleApiContextProvider extends Component {
  state = {
    initialCenter: { lat: 48.8534, lng: 2.3488 },
    initialZoom: 12,
    position: null,
  };

  onGoogleApiLoaded = ({ map, maps }) => {
    const places = new maps.places.PlacesService(map);
    const geocoder = new maps.Geocoder();

    this.setState({
      map,
      maps,
      places,
      geocoder,
    });
  };

  resetMapToInitialState = () => {
    const { map, initialCenter, initialZoom } = this.state;
    this.deleteExistingMarker();
    map.setCenter(initialCenter);
    map.setZoom(initialZoom);

    this.setState({
      position: null,
      hasMoreResults: false,
      loadMoreResults: null,
    });
  };

  clearPosition = () => {
    this.setState({ position: null });
  };

  deleteExistingMarker() {
    if (this.state.marker) {
      this.state.marker.setMap(null);
      this.setState({ marker: null });
    }
  }

  setPositionMarkerAndPan = (position) => {
    const { maps, map } = this.state;
    this.deleteExistingMarker();
    const marker = new maps.Marker({
      position,
      map,
    });
    this.setState({ marker, position, pagination: null });

    map.setCenter(position);
    map.setZoom(14);
  };

  searchAroundPosition = (position, onResults) => {
    const { geocoder } = this.state;

    this.setPositionMarkerAndPan(position);

    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const result = results[0];

          this.searchNearby((results) => {
            onResults(results, result.formatted_address);
          });
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };

  searchAroundAddress = (address, onResults) => {
    const { geocoder } = this.state;
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const result = results[0];

          this.setPositionMarkerAndPan(result.geometry.location.toJSON());

          this.searchNearby((results) => {
            onResults(results, result.formatted_address);
          });
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };

  searchNearby = (onResults) => {
    const request = {
      bounds: this.state.map.getBounds(),
      type: "restaurant",
    };

    this.state.places.nearbySearch(request, (results, status, pagination) => {
      if (status === "OK") {
        const restaurants = results.map((result) => {
          const location = result.geometry.location.toJSON();
          return {
            id: result.place_id,
            restaurantName: result.name,
            address: result.vicinity,
            lat: location.lat,
            long: location.lng,
            ratings: [],
            rating: result.rating,
            totalRatings: result.user_ratings_total,
            from: "search",
          };
        });

        onResults(restaurants);

        this.setState({ pagination });
      }
    });
  };

  render() {
    return (
      <GoogleApiContext.Provider
        value={{
          ...this.state,
          onGoogleApiLoaded: this.onGoogleApiLoaded,
          searchAroundPosition: this.searchAroundPosition,
          searchAroundAddress: this.searchAroundAddress,
          searchNearby: this.searchNearby,
          resetMapToInitialState: this.resetMapToInitialState,
          clearPosition: this.clearPosition,
        }}
      >
        {this.props.children}
      </GoogleApiContext.Provider>
    );
  }
}

export default GoogleApiContextProvider;
