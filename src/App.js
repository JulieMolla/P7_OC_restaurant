import React from "react";
import "./App.css";
import SimpleMap from "./map/SimpleMap";
import SearchBar from "./restaurant/SearchBar";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import Footer from "./Footer";
import RestaurantView from "./restaurant/RestaurantView";

/**
 * Component principale de l'application
 * Permet de définir la disposition des éléments principaux de l'interface
 * (navbar, search bar, main, footer)
 */
function App() {
  return (
    <>
      {/* Container */}
      <Box component="div" className="container">
        {/* Navbar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Avis Restaurants</Typography>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <Box component="div" zIndex={1} boxShadow={2} p={5}>
          <SearchBar />
        </Box>

        {/* Main */}
        <Box
          component="div"
          css={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflowY: "scroll",
          }}
        >
          {/* Map */}
          <SimpleMap />

          {/* Vue (liste, détail, formulaire) */}
          <Box component="div" className="sideBar">
            <RestaurantView />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
