import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { URLS } from './components/settings';
import Apod from './pages/Apod';
import Home from './pages/Home';
import Sentry from './pages/Sentry';
import NHATS from './pages/Nhats';
import SentryDetail from './pages/SentryDetail';
import SeeOrbit from './pages/Orbit';
import ErrBoundary, {NotFound} from './components/error/err.component';
import About from './pages/About';




function App() {
  return (
    <>
      <ErrBoundary>
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
          <Route exact path={URLS.NHATS()}>
            <NHATS />
          </Route>
          <Route exact path={URLS.ORBIT()}>
            <SeeOrbit/>
          </Route>
          <Route exact path={URLS.ORBIT({sstr: ":sstr"})}>
            <SeeOrbit />
          </Route>
          <Route exact path={URLS.ABOUT()}>
            <About/>
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
      </ErrBoundary>
    </>
  );
}

export default App;
