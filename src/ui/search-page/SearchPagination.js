import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SearchResults } from './SearchResults';
import { SearchContext } from '../../context/SearchContext';
import { openLibrarySearchUrl } from '../../config/api';

const resultsPerPage = 10;

const useStyles = makeStyles({
  stack: { margin: '10px 0' },
});

/** Component that handles pagination and displays search results */
export const SearchPagination = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(SearchContext);
  const {
    searchResults,
    resultsNumber,
    fetchedPage,
    searchType,
    queryText,
    pageNumber,
    isLoading,
  } = state;

  const numberOfPages = Math.ceil(resultsNumber / resultsPerPage);

  const handleChange = async (event, page) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    if (page * resultsPerPage > Math.ceil(searchResults.length / 10) * 10) {
      dispatch({ type: 'isLoading' });
      await fetch(openLibrarySearchUrl(searchType, queryText, fetchedPage + 1))
        .then((response) => response.json())
        .then((response) => {
          dispatch({ type: 'searchResults', data: [...response.docs] });
          dispatch({ type: 'resultsNumber', data: response.numFound });
          dispatch({ type: 'fetchedPage', data: fetchedPage + 1 });
        })
        .catch((error) => console.log(error));
    }
    await dispatch({ type: 'pageNumber', data: page });
    dispatch({ type: 'notLoading' });
  };

  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center">
        {searchResults.length > 0 ? (
          <SearchResults
            searchResults={searchResults.slice(
              (pageNumber - 1) * resultsPerPage,
              pageNumber * resultsPerPage
            )}
            isLoading={isLoading}
          />
        ) : resultsNumber === 0 ? (
          'No results'
        ) : (
          ''
        )}
      </Grid>

      {numberOfPages > 0 && (
        <Grid container item xs={12} justifyContent="center">
          <Stack spacing={2} className={classes.stack}>
            <Pagination
              count={numberOfPages}
              page={pageNumber}
              siblingCount={4}
              boundaryCount={0}
              shape="rounded"
              variant="outlined"
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
