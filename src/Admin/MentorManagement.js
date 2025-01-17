import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

const MentorManagement = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({  name: '', email: '', phone: '', location: '',designation:'', userType: 'mentor' });

  const locations = ['vijayawada', 'hyderabad', 'bangalore'];
const  designations =["Python Full Stack (PFS)","Java Full Stack (JFS)","Frontend","Soft Skills","Aptitude","Data Science","Data Analytics"]
  // Fetch BDE data from API

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mentor`);
      setData(response.data.mentors);
      console.log('mentor data:', response.data);
    } catch (error) {
      console.error('Error fetching Mentor data:', error);
      Swal.fire({ icon: 'error', title: 'Failed to load data' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open Add/Edit Modal
  const handleOpenModal = (mentor = null) => {
    setFormData(mentor || {  name: '', email: '', phone: '', location: locations[0], userType: 'mentor', designation:designations[0] });
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', location: '', userType: 'mentor', designation:'' });
  };

  // Validate Email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Phone Number
  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // POST method (Add BDE)
  const handleAdd = async (newData) => {
    console.log('New Mentor:', newData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/mentor`,
        newData
      );

      setData([...data, response.data]);
      fetchData()
      Swal.fire({ icon: 'success', title: 'Added successfully!' });
    } catch (error) {
      console.error('Error adding BDE:', error);
      Swal.fire({ icon: 'error', title: 'Failed to add Mentor.' });
    }
  };

  // PUT method (Update BDE using ID)
  const handleUpdate = async (id, updatedData) => {
    console.log(updatedData)
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/bdesignup/${id}`,
        updatedData
      );

      const updatedBDE = response.data;
      const updatedDataList = data.map((bde) => (bde.id === id ? updatedBDE : bde));
      setData(updatedDataList);

      Swal.fire({ icon: 'success', title: 'Updated successfully!' });
    } catch (error) {
      console.error('Error updating BDE:', error);
      Swal.fire({ icon: 'error', title: 'Failed to update BDE.' });
    }
  };

  // Save BDE (Add/Edit)
  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.designation  || !formData.userType) {
      Swal.fire({ icon: 'error', title: 'Please fill all fields.' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      Swal.fire({ icon: 'error', title: 'Invalid email format.' });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      Swal.fire({ icon: 'error', title: 'Phone number must start with +91 and have 10 digits.' });
      return;
    }

    if (formData.id) {
      // Edit existing BDE (PUT request)
      await handleUpdate(formData.id, formData);
    } else {
      // Add new BDE (POST request)
      await handleAdd(formData);
    }

    handleCloseModal();
  };

  // Delete BDE
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bdesignup/${id}`);
          const filteredData = data.filter((bde) => bde.id !== id);
          setData(filteredData);
          Swal.fire({ icon: 'success', title: 'Deleted successfully!' });
        } catch (error) {
          console.error('Error deleting BDE:', error);
          Swal.fire({ icon: 'error', title: 'Failed to delete mentor.' });
        }
      }
    });
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Mentor Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={() => handleOpenModal()}
        >
          + Add Mentor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Name</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Email</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Phone</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Location</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Desigation</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.PhNumber}</td>
                <td className="py-2 px-4">{item.location}</td>
                <td className="py-2 px-4">{item.Designation}</td>

                <td className="py-2 px-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-3"
                    onClick={() => handleOpenModal(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item.id)} // Deleting by ID
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">{formData.id ? 'Edit Mentor' : 'Add mentor'}</h3>
            <form className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="number"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                placeholder="Phone Number"
                value={formData.PhNumber}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
               <select
                className="w-full px-4 py-2 border rounded focus:outline-none"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              >
                {designations.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, usertype: e.target.value })}
              >
                <option value="bde">mentor</option>
              </select>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorManagement;
