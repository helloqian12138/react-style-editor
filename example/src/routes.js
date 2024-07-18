import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const importAll = (r) => r.keys().map(r);
const components = importAll(require.context('./pages', false, /\.jsx$/));

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">{/* <About /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
