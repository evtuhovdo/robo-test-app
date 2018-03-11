import {
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_PENDING,
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_FULFILLED,
  BOOKS_SUGGESTIONS_FIND_BY_QUERY_REJECTED,
  BOOKS_FIND_BY_QUERY_PENDING,
  BOOKS_FIND_BY_QUERY_FULFILLED,
  BOOKS_FIND_BY_QUERY_REJECTED,
  BOOKS_GET_BY_ID_PENDING,
  BOOKS_GET_BY_ID_FULFILLED,
  BOOKS_GET_BY_ID_REJECTED,
  SET_PAGE,
} from '../constants';

const initialState = {
  suggestionSearchResults: [],
  isSuggestionFetching: false,

  currentPageResult: [],
  currentPage: 1,
  currentTotal: 0,
  isPageFetching: false,

  currentBook: {},
  currentBookFetching: false,
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

    case BOOKS_GET_BY_ID_PENDING:
      return {
        ...state,
        currentBookFetching: true,
      };

    case BOOKS_GET_BY_ID_FULFILLED:
      return {
        ...state,
        currentBookFetching: false,
        currentBook: action.payload,
      };

    case BOOKS_GET_BY_ID_REJECTED:
      return {
        ...state,
        currentBookFetching: false,
        currentBook: undefined,
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
