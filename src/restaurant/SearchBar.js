import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import CurrentLocationButton from "../map/CurrentLocationButton";
import { fetchReverseGeocoding } from "../map/map.utils";
import { GoogleApiContext } from "../map/GoogleApiContext";
import { RestaurantContext } from "./RestaurantContext";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SearchBar() {
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null);
  const classes = useStyles();
  const google = useContext(GoogleApiContext);
  const { clearSearchResults, addRestaurants } = useContext(RestaurantContext);

  function handleLocation(position) {
    clearSearchResults();
    google.searchAroundPosition(position, (results, address) => {
      setAddress(address);
      addRestaurants(results);
    });
  }

  function handleSearchAddress(event) {
    event.preventDefault();
    clearSearchResults();
    google.searchAroundAddress(address, (results, address) => {
      setAddress(address);
      addRestaurants(results);
    });
  }

  function resetSearch() {
    clearSearchResults();
    setAddress("");
    google.resetMapToInitialState();
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridGap: "10px",
      }}
    >
      <Paper
        component="form"
        className={classes.root}
        onSubmit={handleSearchAddress}
      >
        {/* <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
            </IconButton> */}
        <InputBase
          className={classes.input}
          placeholder="Adresse"
          inputProps={{ "aria-label": "Adresse" }}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        {/* <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton> */}
        <CurrentLocationButton
          className={classes.iconButton}
          onLocation={handleLocation}
        />
      </Paper>
      <Paper component="form" className={classes.root}>
        <Button onClick={resetSearch}>Réinitialiser</Button>
      </Paper>
    </div>
  );
}

export default SearchBar;
