import React from 'react';
import { Route } from 'react-router-dom';
import FullPageSearch from './../FullPageSearch';
import About from '../about';

const App = () => (
  <React.Fragment>
    <Route exact path="/" component={FullPageSearch} />
    <Route exact path="/about-us" component={About} />
  </React.Fragment>
);

export default App;
