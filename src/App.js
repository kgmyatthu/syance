import React from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Apod from './components/Apod';
import Test from './components/Test';
import { URLS } from './components/settings';




function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path={URLS.APOD_ROOT}>
          <Apod />
        </Route>
        <Route path='/test'>
          <Test />
        </Route>
        <Route path='*'>
          {/* <NotFound/> */}
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
