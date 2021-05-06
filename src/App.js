import React, { Component } from 'react';
import { CONTEXT } from './config';
import Index from './pages/index/index';
import Mine from './pages/mine/mine';
import Order from './pages/order/order';
import Square from './pages/square/square';
import Receive from './pages/receive/receive';


import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route
            exact
            path={`${CONTEXT}/`}
            render={() => <Redirect to={`${CONTEXT}/index`}></Redirect>}
          ></Route>
          <Route exact path={`${CONTEXT}/index`} component={Index} />
          <Route exact path={`${CONTEXT}/square`} component={Square} />
          <Route exact path={`${CONTEXT}/order`} component={Order} />
          <Route exact path={`${CONTEXT}/mine`} component={Mine} />
          <Route exact path={`${CONTEXT}/wantReceive`} component={Receive} />
        </Switch>
      </Router>
  );
}

export default App;
