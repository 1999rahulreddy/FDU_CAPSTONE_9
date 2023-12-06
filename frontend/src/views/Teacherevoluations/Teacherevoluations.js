import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Teacherevoluations.css';
import Footer from '../../components/Footer';
import * as echarts from 'echarts';


class Sidebar extends Component {
    render() {  
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                
                <div className="list-group list-group-flush">
                <Link to="/TeacherDashBoard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    
                    <Link to="/TeacherProfile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                    <Link to="/Teacherevoluations" className="list-group-item list-group-item-action bg-light">Evaluation</Link>
                    <Link to="/TeacherListallcodes" className="list-group-item list-group-item-action bg-light">Classes</Link>
                    <Link to="/logout" className="list-group-item list-group-item-action bg-light">Logout     </Link>
                </div>
            </div>
        );
    }
}

class Teacherevoluations extends Component {
    
    state = {
        grades: [
            { number: '1',codename:"codename1",studentname:"Alice",course:"CS777",uploadtime:"03 Dec 2022 11:22 PM ", Results: "accept"},
            { number: "2",codename:"codename2",studentname:"Coral",course:"MATH224",uploadtime:"15 Dec 2022 01:14 PM ", Results: "accept"},
            { number: "3",codename:"codename3",studentname:"Ella",course:"CS777",uploadtime:"22 Dec 2022 08:20 PM ", Results: "accept"},
            { number: "4",codename:"codename4",studentname:"Bob",course:"CS777",uploadtime:"24 Dec 2022 09:16 PM ", Results: "accept"},
            { number: "5",codename:"codename5",studentname:"Alice",course:"MATH224",uploadtime:"11 Dec 2022 08:42 PM ", Results: "reject"},
            { number: "6",codename:"codename6",studentname:"Ella",course:"CS777",uploadtime:"30 Dec 2022 09:34 PM ", Results: "accept"},
            { number: "7",codename:"codename7",studentname:"Bill",course:"MATH224",uploadtime:"09 Dec 2022 01:51 PM ", Results: "reject"},
            { number: "8",codename:"codename8",studentname:"Neo",course:"CS847",uploadtime:"07 Dec 2022 10:23 PM ", Results: "accept"},
            { number: "9",codename:"codename9",studentname:"Terry",course:"CS777",uploadtime:"04 Dec 2022 01:36 AM ", Results: "accept"},
            { number: "10",codename:"codename10",studentname:"Bob",course:"CS847",uploadtime:"06 Dec 2022 05:19 PM ", Results: "reject"},
            { number: "11",codename:"codename11",studentname:"Kate",course:"MATH224",uploadtime:"11 Dec 2022 14:06 PM ", Results: "accept"},
            { number: "12",codename:"codename12",studentname:"John",course:"CS777",uploadtime:"05 Dec 2022 14:19 PM ", Results: "accept"},

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
                    <h2>Scores</h2>
                    
                    <div className='title'> </div>
                    <table className="table" border="5">
                        <thead>
                            <tr>
                                <th>No. </th>
                                <th>Code</th>
                                <th>Student Name </th>
                                <th>Course </th>
                                <th>Date of send </th>
                                <th>Results </th>
                            </tr>
                            
                            {grades.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.number}</td>
                                    <td><a href="https://example.com/codedetal">{course.codename}</a></td>
                                    <td><a href="https://example.com/studentIDalice">{course.studentname}</a></td>
                                    <td><a href="https://example.com/courseID">{course.course}</a></td>
                                    <td>{course.uploadtime}</td>
                                    <td>{course.Results}</td>
                                </tr>
                            ))}
               
                        </thead>
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

export default Teacherevoluations;
