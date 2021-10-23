import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { BookCard } from './BookCard';

const useStyles = makeStyles({
  loading: {
    filter: 'blur(1px)',
  },
  loaded: { filter: 'none' },
});

/** Shows search results
 * @param {object} searchResults Object containing fetched book data
 */
export const SearchResults = ({ searchResults = [], isLoading = false }) => {
  const classes = useStyles();

  return (
    <Box className={isLoading ? classes.loading : classes.loaded} width={900}>
      {searchResults.map((result, i) => (
        <BookCard
          key={i}
          author={
            result.author_name
              ? result.author_name.join(', ')
              : result.contributor
              ? result.contributor.join(', ')
              : 'undefined'
          }
          title={result.title}
          firstEdition={result.first_publish_year}
          editionsNumber={result.edition_count}
          image={result.isbn !== undefined ? result.isbn[0] : 'image'}
          languages={result.language !== undefined ? result.language.length : 0}
        />
      ))}
    </Box>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
