import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import slice from 'lodash/slice';
import { connect } from 'react-redux';
import { findSuggestionsByQuery } from './../../modules/redux/actions/googleBooksActions';

import SearchInput from './includes/SearchInput';

const MAX_SUGGESTIONS_RESULT_COUNT = 5;

const style = {
  matchText: {
    ontWeight: 300,
  },
  otherText: {
    ontWeight: 500,
  },
};

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          if (part.highlight) {
            return (
              <span key={String(index)} style={style.matchText}>
                {part.text}
              </span>
            );
          }

          return (
            <strong key={String(index)} style={style.otherText}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
  },
});

class SearchBar extends React.Component {
  constructor(props) {
    super();

    this.state = {
      value: props.initialValue,
      suggestions: [],
    };
  }

  componentWillReceiveProps = (nexProps) => {
    const suggestions = this.getSuggestionsFromSearchResult(nexProps.searchResults, this.state.value);

    this.setState({
      suggestions,
    });
  };

  onSearchDo = () => {
    const { onSearchDo } = this.props;
    const { value } = this.state;
    if (isFunction(onSearchDo)) {
      onSearchDo(value);
    }
  };

  getSuggestionsFromSearchResult = (searchResult, query) => {
    if (isUndefined(query) || isUndefined(searchResult)) {
      return [];
    }

    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    const { maxSuggestionsResultCount } = this.props;

    return slice(searchResult, 0, maxSuggestionsResultCount);
  };

  handleSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      // TODO: Debounce
      const { getSuggest } = this.props;
      getSuggest(value);
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  clearValue = () => {
    this.setState({
      value: '',
      suggestions: [],
    });
  };

  handleSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      value: suggestion.title,
    }, this.onSearchDo);
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={SearchInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={this.handleSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Type to search...',
          value: this.state.value,
          onChange: this.handleChange,
          onClearInputValue: this.clearValue,
          onSearchDo: this.onSearchDo,
        }}
      />
    );
  }
}

SearchBar.propTypes = {
  initialValue: PropTypes.string,
  maxSuggestionsResultCount: PropTypes.number,
  onSearchDo: PropTypes.func,
  getSuggest: PropTypes.func,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    suggestionsContainerOpen: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired,
    suggestionsList: PropTypes.string.isRequired,
  }).isRequired,
};

SearchBar.defaultProps = {
  onSearchDo: () => {},
  getSuggest: () => {},
  initialValue: '',
  maxSuggestionsResultCount: MAX_SUGGESTIONS_RESULT_COUNT,
};

const mapStateToProps = state => ({
  searchResults: state.googleBooks.suggestionSearchResults,
  isFetching: state.googleBooks.isSuggestionFetching,
});

const mapDispatchToProps = dispatch => ({
  getSuggest: query => dispatch(findSuggestionsByQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar));
