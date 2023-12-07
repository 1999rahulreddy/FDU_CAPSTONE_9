import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TeacherEvaluations extends Component {
    state = {
        evaluations: [],
        isLoading: true,
        teacherId: 1, // Update with the correct logic to get teacher's ID
    };

    componentDidMount() {
        this.fetchEvaluations();
    }

    fetchEvaluations = async () => {
        try {
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const response = await axios.get(`http://127.0.0.1:8000/api/prof/get_pending_upload/${this.state.teacherId}`, { headers });
            this.setState({
                evaluations: response.data,
                isLoading: false,
            });
        } catch (error) {
            console.error('There was an error fetching the evaluations:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { evaluations, isLoading } = this.state;

        if (isLoading) {
            return <div>Loading evaluations...</div>;
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {/* Sidebar */}
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Teacher Dashboard</div>
                            <div className="list-group list-group-flush">
                                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>            
                                <Link to="/TeacherProfile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                                <Link to="/Teacherevoluations" className="list-group-item list-group-item-action bg-light">Evaluation</Link>
                                <Link to="/TeacherListallcodes" className="list-group-item list-group-item-action bg-light">Classes</Link>
                                <Link to="/logout" className="list-group-item list-group-item-action bg-light">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1>Evaluations</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Assignment No</th>
                                    <th>Student</th>
                                    <th>Language</th>
                                    <th>Code File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluations.map((evaluation, index) => (
                                    <tr key={index}>
                                        <td>{evaluation.course_detail.course_name}</td>
                                        <td>{evaluation.assignment_no}</td>
                                        <td>{evaluation.student}</td>
                                        <td>{evaluation.language}</td>
                                        <td>
                                            <a href={`${evaluation.code_file}`} target="_blank" rel="noopener noreferrer">
                                                {evaluation.code_file.split('/').pop()}
                                            </a>
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

export default TeacherEvaluations;
