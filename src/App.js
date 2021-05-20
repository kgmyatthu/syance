import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { URLS } from './components/settings';
import Apod from './pages/Apod';
import Home from './pages/Home';
import Sentry from './pages/Sentry';
import NEO from './pages/Neo';
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
        <Route exact path={URLS.NEO()}>
          <NEO />
        </Route>
        <Route exact path={URLS.NEO({sstr: ":sstr"})}>
          <NEO />
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
