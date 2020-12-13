import React from "react";
import { MenuList, MenuItem } from "@material-ui/core";

function DropDownMenu({ x, y, onCreateRestaurant }) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "grey",
      }}
    >
      <MenuList>
        <MenuItem onClick={onCreateRestaurant}> Ajouter un restaurant ici </MenuItem>
      </MenuList>
    </div>
  );
}

export default DropDownMenu;
