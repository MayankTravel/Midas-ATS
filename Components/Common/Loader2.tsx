import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader2() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="10px"
      justifyContent="center"
      height="70vh" // Adjust the height as needed
    >
      <CircularProgress disableShrink />
    </Box>
  );
}
