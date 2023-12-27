import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { Box } from '@mui/material';

const Loader = () => {

 const [timer, setTimer] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection= "column"
      alignItems="center"
      gap="10px"
      justifyContent="center"
      height="70vh" // Adjust the height as needed
    >
      <CircularProgress disableShrink />
      <p style={{fontWeight:"600", fontSize:"20px"}}>Please wait while loading...{timer}s</p>
    </Box>
  )
}

export default Loader