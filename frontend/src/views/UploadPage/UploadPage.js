import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [responseDetails, setResponseDetails] = useState({
    testCases: [],
    results: [],
    expectedOutput: [],
    realOutput: [],
    score: null
  });
  const { courseId, assignmentId } = useParams();
  const studentId = localStorage.getItem('student_id');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/upload/${courseId}/${assignmentId}/`, formData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      setMessage('File uploaded successfully');
      setResponseDetails({
        testCases: response.data.test_cases,
        results: response.data.results,
        expectedOutput: response.data['expected output'],
        realOutput: response.data['Real output'],
        score: response.data.score
      });
    } catch (err) {
      setMessage('File upload failed');
      console.error(err);
    }
  };

 const renderResponseDetails = () => {
    const { testCases, results, expectedOutput, realOutput, score } = responseDetails;
    return (
      <div>
        <h3>Result</h3>
        <h4>Input</h4>
        <ul>
          {testCases.map((testCase, index) => (
            <li key={index}>{testCase}</li>
          ))}
        </ul>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
        <h4>Expected Output</h4>
        <ul>
          {expectedOutput.map((output, index) => (
            <li key={index}>{output}</li>
          ))}
        </ul>
        <h4>Real Output</h4>
        <ul>
          {realOutput.map((output, index) => (
            <li key={index}>{output}</li>
          ))}
        </ul>
        <p>Score: {score}</p>
      </div>
    );
  };


  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-3">
                {/* Sidebar */}
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
            </div>
            <div className="col-md-9">
                <header className="mb-4"><h2>Upload File for Course {courseId}, Assignment {assignmentId}</h2></header>
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
                {responseDetails.score !== null && renderResponseDetails()}
            </div>
        </div>
    </div>
  );
};

export default UploadFile;
