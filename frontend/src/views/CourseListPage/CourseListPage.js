import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CourseListPage.css'; // Ensure this CSS file exists or create it with your desired styles

class CourseListPage extends Component {
    state = {
        studentId: null,
        studentName: '',
        courses: [],
        isLoading: true,
    };

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = async () => {
        try {
            const studentId = localStorage.getItem('student_id');
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const response = await axios.get(`http://127.0.0.1:8000/api/Student_course_list/${studentId}/`, { headers });
            this.setState({
                studentId: response.data.student_id,
                studentName: response.data.student_name,
                courses: response.data.courses,
                isLoading: false,
            });
        } catch (error) {
            console.error('There was an error fetching the courses:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const studentId = localStorage.getItem('student_id');
        const { studentName, courses, isLoading } = this.state;

        if (isLoading) {
            return <div>Loading courses...</div>;
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {/* Sidebar */}
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Student Courses</div>
                            <div className="list-group list-group-flush">
                               <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                                <Link to={`/courses/${localStorage.getItem('student_id')}`} className="list-group-item list-group-item-action bg-light">Courses</Link>
                                <Link to={`/all-grades/${studentId}`} className="list-group-item list-group-item-action bg-light">Grades</Link>
                                <Link to="/profile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                                <Link to="/" className="list-group-item list-group-item-action bg-light">Logout </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1>{studentName || 'Student'}'s Courses</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Grade</th>
                                    <th>Take Test</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.course_id}</td>
                                        <td>{course.course_name}</td>
                                        <td>
                                            {/* Assume /grade-page/:studentId/:courseId is a valid route */}
                                            <Link to={`/grade-page/${this.state.studentId}/${course.course_id}`}>Grade</Link>
                                        </td>
                                        <td>
                                            <Link to={`/assignments/${course.course_id}`}>Take the Test</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseListPage;
