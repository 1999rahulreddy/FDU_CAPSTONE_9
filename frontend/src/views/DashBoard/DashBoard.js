import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import Footer from '../../components/Footer';

class Sidebar extends Component {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Student Dashboard</div>
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    <Link to="/settings" className="list-group-item list-group-item-action bg-light">Settings</Link>
                    <Link to="/code-assessment-history" className="list-group-item list-group-item-action bg-light">All Code Assessment History</Link>
                    <Link to="/grades" className="list-group-item list-group-item-action bg-light">Grades</Link>
                    <Link to="/schedule" className="list-group-item list-group-item-action bg-light">My Schedule</Link>
                    <Link to="/documents" className="list-group-item list-group-item-action bg-light">My Documents      </Link>
                </div>
            </div>
        );
    }
}

class StudentDashboard extends Component {
    
    state = {
        grades: [
            { course: 'Software Engineering', grade: 90 },
            { course: 'Computer Game Programming', grade: 85 },
            { course: 'Operating Systems', grade: 95, hasCodeAssessment: true },
            { course: 'Systems Programming', grade: 88 },
            { course: 'Computer Algorithms', grade: 82, hasCodeAssessment: true },
            { course: 'Software Engineering', grade: 90 },
            { course: 'Computer Game Programming', grade: 85 },
            { course: 'Operating Systems', grade: 95, hasCodeAssessment: true },
            { course: 'Systems Programming', grade: 88 },
            { course: 'Computer Algorithms', grade: 82, hasCodeAssessment: true }
        ],
        currentPage: 1,
        gradesPerPage: 5
    }

    // Event handler for page change
    handlePageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { grades, currentPage, gradesPerPage } = this.state;

        // Calculate grades for current page
        const indexOfLastGrade = currentPage * gradesPerPage;
        const indexOfFirstGrade = indexOfLastGrade - gradesPerPage;
        const currentGrades = grades.slice(indexOfFirstGrade, indexOfLastGrade);

        // Create page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(grades.length / gradesPerPage); i++) {
            pageNumbers.push(i);
        }



        return (
            <div className="container mt-5">
                 <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                <div className="col-md-9">
                    <h2>Student Dashboard</h2>
                    <h4>Grades</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Grade</th>
                                <th>New Code Assessment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.course}</td>
                                    <td>{course.grade}%</td>
                                    <td>
                                      {course.hasCodeAssessment 
                                      ? <Link to="/upload">Take The test</Link> 
                                      : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
      <div className="pagination">
    <button 
        onClick={() => {
            if (currentPage > 1) {
                this.setState({ currentPage: currentPage - 1 })
            }
        }}
    >
        &lt;
    </button>
    {pageNumbers.map(number => (
        <button 
            key={number} 
            id={number} 
            onClick={this.handlePageClick}
            className={currentPage === number ? "active" : ""}
        >
            {number}
        </button>
    ))}
    <button 
        onClick={() => {
            if (currentPage < pageNumbers.length) {
                this.setState({ currentPage: currentPage + 1 })
            }
        }}
    >
        &gt;
    </button>
</div>





            <Footer />
        </div>
        );
    }
}

export default StudentDashboard;
