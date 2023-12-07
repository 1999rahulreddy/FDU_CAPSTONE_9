import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TeacherAssignmentPage extends Component {
    state = {
        courseId: null,
        assignments: [],
        isLoading: true,
        teacherId: 1, // or however you retrieve the student ID
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
        const { courseId, assignments, isLoading} = this.state;

        if (isLoading) {
            return <div>Loading assignments...</div>;
        }

         return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Student Dashboard</div>
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
                                           <Link to={`/upload-test-case/${courseId}/${assignment.assignment_id}`}>Upload Test Case</Link>
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

export default TeacherAssignmentPage;