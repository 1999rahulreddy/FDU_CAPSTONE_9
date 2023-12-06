import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TeacherListallcodes.css';
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
                    <Link to="/logout" className="list-group-item list-group-item-action bg-light">logout     </Link>
                </div>
            </div>
        );
    }
}

class TeacherListallcodes extends Component {
    
    state = {
        grades: [
            { number: '1', classid:'CS772-2309', totalcode:"1542",precentofaccetp:"84%", precentofreject:"16%"},
            { number: '2', classid:'MATH224-2309', totalcode:"3434",precentofaccetp:"29%", precentofreject:"71%"},
            { number: '3', classid:'CS772-2309', totalcode:"1352",precentofaccetp:"44%", precentofreject:"56%"},
            { number: '4', classid:'MATH224-2309', totalcode:"6342",precentofaccetp:"21%", precentofreject:"79%"},
            { number: '5', classid:'CS847-2309', totalcode:"1332",precentofaccetp:"66%", precentofreject:"34%"},
            { number: '6', classid:'MATH224-2309', totalcode:"3245",precentofaccetp:"97%", precentofreject:"3%"},
            { number: '7', classid:'CS847-2309', totalcode:"442",precentofaccetp:"84%", precentofreject:"16%"},
            { number: '8', classid:'CS772-2309', totalcode:"2354",precentofaccetp:"100%", precentofreject:"0%"},
            { number: '9', classid:'CS772-2309', totalcode:"4676",precentofaccetp:"100%", precentofreject:"0%"},
            { number: '10', classid:'MATH224-2309', totalcode:"6543",precentofaccetp:"91%", precentofreject:"9%"},
            { number: '11', classid:'CS777-2309', totalcode:"4343",precentofaccetp:"24%", precentofreject:"76%"},
            { number: '12', classid:'CS847-2309', totalcode:"17852",precentofaccetp:"14%", precentofreject:"86%"},

          
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
                    <h2>Teacher Listallcodes</h2>
                    
                    <div className='title'> </div>
                    <table className="table" border="5">
                        <thead>
                            <tr>
                                
                                <th>No. </th>
                                <th>Class </th>
                                <th>Total Code </th>
                                <th>Procent of accept </th>
                                <th>Procent of reject </th>
                            </tr>
                            
                            {grades.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.number}</td>
                                    <td><a href="https://example.com/codedetal">{course.classid}</a></td>
                                    <td><a href="https://example.com/codedetal">{course.totalcode}</a></td>
                                    <td><a href="https://example.com/studentIDalice">{course.precentofaccetp}</a></td>
                                    <td><a href="https://example.com/courseID">{course.precentofreject}</a></td>
                                  
                                </tr>
                            ))}


                        </thead>
                        </table>
                            <tr>
                            
                         
                            </tr>
                       

                        
                    
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

export default TeacherListallcodes;
