import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaChevronLeft,
  FaUser,
  FaSignOutAlt,
  FaPlusSquare,
  FaLayerGroup,
  FaSearch,
  FaUsers,
  FaSchool,
  FaBook,
  FaClipboard,
  FaTerminal,
  FaFileAlt,
  FaMicrophoneAlt,
  FaChartBar,
  FaBriefcase,
    FaChalkboardTeacher,
  FaBookOpen,
  FaTachometerAlt
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";




export const SidebarV = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userType = localStorage.getItem("userType") || "null";

  
const roleDisplayNames = {
  student_login_details: 'Student',
  Mentors: 'Mentor',
  BDE_data: 'Business Development Executive',
  Manager: 'Program Manager',
  admin: 'Admin',
  superAdmin: 'Admin',
};



  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
  
    // navigate("/", { replace: true });
     window.location.href = "/";
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const menuItems = userType
    ? userType === "student_login_details"
      ? [
        { label: "Dashboard", path: "/student-dashboard", icon: FaTachometerAlt },
          { label: "Profile", path: "/student-profile", icon: FaUser },
          { label: "Jobs List", path: "/jobslist", icon: FaBook },
          { label: "Course", path: "/courses", icon: FaClipboard },
          { label: "Exam", path: "/exams", icon: FaFileAlt },
          { label: "Compiler", path: "/compiler", icon: FaTerminal },
          { label: "ATS", path: "/ats-upload", icon: FaLayerGroup },
          { label: "Mock Interviews", path: "/mock-interviews", icon: FaMicrophoneAlt },
          { label: "Logout", action: handleLogout, icon: FaSignOutAlt },
        ]
        :userType === "super"
        ? [
            {
              label: "Students",
              icon: FaUsers,
              subItems: [
                { label: "Manage Jobs List", path: "/dashboard", icon: FaBook },
                { label: "Students List", path: "/studentslist", icon: FaUsers },
                { label: "Student Search", path: "/studentsearch", icon: FaSearch },
                { label: "Student Attendance Report", path: "/attendance-report", icon: FaClipboard },
              ],
            },
            { label: "Reports", path: "/reports", icon: FaChartBar },
            { label: "Logout", action: handleLogout, icon: FaSignOutAlt },
          ]
        :userType === 'superAdmin'
      ? [
          { label: 'Manage BDEs', path: '/bdes', icon: FaBriefcase },
          { label: 'Manage Mentors', path: '/mentors', icon: FaChalkboardTeacher },
          { label: 'Manage Program Managers', path: '/program-managers', icon: FaSchool },
          { label: 'Students List', path: '/studentslist', icon: FaUsers },
          {
            label: "Curriculum",
            path: "/curriculum",
            icon: FaBookOpen,
          },
          { label: 'Reports', path: '/reports', icon: FaChartBar },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
         :userType === 'BDE_data'
              ? [
                  { label: 'Add Job', path: '/addjob', icon: FaPlusSquare },
                  { label: 'Students List', path: '/managestudentslist', icon: FaUsers },
                  { label: 'Student Search', path: '/studentsearch', icon: FaSearch },
                  { label: 'Dashboard', path: '/dashboard', icon: FaLayerGroup },
                  { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
                ]

      : userType === "Mentors"
      ? [
        { label: "Mentor Dashboard", path: "/mentor-dashboard", icon: FaTachometerAlt },
          { label: "Courses", path: "/course", icon: FaChalkboardTeacher },
          { label: "Attendance", path: "/attendance", icon: FaClipboard },
          { label: "Student List", path: "/managestudentslist", icon: FaUsers },
          {
            label: "Online Exam",
            path: "/exams", 
            icon: FaFileAlt,
            subItems: [
              { label: "Create Exam", path: "/create-exam", icon: FaPlusSquare },
              { label: "Manage Exam", path: "/manage-exams", icon: FaLayerGroup },
              { label: "View Leaderboard", path: "/leaderboard", icon: FaChartBar },
            ],
          },   
          { label: "Coding Platform", path: "/compiler", icon: FaTerminal },
          { label: "Logout", action: handleLogout, icon: FaSignOutAlt },
        ]
      : userType === "Manager"
      ? [
        { label: "Manager Dashboard", path: "/manager-dashboard", icon: FaTachometerAlt },
        { label: 'Students List', path: '/managestudentslist', icon: FaUsers },
        { label: 'Student Search', path: '/studentsearch', icon: FaSearch },
          { label: "Manage Jobs List", path: "/dashboard", icon: FaLayerGroup },
          { label: "Student Enrollment", path: "/student-enroll", icon: FaSchool },
          { label: "Student Attendance", path: "/attendancedata", icon: FaClipboard },      
          { label: 'Batch Schedule', path: '/batchschedule', icon: FaUsers },
          { label: "Create Batch", path: "/createbatch", icon: FaPlusSquare },
          { label: "Logout", action: handleLogout, icon: FaSignOutAlt },

        ]
      : []
    : [];



  const isLoggedIn = !!localStorage.getItem("userType");
  
    if (!isLoggedIn) {
      return (
        <div>
          <div className="w-full h-16 bg-white flex items-center justify-between px-4">
          <img
              src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/codegnan-logo_qxnxrq.webp"
              alt="Codegnan Logo"
              className="logo cursor-pointer"
              width="150"
              height="150"
              onClick={() => navigate("/")}
            />
                <button
                className="p-1 bg-pink-500 text-white ml-1 font-serif font-medium text-md rounded-lg shadow-lg hover:bg-pink-600 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => navigate('/login')}
              >
                Login
              </button>

          </div>
        </div>
      );
    }  

  const MenuItem = ({ icon: Icon, label, path, action, subItems }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const isActive = location.pathname === path;

   

    return (
      <>
        <button
          className={classNames(
            "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors w-full",
            {
              "bg-indigo-600 text-white": isActive,
              "text-gray-300 hover:bg-indigo-700 hover:text-white": !isActive,
            }
          )}
          onClick={
            subItems
              ? () => setIsSubMenuOpen((prev) => !prev)
              : action
              ? action
              : () => handleNavigation(path)
          }
        >
          <Icon size={18} />
          <span className={classNames({ hidden: isCollapsed, block: !isCollapsed })}>
            {label}
          </span>
          {subItems && (
            <FaChevronLeft
              className={classNames("ml-auto transition-transform", {
                "rotate-90": isSubMenuOpen,
              })}
            />
          )}
        </button>
        {subItems && isSubMenuOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {subItems.map((subItem, subIndex) => (
              <button
                key={subIndex}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-indigo-700 transition-colors w-full"
                onClick={() => handleNavigation(subItem.path)}
              >
                 <subItem.icon size={16} />
                <span>{subItem.label}</span>
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white text-white">
        <button
          className="p-2 rounded-md bg-black text-white"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>
      <div
        className={classNames(
          "fixed inset-y-0 left-0 z-40 bg-black text-white transition-transform duration-300 overflow-y-auto",
          {
            "translate-x-0 w-64": isMobileMenuOpen,
            "-translate-x-full w-64": !isMobileMenuOpen,
          }
        )}
      >
        <div className="p-4">
          <button
            className="flex items-center justify-between w-full text-gray-300"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <span>{roleDisplayNames[userType]}</span>
            <FaChevronLeft
              className={classNames("transition-transform", {
                "rotate-180": !isCollapsed,
              })}
            />
          </button>
        </div>
        <div className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              action={item.action}
              subItems={item.subItems}
            />
          ))}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

