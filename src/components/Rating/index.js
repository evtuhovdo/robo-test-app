import React from 'react';
import PropTypes from 'prop-types';
import ReactRating from 'react-rating';
import FilledStarIcon from 'material-ui-icons/Star';
import EmptyStarIcon from 'material-ui-icons/StarBorder';
import Typography from 'material-ui/Typography';

const style = {
  icon: {
    width: 20,
    height: 20,
    color: '#E3BA38',
  },
};

const Rating = (props) => {
  const { rating, votes } = props;

  return (
    <Typography component="span">
      <ReactRating
        initialRating={rating}
        emptySymbol={<EmptyStarIcon style={style.icon} />}
        fullSymbol={<FilledStarIcon style={style.icon} />}
        readonly
      /> ({votes})
    </Typography>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Rating;