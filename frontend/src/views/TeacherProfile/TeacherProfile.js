// TeacherProfile.js 文件

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TeacherProfile.css'; // 引入样式文件
import teacherprofilePic from '../../assets/images/teacher.jpeg';

class Sidebar extends Component {
    render() {  
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                
                <div className="list-group list-group-flush">
                    <Link to="/TeacherDashBoard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    
                    <Link to="/TeacherProfile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                    <Link to="/Teacherevoluations" className="list-group-item list-group-item-action bg-light">Evaluation</Link>
                    <Link to="/TeacherListallcodes" className="list-group-item list-group-item-action bg-light">Classes</Link>
                    <Link to="/logout" className="list-group-item list-group-item-action bg-light">Logout</Link>
                </div>
            </div>
        );
    }
}

class TeacherProfile extends Component {
    
    state = {
        teacherProfile: {
            imageUrl: teacherprofilePic,
            name: 'James Jones ',
        },
        currentPage: 1
    };

    handlePageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { teacherProfile, currentPage } = this.state;

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2>Teacher Profile</h2>

                        <div className="info-box">
                            <div className="image-container">   
                                <img src={process.env.PUBLIC_URL + teacherProfile.imageUrl} alt="teacher picture" />
                            </div>
                            <div className="right-section">
                                <p><strong>Name:</strong> {teacherProfile.name}</p>
                            </div>
                        </div>

                        <div className="pagination">
                            <button
                                onClick={() => {
                                    if (currentPage > 1) {
                                        this.setState({ currentPage: currentPage - 1 });
                                    }
                                }}
                            >
                            page 1
                            </button>
                            {/* 根据需要添加其他分页按钮或逻辑 */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherProfile;
