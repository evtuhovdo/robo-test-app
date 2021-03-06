import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';
import truncate from 'lodash/truncate';
import querystring from 'querystring';

import Rating from './../../components/Rating';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: 'column',
  },
  description: {
    textAlign: 'justify',
  },
  cover: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: 170,
    minHeight: 170,
    borderTop: `${theme.spacing.unit}px solid #F5F5F5`,
    borderBottom: `${theme.spacing.unit}px solid #F5F5F5`,
    backgroundSize: 'contain',
  },
  cardAction: {
    justifyContent: 'flex-end',
  },
  rating: {
    position: 'relative',
    left: -2,
  },
});

const BookCard = (props) => {
  const { classes, query } = props;
  const {
    id,
    title,
    publisher,
    publishedDate,
    description,
    thumbnail,
    averageRating,
    ratingsCount,
  } = props.book;

  let publishedYear = '';
  if (isString(publishedDate)) {
    publishedYear = publishedDate.slice(0, 4);
  }

  const rating = !isUndefined(averageRating)
    && !isUndefined(ratingsCount)
    && isNumber(averageRating)
    && isNumber(ratingsCount)
    && averageRating > 0
    && ratingsCount > 0
    && (
      <span className={classes.rating}>
        <Rating rating={averageRating} votes={ratingsCount} />
      </span>
    );

  const subHeader = <Typography>{publisher} {publishedYear} {rating}</Typography>;

  let searchQuery = '';
  if (query && query !== '') {
    searchQuery = querystring.stringify({ q: query });
    searchQuery = `?${searchQuery}`;
  }

  const bookLink = `/book/${id}${searchQuery}`;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={truncate(title, {
          length: 60,
          separator: ' ',
          omission: ' ...',
        })}
        subheader={subHeader}
      />

      {!isUndefined(thumbnail) && isString(thumbnail) && thumbnail.length > 0 && (
        <CardMedia
          className={classes.cover}
          image={thumbnail}
          title="Book cover"
        />
      )}

      {!isUndefined(description) && isString(description) && description.length > 0 && (
        <CardContent>
          <Typography paragraph className={classes.description}>
            {truncate(description, {
              length: 200,
              separator: ' ',
              omission: ' ...',
            })}
          </Typography>
        </CardContent>
      )}

      <CardActions className={classes.cardAction}>
        <Button color="secondary" component={Link} to={bookLink}>More</Button>
      </CardActions>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    publisher: PropTypes.string,
    publishedDate: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    averageRating: PropTypes.number,
    ratingsCount: PropTypes.number,
  }),
  query: PropTypes.string,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    cardAction: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
};

BookCard.defaultProps = {
  query: null,
  book: {
    title: null,
    publisher: null,
    publishedDate: null,
    description: null,
    thumbnail: null,
    averageRating: null,
    ratingsCount: null,
  },
};

export default withStyles(styles)(BookCard);
