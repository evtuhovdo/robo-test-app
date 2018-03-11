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

  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
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
});

const BookCard = (props) => {
  const { classes } = props;
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
      <span style={{ position: 'relative', left: -2, display: 'inline-block' }}>
        <Rating rating={averageRating} votes={ratingsCount} />
      </span>
    );

  const subHeader = <Typography>{publisher} {publishedYear} {rating}</Typography>;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
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
            {description}
          </Typography>
        </CardContent>
      )}

      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button color="secondary" component={Link} to={`/book/${id}`}>More</Button>
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
  classes: PropTypes.object.isRequired, // TODO: classes в shape
};

BookCard.defaultProps = {
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
