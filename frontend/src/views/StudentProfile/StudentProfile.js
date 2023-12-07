import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Footer from '../../components/Footer';
import './StudentProfile.css'; 
import profilePic from '../../assets/images/profile.jpg';


Modal.setAppElement('#root'); // Assuming your root element has the id 'root'

// Sidebar component
class Sidebar extends Component {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Student Dashboard</div>
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    <Link to="/courses" className="list-group-item list-group-item-action bg-light">Courses</Link>
                    <Link to="/grades" className="list-group-item list-group-item-action bg-light">Grades</Link>
                    <Link to="/profile" className="list-group-item list-group-item-action bg-light">Profile</Link>
                    <Link to="/" className="list-group-item list-group-item-action bg-light">Logout</Link>
                </div>
            </div>
        );
    }
}

class StudentProfile extends Component {
    state = {
        userProfile: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            profilePic: profilePic
        },
        isModalOpen: false,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = this.state;

        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match");
            return;
        }

        try {
             const headers = {
            'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const response = await axios.post('http://127.0.0.1:8000/api/chpasswd/', {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_new_password: confirmNewPassword,
            }, { headers: headers });
            console.log(response.data);
            this.closeModal();
            alert('Password changed successfully!'); 
            this.props.history.push('/profile'); 
        } catch (error) {
            console.error('There was an error changing the password', error);
            alert('Failed to change password!'); 
        }
    };

    render() {
        const { name, email, profilePic } = this.state.userProfile;
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2>User Profile</h2>
                        <div className="user-profile">
                            <img src={profilePic} alt="Profile" className="profile-pic" />
                            <h3>{name}</h3>
                            <p>{email}</p>
                            <button onClick={this.openModal} className="btn btn-primary">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Change Password Modal"
                >
                
                    <h2>Change Password</h2>
                    <form onSubmit={this.handleSubmit} className="change-password-form">
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                            value={this.state.oldPassword}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            value={this.state.confirmNewPassword}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-success">Change Password</button>
                        <button onClick={this.closeModal} className="btn btn-secondary">Cancel</button>
                    </form>
                </Modal>
                <Footer />
            </div>
        );
    }
}

export default withRouter(StudentProfile); 
