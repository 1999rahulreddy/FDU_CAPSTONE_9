import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class AllGradesPage extends Component {
    state = {
        grades: [],
        isLoading: true,
    };

    componentDidMount() {
        const { match } = this.props;
        const studentId = match.params.studentId;  // Assuming student ID is passed via URL parameters

        this.fetchAllGrades(studentId);
    }

    fetchAllGrades = async (studentId) => {
        try {
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`
            };

            const response = await axios.get(`http://127.0.0.1:8000/api/all_grades/${studentId}`, { headers });

            this.setState({
                grades: response.data,
                isLoading: false,
            });
        } catch (error) {
            console.error('Error fetching all grades:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { grades, isLoading } = this.state;

        if (isLoading) {
            return <div>Loading grades...</div>;
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Student Dashboard</div>
                            <div className="list-group list-group-flush">
                                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                                <Link to="/settings" className="list-group-item list-group-item-action bg-light">Settings</Link>
                                <Link to="/code-assessment-history" className="list-group-item list-group-item-action bg-light">All Code Assessment History</Link>
                                <Link to="/grades" className="list-group-item list-group-item-action bg-light">Grades</Link>
                                <Link to="/schedule" className="list-group-item list-group-item-action bg-light">My Schedule</Link>
                                <Link to="/documents" className="list-group-item list-group-item-action bg-light">My Documents</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1>All Grades</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Submission Date</th>
                                    <th>Grade</th>
                                    <th>Assignment No</th> {/* New column for Course Name */}
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((grade, index) => (
                                    <tr key={index}>
                                        <td>{grade.course_name}</td> {/* Displaying Course Name */}
                                        <td>{grade.submission_date}</td>
                                        <td>{grade.grade}</td>
                                        <td>{grade.assignment_no}</td>
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

export default AllGradesPage;
