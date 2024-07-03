import React, { useEffect } from 'react';
import profileImg from '../assets/images/profile.jpg'; // Adjust the path as per your folder structure
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize Bootstrap dropdown
    const dropdownElement = document.querySelector('.dropdown-toggle');
    if (dropdownElement) {
      dropdownElement.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        if (!dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.add('show');
        } else {
          dropdownMenu.classList.remove('show');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!dropdownElement.contains(e.target)) {
          const dropdownMenu = dropdownElement.nextElementSibling;
          dropdownMenu.classList.remove('show');
        }
      });
    }
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("isLoggedIn", false);
    
    navigate("/");
    window.location.reload();
    
  }
  return (
    <nav className="navbar navbar-expand px-3 border-bottom">
      <button className="btn" id="sidebar-toggle" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse navbar">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            
            <a href="#" className="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <b>Super Admin</b> <img src={profileImg} class="avatar img-fluid rounded" alt="notfound" />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#"><i class="fas fa-user-alt pe-2"></i> Profile</a></li>
              <li><a className="dropdown-item" href="#"><i class="fas fa-cog pe-2"></i> Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li className="dropdown-item" onClick={handleLogout}><i class="fas fa-door-open pe-2"></i>Logout</li>
              {/* <li onClick={handleLogout}>Logout</li> */}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
