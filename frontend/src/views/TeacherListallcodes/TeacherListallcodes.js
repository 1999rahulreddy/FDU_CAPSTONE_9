// frontend/src/views/TeacherListallcodes/TeacherListallcodes.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeacherListallcodes.css'; // Make sure this CSS file exists or create it with desired styles

class TeacherListallcodes extends Component {
    state = {
        teacherId: 1, // Assuming teacher ID is known and static for this example
        courses: [],
        isLoading: true,
    };

    componentDidMount() {
        this.fetchTeacherCourses();
    }

    fetchTeacherCourses = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/prof/get_course_list/${this.state.teacherId}`);
            this.setState({
                courses: response.data,
                isLoading: false,
            });
        } catch (error) {
            console.error('Error fetching teacher courses:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { courses, isLoading } = this.state;

        if (isLoading) {
            return <div>Loading courses...</div>;
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {/* Sidebar */}
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Teacher Courses</div>
                            <div className="list-group list-group-flush">
                                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>            
                                <Link to="/TeacherProfile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                                <Link to="/Teacherevoluations" className="list-group-item list-group-item-action bg-light">Records</Link>
                                <Link to="/TeacherListallcodes" className="list-group-item list-group-item-action bg-light">Classes</Link>
                                <Link to="/logout" className="list-group-item list-group-item-action bg-light">Logout     </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1>Teacher's Courses</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Upload Test Case</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.course_id}</td>
                                        <td>{course.course_name}</td>
                                        <td>
                                            <Link to={`/teacher-assignments/${course.course_id}`}>Upload Test Case</Link>
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

export default TeacherListallcodes;
