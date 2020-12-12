import React, { useState } from 'react'
import { Slider } from '@material-ui/core';


function RestaurantFilter(props) {
    const [value, setValue] = useState(props.value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            onChangeCommitted={() => props.onChangeFilter(value)}
            min={0}
            max={5}
        />
    )
}

export default RestaurantFilter
