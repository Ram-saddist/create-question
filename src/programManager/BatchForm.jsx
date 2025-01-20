import React, { useState } from 'react';
import { FaIdCard, FaCalendarAlt, FaClock, FaCodeBranch, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import axios from 'axios'; 

const techStacks = {
  vijayawada: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
  hyderabad: ["Python Full Stack (PFS)", "Java Full Stack (JFS)", "Data Science", "Data Analytics"],
  bangalore: ["Java Full Stack (JFS)"]
};

const BatchForm = () => {
  const [formData, setFormData] = useState({
    BatchId: '',
    TechStack: '',
    Date: '',
    Duration: '',
    Status: '',
    Mentor:''
  });

  const location = localStorage.getItem('location') || 'Vijayawada'; // Default to Vijayawada
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      BatchId: formData.BatchId.toUpperCase(),
      TechStack: formData.TechStack,
      Date: formData.Date,
      Duration: formData.Duration,
      Status: formData.Status,
      location,
      Mentor:formData.Mentor
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/batches`, payload);
      Swal.fire({
        title: 'Success!',
        text: response.data.message || 'Batch Created Successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setFormData({
        BatchId: '',
        TechStack: '',
        Date: '',
        Duration: '',
        Status: '',
        Mentor:''
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.error || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleViewBatches = () => {
    navigate('/viewbatch');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Create New Batch
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Batch ID */}
            <div>
              <label htmlFor="BatchId" className="block text-sm font-medium text-gray-700">
                <FaIdCard className="inline mr-2 text-blue-500" />
                Batch ID
              </label>
              <input
                type="text"
                name="BatchId"
                id="BatchId"
                value={formData.BatchId.toUpperCase()}
                onChange={handleInputChange}
                placeholder="Enter Batch ID (e.g., PFS-100)"
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label htmlFor="TechStack" className="block text-sm font-medium text-gray-700">
                <FaCodeBranch className="inline mr-2 text-green-500" />
                Tech Stack
              </label>
              <select
                name="TechStack"
                id="TechStack"
                value={formData.TechStack}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select a Tech Stack
                </option>
                {techStacks[location]?.map((stack) => (
                  <option key={stack} value={stack}>
                    {stack}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="Date" className="block text-sm font-medium text-gray-700">
                <FaCalendarAlt className="inline mr-2 text-yellow-500" />
                Start Date
              </label>
              <input
                type="date"
                name="Date"
                id="Date"
                value={formData.Date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]} // Sets the minimum date to today
                className="mt-1 cursor-pointer block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="Duration" className="block text-sm font-medium text-gray-700">
                <FaClock className="inline mr-2 text-indigo-500" />
                Course Duration
              </label>
              <input
                type="text"
                name="Duration"
                id="Duration"
                value={formData.Duration}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                  handleInputChange({ target: { name: e.target.name, value } });
                }}
                placeholder="Enter Duration (e.g., 3 Months)"
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="Status" className="block text-sm font-medium text-gray-700">
                <FaInfoCircle className="inline mr-2 text-pink-500" />
                Course Status
              </label>
              <select
                name="Status"
                id="Status"
                value={formData.Status}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
            <div>
              <label htmlFor="Mentor" className="block text-sm font-medium text-gray-700">
                <FaIdCard className="inline mr-2 text-blue-500" />
                Mentor Name
              </label>
              <input
                type="text"
                name="Mentor"
                id="Mentor"
                value={formData.Mentor}
                onChange={handleInputChange}
                placeholder="Enter Mentor Name (e.g., Saketh)"
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 rounded-md shadow-lg transform transition duration-300 ease-in-out ${
                isLoading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {isLoading ? 'Submitting...' : 'Create Batch'}
            </button>
            <button
              onClick={handleViewBatches}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              View Batches
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
};

export default BatchForm;
