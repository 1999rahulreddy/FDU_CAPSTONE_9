import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class AllGradesPage extends Component {
    state = {
        grades: [],
        isLoading: true,
        currentPage: 1,
        rowsPerPage: 10
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

    changePage = (page) => {
        this.setState({ currentPage: page });
    }

    render() {
        const studentId = localStorage.getItem('student_id');
        const { grades, isLoading, currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = grades.slice(indexOfFirstRow, indexOfLastRow);

        const totalPages = Math.ceil(grades.length / rowsPerPage);

        if (isLoading) {
            return <div>Loading grades...</div>;
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
                        {/* Grades Table */}
                        <h1>All Grades</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Submission Date</th>
                                    <th>Grade</th>
                                    <th>Assignment No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((grade, index) => (
                                    <tr key={index}>
                                        <td>{grade.course_name}</td>
                                        <td>{grade.submission_date}</td>
                                        <td>{grade.grade}</td>
                                        <td>{grade.assignment_no}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="pagination">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => this.changePage(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllGradesPage;