import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import Footer from '../../components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class Sidebar extends Component {
    render() {
      const studentId = localStorage.getItem('student_id');

        return (
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
        );
    }
}

class StudentDashboard extends Component {
    state = {
    totalCodesSubmitted: 0,
    codesToUpload: 0,
    monthlyCodeData: [ // This is your bar chart data
      { month: 'January', submitted: 3, passed:3 },
      { month: 'February', submitted: 1, passed: 1 },
       { month: 'March', submitted: 2, passed: 2 },
        { month: 'April', submitted: 4, passed: 3 },
        { month: 'May', submitted: 3, passed: 2 },
        { month: 'August', submitted: 4, passed: 4 },
      // ... add data for other months
        ],
        totalPassed: 0,
        totalFailed: 0,
    };

    componentDidMount() {
        // TODO: Fetch the actual numbers and update the state
        // For example, you might make an API call here and then update the state with the results
        this.setState({
            totalCodesSubmitted: 12, // Placeholder for actual fetched value
            codesToUpload: 3, // Placeholder for actual fetched value
        }, () => {
      // After state is set, calculate totals
      this.calculateTotals();
    });
    }

    calculateTotals = () => {
    const { monthlyCodeData } = this.state;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalCodesSubmitted = 0;

    monthlyCodeData.forEach((data) => {
      totalPassed += data.passed;
      totalFailed += (data.submitted - data.passed);
      totalCodesSubmitted = totalPassed + totalFailed;
    });

    this.setState({ totalPassed, totalFailed, totalCodesSubmitted});
  }

    render() {
        const { totalCodesSubmitted, codesToUpload, monthlyCodeData,  totalPassed, totalFailed} = this.state;
        const pieData = [
        { name: 'Passed', value: totalPassed },
        { name: 'Failed', value: totalFailed },
    ];
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2>Student Dashboard</h2>
                        <div className="dashboard-squares">
                            <div className="dashboard-square">
                                <div className="dashboard-square-content">
                                    <span className="dashboard-square-title">Total Codes Submitted</span>
                                    <span className="dashboard-square-number">{totalCodesSubmitted}</span>
                                </div>
                            </div>
                            <div className="dashboard-square">
                                <div className="dashboard-square-content">
                                    <span className="dashboard-square-title">Assessments Pending</span>
                                    <span className="dashboard-square-number">{codesToUpload}</span>
                                </div>
                            </div>
                        </div>
                         <div className="row">
              <div className="col-md-8">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyCodeData}
                    margin={{
                      top: 5,
                      right: 50,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="submitted" fill="#8884d8" />
                    <Bar dataKey="passed" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-md-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {
                        pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === 'Passed' ? '#82ca9d' : '#8884d8'} />
                        ))
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default StudentDashboard;