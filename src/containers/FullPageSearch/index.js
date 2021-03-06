import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import AppHeader from './../../components/AppHeader';
import withRoot from './../../hoc/withRoot';
import SearchBar from './../../components/SearchBar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.unit * 15,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.spacing.unit * 2}px`,
    width: '100%',
    maxWidth: 500,
  },
});

class FullPageSearch extends React.Component {
  handleSearch = (value) => {
    const { history } = this.props;

    history.push(`/search/${value}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader />
        <main className={classes.main}>
          <SearchBar onSearchDo={this.handleSearch} />
        </main>
      </div>
    );
  }
}

FullPageSearch.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(withRoot(withStyles(styles)(FullPageSearch)));
