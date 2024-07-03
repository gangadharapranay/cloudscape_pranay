import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/authentication/reset-password.css'; // Import the CSS file

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(newPassword === e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      console.log('Form submitted:', { email, newPassword });
      // Handle form submission logic here (e.g., API call)
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div className="form-container">
      <h3 className='mb-4'>Reset Password</h3>
      <hr/>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <div className="password-input-group mb-3">
          <label>New Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {!passwordsMatch && (
          <span className="error-message">Passwords do not match</span>
        )}
        <button type="submit" className="new-button mb-3">Reset My Password</button>
      </form>
      <p>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
