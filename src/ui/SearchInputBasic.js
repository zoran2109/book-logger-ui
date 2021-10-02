import { React, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../context/SearchContext';
import { openLibrarySearchUrl } from '../config/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    p: '10px',
  },
  inputBase: {
    ml: 1,
    padding: '0 10px',
    flex: 1,
  },
});

/** Search Input field embedded in app's header */
export const SearchInputBasic = ({ hide, smallScreen }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const { dispatch } = useContext(SearchContext);

  const history = useHistory();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    dispatch({ type: 'reset' });
    dispatch({ type: 'searchType', data: 'q' });
    dispatch({ type: 'queryText', data: query });
    dispatch({ type: 'isLoading' });

    await fetch(openLibrarySearchUrl('q', query, 1))
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: 'searchResults', data: [...response.docs] });
        dispatch({ type: 'resultsNumber', data: response.numFound });
        dispatch({ type: 'fetchedPage', data: 1 });
      })
      .catch((error) => console.log(error));

    setQuery('');
    history.push('/search');
    smallScreen ? hide() : false;
    dispatch({ type: 'notLoading' });
  };

  return (
    <Grid item xs={10} md={4} lg={3}>
      <Paper component="form" className={classes.paper}>
        <InputBase
          className={classes.inputBase}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
};

SearchInputBasic.propTypes = {
  hide: PropTypes.func,
  smallScreen: PropTypes.bool,
};
