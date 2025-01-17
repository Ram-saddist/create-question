import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
  let navigate = useNavigate();
  // let location = useLocation();
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const userType = localStorage.getItem("userType");

  const isDashboard = userType && ["student", "company", "bde", "admin"].includes(userType);

  const handleClick = (location) => {
    navigate(location);
    setShowNavLinks(false);
    setShowBlur(false);
  };

  const handleToggle = () => {
    setShowNavLinks(!showNavLinks);
    setShowBlur(!showBlur);
  };

  const handleClose = () => {
    setShowNavLinks(false);
    setShowBlur(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('student_id');
    navigate("/");
  };

  const menuItems = userType
    ? userType === "student"
      ? [
          { label: "Profile", path: "/student-profile" },
          { label: "Jobs List", path: "/jobslist" },
          { label: "Update Profile", path: "/student-profile-update" },
          { label: "Logout", action: handleLogout },
        ]
      : userType === "company"
      ? [
          { label: "Add Jobs", path: "/addjob" },
          { label: "My Jobs", path: "/myjobs" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", action: handleLogout },
        ]
      : userType === "bde"
      ? [
          { label: "Add Job", path: "/addjob" },
          { label: "Students List", path: "/studentslist" },
          { label: "Dashboard", path: "/bdedashboard" },
          { label: "Logout", action: handleLogout },
        ]
      : userType === "admin"
      ? [
          { label: "Add Job", path: "/addjob" },
          { label: "Jobs List", path: "/bdedashboard" },
          { label: "Students List", path: "/studentslist" },
          { label: "Student Data", path: "/studentsearch" },
          { label: "Student Enrollment", path: "/programmanagersignup" },
          { label: "Logout", action: handleLogout },
        ]
      : []
    : [
        { label: "Login", path: "/login" },
        // Uncomment if signup is needed
        // { label: "Signup", path: "/signup/student" },
      ];

  return (
    <>
      {/* Sidebar for dashboard */}
      {isDashboard ? (
        <Drawer variant="permanent" className="sidebar" anchor="left">
          <div className="sidebar-header">
            <img
              src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/codegnan-logo_qxnxrq.webp"
              alt="Codegnan Logo"
              className="logo"
              width="100"
              height="50"
              onClick={() => handleClick("/")}
            />
          </div>
          <div className="sidebar-menu">
            {menuItems.map((item, index) =>
              item.action ? (
                <Button
                  key={index}
                  color="inherit"
                  id="nav-link"
                  onClick={item.action}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  id="nav-link"
                  onClick={() => handleClick(item.path)}
                >
                  {item.label}
                </Button>
              )
            )}
          </div>
        </Drawer>
      ) : (
        // Navbar for other pages
        <AppBar position="static" className="navbar" elevation={0}>
          <Toolbar className="tool">
            <img
              src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/codegnan-logo_qxnxrq.webp"
              alt="Codegnan Logo"
              className="logo"
              width="100"
              height="50"
              onClick={() => handleClick("/")}
            />
            <div className={`nav-links ${showNavLinks ? 'show' : ''}`}>
              {menuItems.map((item, index) =>
                item.action ? (
                  <Button
                    key={index}
                    color="inherit"
                    id="nav-link"
                    onClick={item.action}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    color="inherit"
                    id="nav-link"
                    onClick={() => handleClick(item.path)}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </div>
            <button
              className={`toggler ${showNavLinks ? 'show' : ''}`}
              onClick={handleToggle}
              aria-label={
                showNavLinks ? 'Close navigation menu' : 'Open navigation menu'
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Toolbar>
          {showBlur && (
            <div
              className={`blur-bg ${showBlur ? 'show' : ''}`}
              onClick={handleClose}
            ></div>
          )}
        </AppBar>
      )}
    </>
  );
};

export default Navigation;
