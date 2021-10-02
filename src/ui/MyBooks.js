import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  box: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
});

/** My Books page */
export const MyBooks = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h5">My Books - TO DO</Typography>
    </Box>
  );
};
