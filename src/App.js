import React from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Apod from './pages/Apod';
import Sentry from './pages/Sentry';
import { URLS } from './components/settings';
import {Test} from './pages/Test';
import SentryDetail from './pages/SentryDetail';




function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path={URLS.APOD()}>
          <Apod />
        </Route>
        <Route exact path={URLS.APOD({start_date:":start_date", end_date:":end_date"})}>
          <Apod />
        </Route>
        <Route exact path={URLS.SENTRY()}>
          <Sentry />
        </Route>
        <Route exact path={URLS.SENTRY({obj_des: ":obj_des"})}>
          <SentryDetail />
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
