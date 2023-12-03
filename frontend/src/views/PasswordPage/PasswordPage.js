import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

function PasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory(); 

 useEffect(() => {
    if (message === 'Password changed successfully!') {
      const timer = setTimeout(() => {
        history.push('/profile');
      }, 1000);

      // Clear the timeout if the component is unmounted before the timeout is reached
      return () => clearTimeout(timer);
    }
  }, [message, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const headers = {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      };
      const response = await axios.post('http://127.0.0.1:8000/api/chpasswd/', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword
      }, { headers });

      setMessage('Password changed successfully!');
    } catch (error) {
      setMessage('Failed to change password.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Change Password
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm your new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default PasswordPage;
