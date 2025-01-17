import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaBook, FaTasks, FaTools } from 'react-icons/fa';

const MentorDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Mentor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Classes */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/live-classes')}
          >
            <FaChalkboardTeacher className="text-blue-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-blue-600">Live Classes</h2>
              <p className="text-gray-600">Manage and schedule live sessions.</p>
            </div>
          </div>

          {/* Students */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/managestudentslist')}
          >
            <FaUsers className="text-green-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-green-600">Students</h2>
              <p className="text-gray-600">Monitor student progress and engagement.</p>
            </div>
          </div>

          {/* Attendance */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/attendance')}
          >
            <FaCalendarAlt className="text-yellow-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-600">Attendance</h2>
              <p className="text-gray-600">Track and manage attendance records.</p>
            </div>
          </div>

          {/* Assignments */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/assignments')}
          >
            <FaBook className="text-purple-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-purple-600">Assignments</h2>
              <p className="text-gray-600">Review and grade assignments.</p>
            </div>
          </div>

          {/* Tasks */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/tasks')}
          >
            <FaTasks className="text-red-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-red-600">Tasks</h2>
              <p className="text-gray-600">Manage and delegate tasks effectively.</p>
            </div>
          </div>

          {/* Tools */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:shadow-lg" 
            onClick={() => handleNavigation('/tools')}
          >
            <FaTools className="text-gray-600 text-4xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-600">Tools</h2>
              <p className="text-gray-600">Access resources and tools for mentoring.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;