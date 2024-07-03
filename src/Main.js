import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./Main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoughTwo from "./components/RoughTwo";
import App from "./App";
import CreateCluster from "./components/clusters/CreateCluster";
import RoughOne from "./components/RoughOne";
import RoughThree from "./components/RoughThree";
// import FetchUsers from "./components/users/FetchUsers";
import FetchGroups from "./components/groups/FetchGroups";
import UserCreationForm from "./components/users/UserCreationForm";
import SignIn from "./components/authentication/SignIn";
import ResetPassword from "./components/authentication/ResetPassword";
import GetGroups from "./components/groups/GetGroups";
import UsersList from "./components/users/UsersList";
import Group from "@mui/icons-material/Group";
import GroupDetails from "./components/groups/GroupDetails";
import RoleBinding from "./components/role_bindings/RoleBinding";
import FetchRoles from "./components/roles/FetchRoles";
import UserDropdown from "./components/role_bindings/UserDropdown";
import RoleAssignment from "./components/role_bindings/RoleAssignement";




const isLoggedInFun = () => {
  // Check if the isLoggedIn attribute exists and is set to true in localStorage
  return localStorage.getItem("isLoggedIn") === "true";
};

function Main() {
  useEffect(() => {
    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
      const sidebar = document.querySelector("#sidebar");
      sidebar.classList.toggle("collapsed");
    };

    // Event listener for sidebar toggle button
    const sidebarToggle = document.querySelector("#sidebar-toggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", toggleSidebar);
    }

    // Clean up event listener on component unmount
    return () => {
      if (sidebarToggle) {
        sidebarToggle.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);

  // Function to handle theme toggling
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);

    // Update local storage based on theme
    if (isLight()) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  };

  // Check if the theme is set to light in local storage
  const isLight = () => {
    return localStorage.getItem("light");
  };

  // Apply theme from local storage on initial load
  useEffect(() => {
    if (isLight()) {
      toggleTheme();
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          {localStorage.getItem("isLoggedIn") && <Sidebar />}
          <div className="main">
            {localStorage.getItem("isLoggedIn") && <Navbar />}
            <Routes>
              {/* <Route path="/" element={<App />} />
            <Route path="/page2" element={<CreateCluster />} /> */}
              <Route path="/" element={<SignIn />} />
              
              <Route path="/dashboard" element={<Content />} />
              <Route path="/create-cluster" element={<CreateCluster />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/UserCreationForm" element={<UserCreationForm />} />
              <Route path="/role-bindings" element={<RoleAssignment />} />
              <Route path="/groups" element={<GetGroups />} />
              <Route path="/get-groups/:id" element={<GroupDetails />} />
            </Routes>
            {localStorage.getItem("isLoggedIn") && <Footer />}
          </div>
          {/* Theme toggle button */}
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className="fa-regular fa-moon"></i>
            <i className="fa-regular fa-sun"></i>
          </button>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Main;
