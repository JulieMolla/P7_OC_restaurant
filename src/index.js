import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GoogleApiContextProvider from "./map/GoogleApiContext";
import RestaurantContextProvider from "./restaurant/RestaurantContext";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* Encapsulation de l'app par les contextes pour avoir accès aux contextes dans tous les components de l'application */}
    <GoogleApiContextProvider>
      <RestaurantContextProvider>
        <App />
      </RestaurantContextProvider>
    </GoogleApiContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
