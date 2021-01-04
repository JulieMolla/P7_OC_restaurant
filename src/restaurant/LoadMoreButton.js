import { Box, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GoogleApiContext } from "../map/GoogleApiContext";

/**
 * Component permettant de charger plus de résultat lors d'une recherche avec l'api google
 */
function LoadMoreButton() {
  const { pagination } = useContext(GoogleApiContext); // Récupère l'objet pagination provenant de la callback de l'api google
  const [isButtonVisible, setIsButtonVisible] = useState(false); // état du bouton
  const [isLoading, setIsLoading] = useState(false);

  // hook pour mettre à jour l'état du bouton
  useEffect(() => {
    if (pagination) {
      setIsButtonVisible(pagination.hasNextPage); // s'il y a une page suivante le bouton est visible
      setIsLoading(false); // le bouton est actif
    }
  }, [pagination]);

  /**
   * permet de charger plus de résultat lorsqu'on clique sur le bouton
   */
  function handleClick() {
    if (!pagination) {
      return;
    }
    setIsLoading(true); // désactive le bouton
    if (pagination.hasNextPage) {
      pagination.nextPage(); // Charge les résultats suivant
    }
  }

  if (!isButtonVisible) {
    // si le bouton n'est pas visible, retourner null pour ne rien afficher
    return null;
  }

  return (
    <Box component="div" css={{ textAlign: "center", marginBottom: 20 }}>
      <Button variant="contained" disabled={isLoading} onClick={handleClick}>
        Charger plus de resultats
      </Button>
    </Box>
  );
}

export default LoadMoreButton;
