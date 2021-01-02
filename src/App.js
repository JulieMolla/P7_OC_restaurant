import React, { useContext } from "react";
import "./App.css";
import SimpleMap from "./map/SimpleMap";
import RestaurantDetail from "./restaurant/RestaurantDetail";
import RestaurantForm from "./restaurant/RestaurantForm";
import FilteredRestaurantList from "./restaurant/FilteredRestaurantList";
import { RestaurantContext } from "./restaurant/RestaurantContext";
import SearchBar from "./restaurant/SearchBar";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import Footer from "./Footer";

function RestaurantView({ view }) {
  if (view === "DETAIL") {
    return <RestaurantDetail />;
  } else if (view === "FORM") {
    return <RestaurantForm />;
  } else {
    return (
      <>
        <FilteredRestaurantList />
      </>
    );
  }
}

function App() {
  const { view } = useContext(RestaurantContext);

  return (
    <>
      <Box component="div" className="container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Avis Restaurants</Typography>
          </Toolbar>
        </AppBar>
        <Box component="div" zIndex={1} boxShadow={2} p={5}>
          <SearchBar />
          {/* <SearchForm /> */}
        </Box>
        <Box
          component="div"
          css={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflowY: "scroll",
          }}
        >
          <SimpleMap />

          <Box component="div" className="sideBar">
            <RestaurantView view={view} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;
