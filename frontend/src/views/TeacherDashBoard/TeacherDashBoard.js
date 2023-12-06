import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TeacherDashBoard.css';
import Footer from '../../components/Footer';
import * as echarts from 'echarts';


class Sidebar extends Component {
    render() {  
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>            
                    <Link to="/TeacherProfile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                    <Link to="/Teacherevoluations" className="list-group-item list-group-item-action bg-light">Evaluation</Link>
                    <Link to="/TeacherListallcodes" className="list-group-item list-group-item-action bg-light">Classes</Link>
                    <Link to="/logout" className="list-group-item list-group-item-action bg-light">Logout     </Link>
                </div>
            </div>
        );
    }
}

class TeacherDashBoard extends Component {
    
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

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('chart1'));
        myChart.setOption({
            title: {
              text: 'Total codes per month'
            },
            tooltip: {},
            xAxis: {
              data: ['DEC', 'NOV', 'OCT', 'SPE', 'AUG', 'JULY']
            },
            yAxis: {},
            series: [
              {
                name: 'code',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }
            ]
          });

        let myEchart = echarts.init(document.getElementById('chart2'));
        myEchart.setOption({
            series: [
              {
                type: 'pie',
                data: [
                  {
                    value: 111,
                    name: 'acpet'
                  },
                  {
                    value: 222,
                    name: 'reject'
                  },
                  
                ]
              }
            ]
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
                    <h2>Teacher Dashboard</h2>
                    
                    <div className='title'> </div>
                    <table className="table" border="5">
                        <thead>
                            <tr>
                               
                                <th>Total code resceived </th>
                                <th>Total evaluated codes </th>
                                <th>accept / reject </th>
                            </tr>
                            <tr>
                                <td><a href="https://example.com/target1">100</a></td>
                                <td><a href="https://example.com/target1">2323</a></td>
                                <td><a href="https://example.com/target1">100/200</a></td>
                            </tr>
                        </thead>
                        </table>
                            <tr>
                            <td><div id="chart1" style={{width: 300, height: 400}}></div></td>
                            <td>                               </td>
                            <td><div id="chart2" style={{width: 500, height: 400}}></div></td>
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

export default TeacherDashBoard;
