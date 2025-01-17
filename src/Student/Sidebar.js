import React, { useState,useEffect } from 'react';
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
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBookOpen
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userType = localStorage.getItem('userType');

  const roleDisplayNames = {
    student: 'Student',
    mentor: 'Mentor',
    bde: 'Business Development Executive',
    program_manager: 'Program Manager',
    admin: 'Admin',
    superAdmin: 'Super Admin',
  };
  

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);
  

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('student_id');
    setTimeout(() => navigate('/'), 100); // Ensures logout redirection
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close sidebar
  };

  const menuItems = userType
    ? userType === 'student_login_details'
      ? [
          { label: 'Profile', path: '/student-profile-update', icon: FaUser },
          { label: 'Jobs List', path: '/jobslist', icon: FaBook },
          { label: 'Course', path: '/courses', icon: FaClipboard },
          { label: 'Exam', path: '/exams', icon: FaFileAlt },
          { label: 'Compiler', path: '/compiler', icon: FaTerminal },
          { label: 'ATS', path: '/ats-upload', icon: FaLayerGroup },
          { label: 'Mock Interviews', path: '/mock-interviews', icon: FaMicrophoneAlt },
          { label: 'Reports', path: '/reports', icon: FaChartBar },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
      : userType === 'Mentors'
      ? [
          { label: 'Courses', path: '/mentor-dashboard', icon: FaChalkboardTeacher },
          { label: 'Attendance', path: '/attendance', icon: FaClipboard },
          { label: 'Student List', path: '/studentslist', icon: FaUsers },
          { label: 'Online Exam', path: '/exams', icon: FaFileAlt },
          { label: 'Coding Platform', path: '/compiler', icon: FaTerminal },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },

        ]
      : userType === 'BDE_data'
      ? [
          { label: 'Add Job', path: '/addjob', icon: FaPlusSquare },
          { label: 'Students List', path: '/studentslist', icon: FaUsers },
          { label: 'Student Search', path: '/studentsearch', icon: FaSearch },
          { label: 'Dashboard', path: '/bdedashboard', icon: FaLayerGroup },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
      : userType === ''
      ? [
          { label: 'Enroll Students', path: '/student-enrollment', icon: FaGraduationCap },
          { label: 'Student Search', path: '/studentsearch', icon: FaSearch },
          { label: 'Student Data', path: '/studentdata', icon: FaFileAlt },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
      : userType === 'Manager'
      ? [
          { label: 'Add Job', path: '/addjob', icon: FaPlusSquare },
          { label: 'Jobs List', path: '/bdedashboard', icon: FaLayerGroup },
          { label: 'Students List', path: '/studentslist', icon: FaUsers },
          { label: 'Student Search', path: '/studentsearch', icon: FaSearch },
          { label: 'Student Enrollment', path: '/student-enroll', icon: FaSchool },
          {
            label: 'Curriculum',
            path: '/curriculum',
            icon: FaBookOpen,
            hasArrow: true,
            subItems: [
              { label: 'Java Syllabus', path: '/curriculum/java' },
              { label: 'Data Structures', path: '/curriculum/data-structures' },
              { label: 'Python Syllabus', path: '/curriculum/python' },
              { label: 'React JS Syllabus', path: '/curriculum/reactjs' },
              { label: 'C Language Syllabus', path: '/curriculum/c' },
              { label: 'Data Science Syllabus', path: '/curriculum/data-science' },
              { label: 'Java Full Stack', path: '/curriculum/java-full-stack' },
              { label: 'Software Testing', path: '/curriculum/software-testing' },
              { label: 'Python Full Stack', path: '/curriculum/python-full-stack' },
              { label: 'Machine Learning', path: '/curriculum/machine-learning' },
            ],
          },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
      : userType === 'superAdmin'
      ? [
          { label: 'Manage BDEs', path: '/bdes', icon: FaBriefcase },
          { label: 'Manage Mentors', path: '/mentors', icon: FaChalkboardTeacher },
          { label: 'Manage Students', path: '/student-enroll', icon: FaUsers },
          { label: 'Manage Program Managers', path: '/program-managers', icon: FaSchool },
          { label: 'Reports', path: '/reports', icon: FaChartBar },
          { label: 'Logout', action: handleLogout, icon: FaSignOutAlt },
        ]
      : []
    : [];

  const isAuthPage = [
    '/login',
    '/forgotPassword',
    '/bdelogin',
    '/bdeforgotpassword',
    '/adminlogin',
    '/adminforgotpassword',
    '/superadminlogin',
    '/superadmin',
    '/',
  ].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div>
        <div className="w-full h-16 bg-white flex items-center justify-between px-4">
          <span className="text-lg font-semibold text-gray-800 cursor-pointer" onClick={() => handleNavigation('/')}>Welcome</span>
          <button
            className="p-2 text-gray-400 hover:text-black focus:outline-none"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  const MenuItem = ({ icon: Icon, label, path, action }) => {
    const isActive = location.pathname === path;

    return (
      <button
        className={classNames(
          "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors w-full",
          {
            "bg-indigo-600 text-white": isActive,
            "text-gray-300 hover:bg-indigo-700 hover:text-white": !isActive,
          }
        )}
        onClick={action ? action : () => handleNavigation(path)}
      >
        {/* Icon always visible */}
        <Icon size={18} />
        {/* Label visibility controlled by isCollapsed */}
        <span className={classNames({ hidden: isCollapsed, block: !isCollapsed })}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Menu Bar Button */}
      <button
      className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md md:hidden"
      onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      aria-expanded={isMobileMenuOpen}
      aria-label="Toggle sidebar"
    >
      <FaBars className="h-6 w-6" />
    </button>

      {/* Sidebar */}
      <div
        className={classNames(
          "fixed inset-y-0 left-0 z-40 bg-gray-800 transition-all duration-300 overflow-y-auto",
          {
            "w-64": isMobileMenuOpen || !isCollapsed,
            "w-16": !isMobileMenuOpen && isCollapsed,
          }
        )}
      >
        <div className="p-4">
          
          <button
            className="flex items-center justify-between text-gray-300 w-full"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <span className={classNames({ hidden: isCollapsed, block: !isCollapsed })}>
            {roleDisplayNames[userType] || 'User'}
            </span>
            <FaChevronLeft
              className={classNames('transition-transform', {
                'rotate-180': !isCollapsed,
              })}
            />
          </button>
        </div>
        {/* Menu Items */}
        <div className="mt-6 space-y-2">
          {menuItems.map((item, index) =>
            item.hasArrow && item.subItems ? (
              <div key={index}>
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  action={item.action}
                />
                {!isCollapsed && (
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <MenuItem
                        key={`${index}-${subIndex}`}
                        icon={item.icon}
                        label={subItem.label}
                        path={subItem.path}
                        action={subItem.action}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                action={item.action}
              />
            )
          )}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
