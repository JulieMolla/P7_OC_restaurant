import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Button, TextField } from "@material-ui/core";

const RatingForm = ({ onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ stars: stars, comment: comment });
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
      <TextField
        id='comment'
        label='Commentaire'
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />

      <Rating
        name='stars'
        value={stars}
        onChange={(event, newValue) => {
          setStars(newValue);
        }}
      />

      <Button type='submit' variant='contained'>
        Envoyer
      </Button>
    </form>
  );
};

export default RatingForm;
