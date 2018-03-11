import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FullPageSearch from './../FullPageSearch';
import SearchResultsList from './../SearchResultsList';
import PageNotFound from './../PageNotFound';

const App = () => (
  <Switch>
    <Route exact path="/" component={FullPageSearch} />
    <Route exact path="/search/:query" component={SearchResultsList} />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
