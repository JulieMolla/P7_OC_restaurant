import React, { useState } from "react";
import { Box, Slider } from "@material-ui/core";

import "./RestaurantFilter.css";

function RestaurantFilter({ onFilter }) {
  const [value, setValue] = useState([0, 5]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeCommitted() {
    onFilter(value);
  }

  return (
    <Box component="div" boxShadow={2} className="RestaurantFilter">
      Affiner par note moyenne :
      <Slider
        marks={[
          { value: 0, label: "0" },
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
        ]}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        onChangeCommitted={handleChangeCommitted}
        min={0}
        max={5}
      />
    </Box>
  );
}

export default RestaurantFilter;
