import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'John Doe', reason: 'Medical Leave', date: '2025-01-15', status: '' },
    { id: 2, name: 'Jane Smith', reason: 'Family Emergency', date: '2025-01-16', status: '' },
    { id: 3, name: 'Sam Wilson', reason: 'Personal Reason', date: '2025-01-17', status: '' },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (id) => {
    const student = leaveRequests.find((request) => request.id === id);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleAccept = () => {
    Swal.fire({
      title: 'Accepted!',
      text: `Leave request for ${selectedStudent.name} has been accepted.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });

    setLeaveRequests((prev) =>
      prev.map((request) =>
        request.id === selectedStudent.id ? { ...request, status: 'accepted' } : request
      )
    );
    setShowModal(false);
  };

  const handleReject = () => {
    Swal.fire({
      title: 'Rejected!',
      text: `Leave request for ${selectedStudent.name} has been rejected.`,
      icon: 'error',
      confirmButtonText: 'OK',
    });

    setLeaveRequests((prev) =>
      prev.map((request) =>
        request.id === selectedStudent.id ? { ...request, status: 'rejected' } : request
      )
    );
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Leave Requests</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Requests</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Reason</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr
                    key={request.id}
                    className={`hover:bg-blue-50 ${
                      request.status === 'accepted'
                        ? 'bg-green-100'
                        : request.status === 'rejected'
                        ? 'bg-red-100'
                        : ''
                    }`}
                  >
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{request.name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{request.reason}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{request.date}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewDetails(request.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-1/3">
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">Student Details</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-2"><span className="font-bold">Name:</span> {selectedStudent.name}</p>
                <p className="mb-2"><span className="font-bold">Reason:</span> {selectedStudent.reason}</p>
                <p className="mb-2"><span className="font-bold">Date:</span> {selectedStudent.date}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleAccept}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;