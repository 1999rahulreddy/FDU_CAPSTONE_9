import React from 'react';
import { Link } from 'react-router-dom'; // 导入Link组件
import './VideoBackground.css'; 

const VideoBackground = () => {
  return (
    <div className="video-background-container">
      <video className="video-background" autoPlay muted loop>
        <source src={require("../assets/videos/myBackgroundVideo.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-container">
        <Link to="/signup"> {/* 使用Link组件 */}
          <button className="create-account-button">Create New Account</button>
        </Link>
        <p>Student Code Assessment System provides a comprehensive platform for students to submit code for precise evaluations. With personalized test cases preset by educators, it ensures accurate feedback, enriches coding expertise, and readies you for real-world technical challenges.</p>
      </div>
    </div>
    
  );
}

export default VideoBackground;
