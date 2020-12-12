import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { GOOGLE_API_KEY } from "./google-api-key";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.8534,
      lng: 2.3488,
    },
    zoom: 14,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.restaurants.map((restaurant) => (
            <Marker
              key={restaurant.restaurantName}
              lat={restaurant.lat}
              lng={restaurant.long}
              text={restaurant.restaurantName}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
