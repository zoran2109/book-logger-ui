import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles({
  progressBar: {
    width: '100%',
  },
});

/** Progress bar is displayed when data is fetched or in process of loading */
export const LinearProgressBar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.progressBar}>
      <LinearProgress />
    </Box>
  );
};
