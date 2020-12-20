import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import DropDownMenu from "./DropDownMenu";
import { GOOGLE_API_KEY } from "./google-api-key";

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 12,
  };

  constructor(props) {
    super(props);
    this.state = { dropDownMenu: null };
  }

  handleClickMap = (params) => {
    if (this.state.dropDownMenu) {
      this.setState({ dropDownMenu: null });
    } else {
      this.setState({ dropDownMenu: params });
    }
  };

  handleCreateRestaurant = () => {
    this.props.onCreateRestaurant({
      lat: this.state.dropDownMenu.lat,
      long: this.state.dropDownMenu.lng,
    });
    this.setState({ dropDownMenu: null });
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY, libraries: ["places"] }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            const placesService = new maps.places.PlacesService(map);
            this.props.onMap(map);
            this.props.onGoogleApi({
              maps,
              places: placesService,
            });
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.handleClickMap}
        >
          {this.props.restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              lat={restaurant.lat}
              lng={restaurant.long}
              index={index + 1}
              restaurant={restaurant}
              onClick={this.props.onSelectRestaurant}
              onHover={this.props.onHoverRestaurant}
            />
          ))}
        </GoogleMapReact>

        {this.state.dropDownMenu && (
          <DropDownMenu
            y={this.state.dropDownMenu.y}
            x={this.state.dropDownMenu.x}
            onCreateRestaurant={this.handleCreateRestaurant}
          />
        )}
      </div>
    );
  }
}

export default SimpleMap;
