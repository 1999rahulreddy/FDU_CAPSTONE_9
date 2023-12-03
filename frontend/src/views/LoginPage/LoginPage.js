import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'; 
import Footer from '../../components/Footer';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: this.state.username,
        password: this.state.password
      });

      // 存储 token
      localStorage.setItem('token', response.data.token);
      
      // 使用 this.props.history 替代 useHistory
      this.props.history.push('/dashboard');
      
    } catch (err) {
      this.setState({ errorMessage: 'Login failed. Please check your username and password.' });
      console.error('Login failed:', err);
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div>
          {/* Navigation Bar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/">Home</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <Link className="nav-link" to="/signup">Create New Account</Link>
                      </li>
                  </ul>
              </div>
          </nav>

          {/* Login Form */}
          <div className="container mt-5 card p-4">
              <header className="mb-4"><h2>Login</h2></header>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <label>Username:</label>
                      <input 
                        type="text" 
                        name="username"
                        className="form-control" 
                        onChange={this.handleInputChange} 
                        required />
                  </div>
                  <div className="form-group">
                      <label>Password:</label>
                      <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        onChange={this.handleInputChange} 
                        required />
                  </div>
                  <button type="submit" className="btn btn-primary">
                      Login
                  </button>
              </form>
          </div>
          <Footer />
      </div>
    );
  }
};

export default Login;
