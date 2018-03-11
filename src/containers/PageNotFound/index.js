import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppHeader from './../../components/AppHeader';
import withRoot from '../../hoc/withRoot';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'flex-start',
    padding: `${theme.spacing.unit * 15}px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.spacing.unit * 2}px`,
    width: '100%',
    maxWidth: 500,
  },
});

class PageNotFound extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader />
        <main className={classes.main}>
          <header>
            <Typography gutterBottom>
              Whoops, we can`t find that page!
            </Typography>
          </header>
          <br /><br />
          <Button variant="raised" color="secondary" component={Link} to="/">
            Back to main page
          </Button>
        </main>
      </div>
    );
  }
}

PageNotFound.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRoot(withStyles(styles)(PageNotFound));
