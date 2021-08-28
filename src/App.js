import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { URLS } from './components/settings';
import Apod from './pages/Apod';
import Home from './pages/Home';
import ErrBoundary, {NotFound} from './components/error/err.component';
import About from './pages/About';




function App() {
  return (
    <>
      <ErrBoundary>
        <HashRouter>
        <Switch>
          <Route exact path='/'>
            <Apod />
          </Route>
          <Route exact path={URLS.APOD({start_date:":start_date", end_date:":end_date"})}>
            <Apod />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </HashRouter>
      </ErrBoundary>
    </>
  );
}

export default App;
