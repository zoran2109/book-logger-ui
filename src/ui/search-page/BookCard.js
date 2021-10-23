import { React } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DropdownButton } from './DropdownButton';
import useMediaQuery from '@mui/material/useMediaQuery';

/*potential background color #F8F7F2 #f9f9f9*/

const useStyles = makeStyles({
  card: {
    /* backgroundColor: '#F8F7F2', */
    maxWidth: '900px',
    margin: '5px',
    padding: '15px 0',
  },
  cardMediaCenter: {
    textAlign: 'center',
  },
  cardMediaLeft: {
    textAlign: 'left',
  },
  img: {
    backgroundColor: 'gray',
    backgroundRepeat: 'no-repeat',
    width: '102px',
    height: '163.2px',
    border: '0.5px solid black',
    borderRadius: '5px',
    margin: '10px',
  },
  typographyMargin: {
    marginBottom: '5px',
  },
});

/** Book card component that shows basic information about the book.
 * Allows adding books to selected lists.
 * @param {Array} image Isbn number needed to fetch the book cover
 * @param {string} title Book title
 * @param {string} author Book author
 * @param {number} firstEdition Publication year of book's first edition
 * @param {number} editionsNumber Number of editions of the book
 * @param {number} languages Number of languages the book is published on
 */
export const BookCard = ({
  image,
  title,
  author,
  firstEdition,
  editionsNumber,
  languages,
}) => {
  const smallScreen = useMediaQuery('(max-width:900px)');
  const classes = useStyles();

  return (
    <Card className={classes.card} /* sx={{ backgroundColor: '#F8F7F2' }} */>
      <Grid container>
        <Grid item xs={12} sm={12} md={9} container>
          <Grid item xs={12} sm={4} md={3}>
            <CardMedia
              className={
                smallScreen ? classes.cardMediaCenter : classes.cardMediaLeft
              }
            >
              <img
                src={`http://covers.openlibrary.org/b/isbn/${image}-M.jpg`}
                alt={''}
                className={classes.img}
              />
            </CardMedia>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <CardContent>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography
                className={classes.typographyMargin}
                color="text.secondary"
              >
                by {author}
              </Typography>
              <Typography className={classes.typographyMargin} variant="body2">
                First published: {firstEdition}
              </Typography>
              <Typography variant="body2">
                {editionsNumber}{' '}
                {editionsNumber === 1 ? ' edition' : ' editions'}{' '}
                {languages > 0
                  ? ` in ${languages} ${
                      languages === 1 ? 'language' : 'languages'
                    }`
                  : ''}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <CardActions>
            <DropdownButton />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

BookCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  firstEdition: PropTypes.number,
  editionsNumber: PropTypes.number,
  author: PropTypes.string,
  languages: PropTypes.number,
};
