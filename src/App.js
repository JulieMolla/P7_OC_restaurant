import React, { useContext } from "react";
import "./App.css";
import SimpleMap from "./map/SimpleMap";
import RestaurantDetail from "./restaurant/RestaurantDetail";
import RestaurantForm from "./restaurant/RestaurantForm";
import FilteredRestaurantList from "./restaurant/FilteredRestaurantList";
import { RestaurantContext } from "./restaurant/RestaurantContext";
import SearchBar from "./restaurant/SearchBar";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

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
            <Typography variant="h6">Avis</Typography>
          </Toolbar>
        </AppBar>
        <Box component="div" p={5}>
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

          <div className="sideBar">
            <RestaurantView view={view} />
          </div>
        </Box>
      </Box>
      <footer>Footer</footer>
    </>
  );
}

export default App;
