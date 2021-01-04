import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Box, Button, TextField } from "@material-ui/core";

/**
 * Component affichant le formulaire d'ajout d'un commentaire
 * @prop {*} onSubmit: callback exécutée à l'envoie du formulaire
 */
const RatingForm = ({ onSubmit }) => {
  const [stars, setStars] = useState(0); // note du commentaire
  const [comment, setComment] = useState(""); // valeur du champ commentaire
  const [hasError, setHasError] = useState(false); // indique si le formulaire est en erreur

  /**
   * À l'envoi du formulaire
   */
  function handleSubmit(event) {
    event.preventDefault();

    // vérifie le formulaire
    if (comment === "" || stars === 0) {
      setHasError(true);
      return;
    }

    // envoi le formulaire
    onSubmit({ stars: stars, comment: comment });

    // réinitialise le formulaire
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
