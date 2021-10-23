import { React, useRef, useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { SearchContext } from '../../context/SearchContext';
import { openLibrarySearchUrl } from '../../config/api';

const useStyles = makeStyles({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    textTransform: 'none',
  },
  iconButton: {
    padding: '10px',
  },
  inputBase: {
    marginLeft: 1,
    flex: 1,
  },
  growTop: {
    transformOrigin: 'center top',
  },
  growBottom: {
    transformOrigin: 'center bottom',
  },
});

// Search options offered in dropdown selector of search input
const options = ['All', 'Authors', 'Titles'];

/** Search Input field with dropdown selector for search options */
export const SearchInput = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(SearchContext);
  const { queryText, searchType } = state;

  // State of dropdown menu
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleChange = (e) => {
    dispatch({ type: 'queryText', data: e.target.value });
  };

  const handleSelectChange = (value) => {
    const searchType =
      value === 'All' ? 'q' : value === 'Titles' ? 'title' : 'author';
    dispatch({ type: 'searchType', data: searchType });
    setOpen(false);
  };

  const handleClick = async () => {
    dispatch({ type: 'reset' });
    dispatch({ type: 'isLoading' });

    await fetch(openLibrarySearchUrl(searchType, queryText, 1))
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: 'searchResults', data: [...response.docs] });
        dispatch({ type: 'resultsNumber', data: response.numFound });
        dispatch({ type: 'fetchedPage', data: 1 });
      })
      .catch((error) => console.log(error));

    dispatch({ type: 'notLoading' });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper component="form" className={classes.paper}>
        <Button
          size="medium"
          onClick={handleToggle}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select search option"
          aria-haspopup="menu"
          ref={anchorRef}
          sx={{ textTransform: 'none' }}
          className={classes.button}
        >
          {searchType === 'q'
            ? 'All'
            : searchType === 'title'
            ? 'Titles'
            : 'Authors'}
          <ArrowDropDownIcon />
        </Button>

        <InputBase
          className={classes.inputBase}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={queryText}
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            className={
              placement === 'bottom' ? classes.growTop : classes.growBottom
            }
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      onClick={() => handleSelectChange(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};
