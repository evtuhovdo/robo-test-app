import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import isNumber from 'lodash/isNumber';

import withRoot from './../../hoc/withRoot';
import AppHeader from './../../components/AppHeader';
import SearchBar from './../../components/SearchBar';
import BookCard from './../../components/BookCard';
import {
  getPageByQuery,
  setPage,
} from '../../modules/redux/actions/googleBooksActions';
import Pagination from './includes/Pagination';

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

class SearchResultsList extends React.Component {
  componentDidMount = () => {
    const {
      match, getBooksPage, setCurrentPage, location,
    } = this.props;
    const { search } = location;
    const { params } = match;
    const { query } = params;

    const p = parseInt(new URLSearchParams(search).get('p'), 10);

    let page = 1;
    if (isNumber(p) && p > 0) {
      page = p;
    }

    setCurrentPage(page);
    getBooksPage(query, page);
  };

  handleChangePage = (event, page) => {
    const {
      history, match, setCurrentPage, getBooksPage,
    } = this.props;
    const { params } = match;
    const { query } = params;

    setCurrentPage(page + 1);
    if (page !== 0) {
      history.push(`/search/${query}?p=${page + 1}`);
    } else {
      history.push(`/search/${query}`);
    }
    getBooksPage(query, page + 1);
  };

  handleSearch = (value) => {
    const { history, getBooksPage, setCurrentPage } = this.props;
    history.push(`/search/${value}`);
    setCurrentPage(1);
    getBooksPage(value, 1);
  };

  render() {
    const {
      classes,
      match,
      isPageFetching,
      currentPageResult,
      currentTotal,
      currentPage,
    } = this.props;
    const { params } = match;
    const { query } = params;

    return (
      <div className={classes.root}>
        <AppHeader />
        <main className={classes.main}>
          <SearchBar
            onSearchDo={this.handleSearch}
            initialValue={query}
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
            {currentTotal > 10 && (
              <Pagination
                count={currentTotal}
                currentPage={currentPage - 1}
                onChangePage={this.handleChangePage}
              />
            )}
            {isPageFetching && (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            )}
            {!isPageFetching &&
              currentPageResult.length > 0 &&
              currentPageResult.map(bookData => (
                <BookCard key={`BookCard-${bookData.id}`} book={bookData} query={query} />
                ))}
            {!isPageFetching &&
              currentTotal > 10 && (
                <Pagination
                  count={currentTotal}
                  currentPage={currentPage - 1}
                  onChangePage={this.handleChangePage}
                />
              )}
            {!isPageFetching &&
              currentPageResult.length === 0 && (
                <Typography component="div">
                  No books found for <b>{query}</b>.
                </Typography>
              )}
          </section>
        </main>
      </div>
    );
  }
}

SearchResultsList.propTypes = {
  isPageFetching: PropTypes.bool.isRequired,
  currentPageResult: PropTypes.array.isRequired,
  currentTotal: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  getBooksPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currentPageResult: state.googleBooks.currentPageResult,
  isPageFetching: state.googleBooks.isPageFetching,
  currentPage: state.googleBooks.currentPage,
  currentTotal: state.googleBooks.currentTotal,
});

const mapDispatchToProps = dispatch => ({
  getBooksPage: (query, page) => dispatch(getPageByQuery(query, page)),
  setCurrentPage: page => dispatch(setPage(page)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResultsList));

export default withRoot(withRouter(connected));
