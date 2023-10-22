import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      setMessage('File uploaded successfully');
      console.log(response.data);

    } catch (err) {
      setMessage('File upload failed');
      console.error(err);
    }
  };

  return (
    <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Studen Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>

        {/* Upload File Form */}
        <div className="container mt-5 card p-4">
            <header className="mb-4"><h2>Upload File</h2></header>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label htmlFor="file">File:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Upload
                </button>
            </form>
        </div>
    </div>
  );
};

export default UploadFile;
