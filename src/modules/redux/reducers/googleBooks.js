import {
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_PENDING,
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_FULFILLED,
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_REJECTED,
  BOOKS_FIND_BY_QUERY_PENDING,
  BOOKS_FIND_BY_QUERY_FULFILLED,
  BOOKS_FIND_BY_QUERY_REJECTED,
  SET_PAGE,
} from '../constants';

const initialState = {
  suggestionSearchResults: [],
  isSuggestionFetching: false,
  currentPageResult: [],
  currentPage: 1,
  currentTotal: 0,
  isPageFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_SUGGESTIONS_FIND_BY_QUERY_PENDING:
      return {
        ...state,
        isSuggestionFetching: true,
      };

    case BOOKS_SUGGESTIONS_FIND_BY_QUERY_FULFILLED:
      return {
        ...state,
        isSuggestionFetching: false,
        suggestionSearchResults: action.payload.results,
      };

    case BOOKS_SUGGESTIONS_FIND_BY_QUERY_REJECTED:
      return {
        ...state,
        isSuggestionFetching: false,
        suggestionSearchResults: [],
      };

    case BOOKS_FIND_BY_QUERY_PENDING:
      return {
        ...state,
        isPageFetching: true,
      };

    case BOOKS_FIND_BY_QUERY_FULFILLED:
      return {
        ...state,
        isPageFetching: false,
        currentTotal: action.payload.totalItems,
        currentPageResult: action.payload.results,
      };

    case BOOKS_FIND_BY_QUERY_REJECTED:
      return {
        ...state,
        isPageFetching: false,
        currentPageResult: [],
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
