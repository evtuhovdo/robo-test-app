import { search } from './../../googleBookApi';

import {
  BOOKS_SUGGESTIONS_FIND_BY_QUERY,
  BOOKS_GET_BY_ID,
  BOOKS_FIND_BY_QUERY,
  SET_PAGE,
} from '../constants';

const defaultOptions = {
  key: 'AIzaSyAojp0-cAhtNNsWn-midtyrplgYvs5FGyM',
};

const findSuggestionsByQuery = (query) => {
  const options = {
    ...defaultOptions,
    field: 'title',
  };
  return {
    type: BOOKS_SUGGESTIONS_FIND_BY_QUERY,
    payload: search(query, options),
  };
};

const setPage = page => ({
  type: SET_PAGE,
  payload: page,
});

const getPageByQuery = (query, page = 1) => {
  const options = {
    ...defaultOptions,
    field: 'title',
    limit: 10,
    offset: 10 * (page - 1),
  };

  return {
    type: BOOKS_FIND_BY_QUERY,
    payload: search(query, options),
  };
};

const getBookById = volumeId => ({
  type: BOOKS_GET_BY_ID,
  // payload: googleBookApi.lookup(volumeId),
});

export {
  findSuggestionsByQuery,
  getPageByQuery,
  setPage,
};

