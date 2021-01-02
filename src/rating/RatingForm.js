import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Box, Button, TextField } from "@material-ui/core";

const RatingForm = ({ onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (comment === "" || stars === 0) {
      setHasError(true);
      return;
    }
    onSubmit({ stars: stars, comment: comment });
    setStars(0);
    setComment("");
    setHasError(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Rating
        name="stars"
        value={stars}
        onChange={(event, newValue) => {
          setStars(newValue);
        }}
      />

      <Box component="div" mb={1}>
        <TextField
          id="comment"
          label="Commentaire"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          style={{ width: "100%" }}
        />
      </Box>

      <Button type="submit" variant="contained">
        Envoyer
      </Button>

      {hasError && (
        <p style={{ color: "#f44336" }}>
          Veuillez entrer un commentaire et une note.
        </p>
      )}
    </form>
  );
};

export default RatingForm;
