import { Box, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GoogleApiContext } from "../map/GoogleApiContext";

function LoadMoreButton() {
  const { pagination } = useContext(GoogleApiContext);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pagination) {
      setIsButtonVisible(pagination.hasNextPage);
      setIsLoading(false);
    }
  }, [pagination]);

  function handleClick() {
    if (!pagination) {
      return;
    }
    setIsLoading(true);
    if (pagination.hasNextPage) {
      pagination.nextPage();
    }
  }

  if (!isButtonVisible) {
    return null;
  }

  return (
    <Box component="div" css={{ textAlign: "center" }}>
      <Button variant="contained" disabled={isLoading} onClick={handleClick}>
        Charger plus de resultats
      </Button>
    </Box>
  );
}

export default LoadMoreButton;
