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
import AllGradePage from './views/AllGradePage/AllGradePage';
import TeacherDashBoard from './views/TeacherDashBoard/TeacherDashBoard';
import TeacherProfile from './views/TeacherProfile/TeacherProfile';
import Teacherevoluations from './views/Teacherevoluations/Teacherevoluations';
import TeacherListallcodes from './views/TeacherListallcodes/TeacherListallcodes';
import AssignmentPage from './views/AssignmentPage/AssignmentPage'; 




function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LoginPage} />
          <Route path="/upload/:courseId/:assignmentId" component={UploadPage} />
          <Route path="/dashboard" component={DashBoardPage} />
          <Route path="/courses/:studentId" component={CourseListPage} />
          <Route path="/grade-page/:studentId/:courseId" component={GradePage} />
          <Route path="/profile" component={StudentProfile} /> 
          <Route path="/change-password" component={PasswordPage} />
          <Route path="/all-grades/:studentId" component={AllGradePage} />
          <Route path="/teacherdashboard" component={TeacherDashBoard} />
          <Route path="/teacherprofile" component={TeacherProfile} />
          <Route path="/Teacherevoluations" component={Teacherevoluations} />
          <Route path="/TeacherListallcodes" component={TeacherListallcodes} />
          <Route path="/assignments/:courseId" component={AssignmentPage} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
