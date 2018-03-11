import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import BookIcon from 'material-ui-icons/Book';
import { withStyles } from 'material-ui/styles';

const styles = {
  link: {
    display: 'inline-block',
    marginRight: 10,
    position: 'relative',
    top: -4,
  },
  icon: {
    width: 30,
    height: 30,
  },
};

const AppHeader = (props) => {
  const { classes } = props;

  return (
    <header>
      <Typography variant="display1" gutterBottom>
        <Link to="/" className={classes.link}>
          <BookIcon color="primary" className={classes.icon} />
        </Link>
        Google Books Search
      </Typography>
    </header>
  );
};

AppHeader.propTypes = {
  classes: PropTypes.shape({
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(AppHeader);
