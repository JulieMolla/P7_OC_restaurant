import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";

/**
 * Component, menu contextuel pour créer un restaurant au clique sur la carte
 * @prop {*} x: position sur la carte
 * @prop {*} y: position sur la carte
 * @prop {*} onCreateRestaurant: callback
 */
function DropDownMenu({ x, y, onCreateRestaurant }) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "white",
      }}
    >
      <MenuList>
        <MenuItem onClick={onCreateRestaurant}>
          {" "}
          Ajouter un restaurant ici{" "}
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default DropDownMenu;
