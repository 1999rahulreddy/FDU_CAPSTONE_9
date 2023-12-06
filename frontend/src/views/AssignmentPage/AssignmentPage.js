import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AssignmentPage extends Component {
    state = {
        courseId: null,
        assignments: [],
        isLoading: true,
        studentId: localStorage.getItem('student_id'), // or however you retrieve the student ID
    };

    componentDidMount() {
        const { courseId } = this.props.match.params; // Assuming you're getting the course ID from URL params
        this.setState({ courseId: courseId });
        this.fetchAssignments(courseId);
    }

    fetchAssignments = async (courseId) => {
        try {
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const response = await axios.get(`http://127.0.0.1:8000/api/assignments/${courseId}/`, { headers });
            this.setState({
                assignments: response.data,
                isLoading: false,
            });
        } catch (error) {
            console.error('There was an error fetching the assignments:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { courseId, assignments, isLoading, studentId } = this.state;

        if (isLoading) {
            return <div>Loading assignments...</div>;
        }

         return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {/* Sidebar */}
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Student Dashboard</div>
                            <div className="list-group list-group-flush">
                                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    <Link to={`/courses/${studentId}`} className="list-group-item list-group-item-action bg-light">Courses</Link>
                    <Link to={`/all-grades/${studentId}`} className="list-group-item list-group-item-action bg-light">Grades</Link>
                    <Link to="/profile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                    <Link to="/" className="list-group-item list-group-item-action bg-light">Logout </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1>Assignments for Course {courseId}</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Assignment ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, index) => (
                                    <tr key={index}>
                                        <td>{assignment.assignment_id}</td>
                                        <td>
                                            {/* Link for each assignment, adjust the URL as needed */}
                                           <Link to={`/upload/${this.state.courseId}/${assignment.assignment_id}`}>Take the Test</Link>
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

export default AssignmentPage;