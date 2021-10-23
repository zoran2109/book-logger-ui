import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Grid } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { SearchInputBasic } from './SearchInputBasic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchContext } from '../context/SearchContext';
import { LinearProgressBar } from './search-page/LinearProgressBar';
import books from '../config/theme/icons/books.png';
import book from '../config/theme/icons/book.png';

{
  /* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '56px',
  },
  logo: {
    padding: '0 10px',
    display: 'flex',
    alignSelf: 'center',
    height: '28px',
  },
  icon: {
    fontSize: '28px',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.background.paper,
    padding: '0 15px',
  },
  mobileLink: {
    textDecoration: 'none',
    color: 'black',
  },
  smallMenuIcons: {
    marginLeft: 'auto',
    display: 'flex',
  },
  searchIcon: {
    marginRight: '15px',
  },
  section: {
    margin: '0 150px',
    padding: '0 15px',
    display: 'flex',
  },
  sectionSmaller: {
    margin: '0 30px',
    padding: '0 15px',
    display: 'flex',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      paddingTop: '30px',
      display: 'flex',
      top: '56px',
      width: '230px',
    },
  },
  userIcon: { display: 'flex', marginLeft: 'auto' },
  toolbar: { maxWidth: '1400px', margin: 'auto' },
}));

/** Book Logger Header that contains reponsive navbar, user login button and linear progress bar*/
export const Header = () => {
  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:900px)');
  const mediumScreen = useMediaQuery('(max-width:1200px)');
  const largeScreen = useMediaQuery('(max-width:1400px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  const {
    state: { isLoading },
  } = useContext(SearchContext);

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
  }, [smallScreen]);

  return (
    <>
      {smallScreen ? (
        <>
          <Box>
            <AppBar position="sticky" className={classes.appBar}>
              <Toolbar>
                {searchOpen ? (
                  <SearchInputBasic hide={setSearchOpen} smallScreen={true} />
                ) : (
                  <>
                    <Box>
                      <img src={books} alt="books" className={classes.logo} />
                    </Box>
                    <Typography variant="h5">Book Logger</Typography>
                  </>
                )}
                <Box className={classes.smallMenuIcons}>
                  {searchOpen ? (
                    ''
                  ) : (
                    <SearchIcon
                      sx={{ fontSize: 28 }}
                      className={classes.searchIcon}
                      onClick={setSearchOpen}
                    />
                  )}
                  <MenuIcon sx={{ fontSize: 28 }} onClick={handleMenuOpen} />
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Box>
            <SwipeableDrawer
              className={classes.drawer}
              anchor="right"
              open={menuOpen}
              onOpen={handleMenuOpen}
              onClose={handleMenuOpen}
              onClick={handleMenuOpen}
            >
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ fontSize: 28 }} />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
                <Link to="/" className={classes.mobileLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon sx={{ fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/MyBooks" className={classes.mobileLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <img src={book} alt="book" className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText>MyBooks</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/Search" className={classes.mobileLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <SearchIcon sx={{ fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText>Search</ListItemText>
                  </ListItem>
                </Link>
              </List>
            </SwipeableDrawer>
          </Box>
        </>
      ) : (
        <AppBar position="sticky">
          <Box>
            <Toolbar className={largeScreen ? undefined : classes.toolbar}>
              <Box>
                <img src={books} alt="books" className={classes.logo} />
              </Box>
              <Typography variant="h5">Book Logger</Typography>
              <section
                className={
                  mediumScreen ? classes.sectionSmaller : classes.section
                }
              >
                <Typography variant="body1">
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                </Typography>
                <Typography variant="body1">
                  <Link to="/MyBooks" className={classes.link}>
                    MyBooks
                  </Link>
                </Typography>
                <Typography variant="body1">
                  <Link to="/Search" className={classes.link}>
                    Search
                  </Link>
                </Typography>
              </section>
              <SearchInputBasic smallScreen={false} />
              <Box className={classes.userIcon}>
                <AccountCircleIcon sx={{ fontSize: 28 }} />
              </Box>
            </Toolbar>
          </Box>
        </AppBar>
      )}
      <Grid container>{isLoading && <LinearProgressBar />}</Grid>
    </>
  );
};
