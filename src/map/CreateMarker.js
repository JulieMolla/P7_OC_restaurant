import React from "react";
import AddLocationIcon from "@material-ui/icons/AddLocation";

/** Component, marker afficher sur la carte lors de la création d'un restaurant */
function CreateMarker() {
  return (
    <AddLocationIcon
      style={{
        fontSize: "50px",
        marginTop: "-60px",
        marginLeft: "-25px",
        color: "green",
      }}
    />
  );
}

export default CreateMarker;
