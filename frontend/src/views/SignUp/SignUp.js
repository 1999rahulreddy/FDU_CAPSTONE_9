import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        password2: '',
        errorMessage: '',
        showSuccessModal: false,
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password, password2 } = this.state;

        if (password !== password2) {
            this.setState({ errorMessage: 'Passwords do not match' });
            return;
        }

        axios.post('http://127.0.0.1:8000/api/register/', {
            username,
            password,
            password2,
        })
        .then(res => {
            this.setState({ showSuccessModal: true }, () => {
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 1000);  // 例如，等待2秒后再跳转到登录页面
            });
        })
        .catch(err => {
            console.error(err);
            this.setState({ errorMessage: 'Error registering' });
        })
    }

    render() {
        const { errorMessage, showSuccessModal } = this.state;

        return (
            <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Sign Up Form */}
                <div className="container mt-5 card p-4">
                    <header className="mb-4"><h2>Register</h2></header>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" name="username" className="form-control" onChange={this.handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input type="password" name="password2" className="form-control" onChange={this.handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    {showSuccessModal && 
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Success</h5>
                                        <button type="button" className="close" onClick={() => this.setState({ showSuccessModal: false })}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Registration Successful!</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => this.setState({ showSuccessModal: false })}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default SignUp;
