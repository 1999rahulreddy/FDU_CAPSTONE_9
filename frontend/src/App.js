import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import SignUp from './views/SignUp/SignUp';
import LoginPage from './views/LoginPage/LoginPage';
import UploadPage from './views/UploadPage/UploadPage';
import DashBoardPage from './views/DashBoard/DashBoard';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LoginPage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/dashboard" component={DashBoardPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
