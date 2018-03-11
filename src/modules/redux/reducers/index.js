import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import googleBooks from './googleBooks';

export default combineReducers({
  router: routerReducer,
  googleBooks,
});
