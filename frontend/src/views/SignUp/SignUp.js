import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        showSuccessModal: false,
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            this.setState({ errorMessage: 'Passwords do not match' });
            return;
        }

        axios.post('http://127.0.0.1:8000/signup/', {
            username,
            email,
            password,
        })
        .then(res => {
            this.setState({ showSuccessModal: true });
        })
        .catch(err => {
            console.error(err);
            this.setState({ errorMessage: 'Error registering' });
        })
    }

    render() {
        const { errorMessage, showSuccessModal } = this.state;

        return (
            <div className="container mt-5">
                <header className="mb-4"><h2>Register</h2></header>
                <hr />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" className="form-control" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" className="form-control" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" className="form-control" onChange={this.handleInputChange} required />
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
        );
    }
}

export default SignUp;
