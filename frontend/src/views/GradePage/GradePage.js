import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class GradePage extends Component {
    state = {
        grades: [],
        isLoading: true,
    };

    componentDidMount() {
        const { match } = this.props;
        const studentId = match.params.studentId;
        const courseId = match.params.courseId;

        this.fetchGrades(studentId, courseId);
    }

    fetchGrades = async (studentId, courseId) => {
    try {
        // Construct the headers with the Authorization token
        const headers = {
            'Authorization': `Token ${localStorage.getItem('token')}`
        };

        // Pass the headers to the axios get request
        const response = await axios.get(`http://127.0.0.1:8000/api/view_grades/${studentId}/${courseId}`, { headers });

        this.setState({
            grades: response.data,
            isLoading: false,
        });
    } catch (error) {
        console.error('Error fetching grades:', error);
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
                        <h1>Grades</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Assignment No</th>
                                    <th>Submission Date</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((grade, index) => (
                                    <tr key={index}>
                                        {/* <td>{grade.id}</td> */}
                                        <td>{grade.assignment_no}</td>
                                        <td>{grade.submission_date}</td>
                                        <td>{grade.grade}</td>
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

export default GradePage;
