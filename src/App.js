import React from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Apod from './components/Apod';
import Sentry from './components/Sentry';
import { URLS } from './components/settings';
import {Test} from './components/Test';




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
        <Route exact path={URLS.SENTRY()}>
          <Sentry />
        </Route>
        <Route exact path={URLS.SENTRY(":obj_des")}>
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
