import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import SignUp from './views/SignUp/SignUp';
import LoginPage from './views/LoginPage/LoginPage';
import UploadPage from './views/UploadPage/UploadPage';
import DashBoardPage from './views/DashBoard/DashBoard';
import CourseListPage from './views/CourseListPage/CourseListPage'; 
import GradePage from './views/GradePage/GradePage';
import StudentProfile from './views/StudentProfile/StudentProfile';
import PasswordPage from './views/PasswordPage/PasswordPage';



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
          <Route path="/courses" component={CourseListPage} /> 
          <Route path="/grade-page/:studentId/:courseId" component={GradePage} />
          <Route path="/profile" component={StudentProfile} /> 
          <Route path="/change-password" component={PasswordPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
