import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  box: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
  },
});

/** Homepage */
export const Home = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h5">Home - TO DO</Typography>
    </Box>
  );
};
