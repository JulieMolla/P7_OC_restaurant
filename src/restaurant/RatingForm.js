import React, { useRef, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { Button, TextField } from '@material-ui/core';



const RatingForm = props => {
    const commentInput = useRef()
    const [stars, setStars] = useState(0)

    function handleSubmit(event) {
        event.preventDefault()
        console.log("newRating", stars, commentInput.current.value)
    }

    return (<form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField id="comment" label="Commentaire" inputRef={commentInput} />

        <Rating name="stars" value={stars} onChange={(event, newValue) => {
            setStars(newValue);
        }} />

        <Button type="submit" variant="contained">
            Envoyer
                </Button>
    </form>);
};

export default RatingForm
