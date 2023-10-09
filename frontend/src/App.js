import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import SignUp from './views/SignUp/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
