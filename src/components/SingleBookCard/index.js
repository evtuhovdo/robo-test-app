import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';

import Rating from './../../components/Rating';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 4}px 0`,
    flexDirection: 'column',
  },
  description: {
    textAlign: 'justify',
  },
  cover: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: 400,
    minHeight: 400,
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
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const SingleBookCard = (props) => {
  const { classes } = props;
  const {
    title,
    publisher,
    publishedDate,
    description,
    mediumImage,
    averageRating,
    ratingsCount,
    authors,
    thumbnail,
    isbn,
    pageCount,
    categories,
    buyLink,
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

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={subHeader}
      />

      {!isUndefined(mediumImage) && isString(mediumImage) && mediumImage.length > 0 && (
        <CardMedia
          className={classes.cover}
          image={mediumImage}
          title="Book cover"
        />
      )}

      {(isUndefined(mediumImage) || !isString(mediumImage) || !mediumImage.length > 0) &&
      !isUndefined(thumbnail) && isString(thumbnail) && thumbnail.length > 0 && (
        <CardMedia
          className={classes.cover}
          image={thumbnail}
          title="Book cover"
        />
      )}

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Author(s)</TableCell>
            <TableCell>{authors}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Page count</TableCell>
            <TableCell>{pageCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Publisher</TableCell>
            <TableCell>{publisher}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Published</TableCell>
            <TableCell>{publishedDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Categories</TableCell>
            <TableCell>{categories}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ISBN</TableCell>
            <TableCell>{isbn}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {!isUndefined(description) && isString(description) && description.length > 0 && (
        <CardContent>
          <Typography component="div" className={classes.description}>
            {Parser(description)}
          </Typography>
        </CardContent>
      )}
      <CardActions className={classes.cardAction}>
        {!isUndefined(buyLink) && isString(buyLink) && buyLink.length > 0 && (
          <Button
            color="secondary"
          >
            <a href={buyLink} rel="noopener" target="_blank" className={classes.link}>
              <ShoppingCartIcon /> Buy
            </a>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

SingleBookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isbn: PropTypes.string,
    authors: PropTypes.string,
    title: PropTypes.string,
    publisher: PropTypes.string,
    publishedDate: PropTypes.string,
    description: PropTypes.string,
    mediumImage: PropTypes.string,
    averageRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    pageCount: PropTypes.number,
    categories: PropTypes.string,
    thumbnail: PropTypes.string,
    buyLink: PropTypes.string,
  }),
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    cardAction: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
};

SingleBookCard.defaultProps = {
  book: {
    pageCount: null,
    categories: null,
    title: null,
    isbn: null,
    publisher: null,
    publishedDate: null,
    authors: null,
    description: null,
    thumbnail: null,
    averageRating: null,
    ratingsCount: null,
    buyLink: null,
  },
};

export default withStyles(styles)(SingleBookCard);
