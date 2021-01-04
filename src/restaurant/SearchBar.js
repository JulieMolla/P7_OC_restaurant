import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CurrentLocationButton from "../map/CurrentLocationButton";
import { GoogleApiContext } from "../map/GoogleApiContext";
import { RestaurantContext } from "./RestaurantContext";
import { Button } from "@material-ui/core";

// créer une fonction générant un objet style basé sur le theme material-ui
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

/**
 * Component pour la barre de recherche
 */
function SearchBar() {
  const classes = useStyles(); // récupère les styles du component

  const [address, setAddress] = useState(""); // valeur du champs adress

  // récupération des contexts
  const google = useContext(GoogleApiContext);
  const {
    clearSearchResults,
    addRestaurants,
    setListView,
    setLoading,
  } = useContext(RestaurantContext);

  /**
   * éxecuté après le resultat de la géolocalisation obtenu après le clique sur le bouton geolocalisation
   * @param {*} position
   */
  function handleLocation(position) {
    setLoading(true); // active l'état "en chargement"
    clearSearchResults(); // efface les résultats de recherché précédent

    // lance la recherche autour de la position
    // la fonction search around position encapsule l'api places et geocoding pour récupérer l'adresse en plus des restaurants
    google.searchAroundPosition(position, (results, address) => {
      // callback exécuté lorsque l'api google renvoit des résultats
      setAddress(address); // rempli le champs adress
      addRestaurants(results); // ajoute les resultats de la recherche à la liste de tous les restaurants
      setLoading(false); // désactive l'état "en chargement"
    });

    setListView(); // Change la vue
  }

  /**
   *
   */
  function handleSearchAddress(event) {
    event.preventDefault(); // empêche l'événement submit par défaut du formulaire de s'exécuter
    setLoading(true); // active l'état "en chargement"
    clearSearchResults(); // efface les résultats de recherché précédent

    // lance la recherche par adresse
    google.searchAroundAddress(address, (results, address) => {
      // callback exécuté lorsque l'api google renvoit des résultats
      setAddress(address);
      addRestaurants(results);
      setLoading(false);
    });

    setListView();
  }

  /**
   * Réinitialise les résultats de la recherche et la carte à l'état initial (conserve les restaurants créés manuellement)
   */
  function resetSearch() {
    clearSearchResults();
    setAddress("");
    google.resetMapToInitialState();
    setListView();
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
