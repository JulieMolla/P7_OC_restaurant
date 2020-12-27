import React from "react";
import Rating from "@material-ui/lab/Rating";
import { List, ListItem, ListItemText } from "@material-ui/core";

export function RatingList({ ratings }) {
  return (
    <List>
      {ratings &&
        ratings.map((rating, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Rating
                  name="read-only"
                  value={rating.stars}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              }
              secondary={rating.comment}
            />
          </ListItem>
        ))}
    </List>
  );
}
