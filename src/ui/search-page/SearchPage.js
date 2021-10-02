import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { SearchInput } from './SearchInput';
import { SearchPagination } from './SearchPagination';

const useStyles = makeStyles({
  box: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
});

/** Search page shows search input and paginated search results */
export const SearchPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.box}>
        <SearchInput />
      </Box>
      <SearchPagination />
    </>
  );
};
