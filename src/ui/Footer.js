import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    marginTop: '10px',
    position: 'relative',
    height: '100px',
    left: 0,
    bottom: 0,
    width: '100%',
  },
}));

/** Book Logger page footer */
export const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h6" align="center">
        Footer - TO DO
      </Typography>
    </Box>
  );
};
