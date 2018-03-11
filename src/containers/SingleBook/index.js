import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CircularProgress } from 'material-ui/Progress';
import isEmpty from 'lodash/isEmpty';
import BackIcon from 'material-ui-icons/ArrowBack';

import AppHeader from './../../components/AppHeader';
import withRoot from '../../hoc/withRoot';
import SearchBar from './../../components/SearchBar';
import SingleBookCard from './../../components/SingleBookCard';

import {
  getBookById,
  getPageByQuery,
  setPage,
} from '../../modules/redux/actions/googleBooksActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.unit,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.spacing.unit}px`,
    width: '100%',
    maxWidth: 500,
  },
  loading: {
    width: '100%',
    textAlign: 'center',
  },
});

class SingleBook extends React.Component {
  componentDidMount = () => {
    const { match, getBook } = this.props;
    const { params } = match;
    const { id } = params;

    getBook(id);
  };

  handleSearch = (value) => {
    const { history, getBooksPage, setCurrentPage } = this.props;
    history.push(`/search/${value}`);
    setCurrentPage(1);
    getBooksPage(value, 1);
  };

  render() {
    const { classes, currentBookFetching, currentBook, location } = this.props;
    const { search } = location;

    let backUrl = '/';

    const q = new URLSearchParams(search).get('q');

    if (q && q.length) {
      backUrl = `/search/${q}`;
    }

    return (
      <div className={classes.root}>
        <AppHeader />
        <main className={classes.main}>
          <SearchBar
            onSearchDo={this.handleSearch}
            initialValue={q}
            maxSuggestionsResultCount={10}
          />
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 20,
              width: '100%',
            }}
          >
            <Button variant="raised" color="secondary" component={Link} to={backUrl}>
              <BackIcon /> Back
            </Button>
            {currentBookFetching && (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            )}
            {!currentBookFetching &&
              !isEmpty(currentBook) && <SingleBookCard book={currentBook} />}
          </section>
        </main>
      </div>
    );
  }
}

SingleBook.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  getBooksPage: PropTypes.func.isRequired,
  currentBook: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentBookFetching: PropTypes.bool.isRequired,
  getBook: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currentBook: state.googleBooks.currentBook,
  currentBookFetching: state.googleBooks.currentBookFetching,
});

const mapDispatchToProps = dispatch => ({
  getBooksPage: (query, page) => dispatch(getPageByQuery(query, page)),
  getBook: id => dispatch(getBookById(id)),
  setCurrentPage: page => dispatch(setPage(page)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleBook),
);

export default withRoot(withRouter(connected));
