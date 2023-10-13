import React from 'react';
import { Link } from 'react-router-dom';  // 导入Link组件
import VideoBackground from '/Users/spock/Documents/github/capstone/AssessmentSystem/test_project/frontend/src/components/VideoBackground';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Student Code Assessment System</Link>
                <div className="ml-auto">
                    <Link to="/login" className="btn btn-light">Sign In</Link>
                </div>
            </nav>

            <VideoBackground> {/* 使用VideoBackground组件 */}
                <div className="hero-section d-flex justify-content-center align-items-center text-white">
                    <div className="text-center">
                        <h1>A New Way to Learn</h1>
                        <p>
                            Student Code Assessment System provides a comprehensive platform for students to submit code for precise evaluations. With personalized test cases preset by educators, it ensures accurate feedback, enriches coding expertise, and readies you for real-world technical challenges.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg mt-3">Create Account</Link>
                    </div>
                </div>
            </VideoBackground>
        </div>
    );
}

export default HomePage;
