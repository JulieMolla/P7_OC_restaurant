import React, { useState } from "react";
import { Slider } from "@material-ui/core";

function RestaurantFilter(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
      onChangeCommitted={() => props.onChangeFilter(value)}
      min={0}
      max={5}
    />
  );
}

export default RestaurantFilter;
