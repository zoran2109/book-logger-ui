import { React, useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import useMediaQuery from '@mui/material/useMediaQuery';

// Values shown in dropdown menu
const options = ['Read', 'Currently reading'];

const useStyles = makeStyles({
  buttonGroupSmall: {
    width: '100%',
    margin: '0',
  },
  buttonGroupMedium: {
    width: '80%',
    margin: '0 10%',
  },
  button: {
    width: '100%',
  },
  growTop: {
    transformOrigin: 'center top',
  },
  growBottom: {
    transformOrigin: 'center bottom',
  },
});

/** Dropdown button that allows user to add book to selected list */
export const DropdownButton = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const smallScreen = useMediaQuery('(max-width:600px)');
  const mediumScreen = useMediaQuery('(max-width:900px)');

  const handleMenuItemClick = () => {
    setOpen(false);
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
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        size="large"
        aria-label="split button"
        className={
          smallScreen
            ? classes.buttonGroupSmall
            : mediumScreen
            ? classes.buttonGroupMedium
            : undefined
        }
      >
        <Button
          className={smallScreen || mediumScreen ? classes.button : undefined}
        >
          Want To Read
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
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
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
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
    </>
  );
};
