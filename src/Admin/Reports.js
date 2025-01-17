import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Default data arrays
const defaultBDEData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+911234567890', location: 'Vijayawada' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+919876543210', location: 'Hyderabad' },
];

const defaultMentorData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+911234567891', location: 'Bangalore' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+919876543211', location: 'Chennai' },
];

const defaultProgramManagerData = [
  { id: 1, name: 'Sara Parker', email: 'sara@example.com', phone: '+911234567892', location: 'Mumbai' },
  { id: 2, name: 'Michael Brown', email: 'michael@example.com', phone: '+919876543212', location: 'Delhi' },
];

const Reports = () => {
  // State for counts
  const [bdeCount, setBdeCount] = useState(defaultBDEData.length);
  const [mentorCount, setMentorCount] = useState(defaultMentorData.length);
  const [programManagerCount, setProgramManagerCount] = useState(defaultProgramManagerData.length);
  const [loading, setLoading] = useState(true);

  // Fetch counts for each report
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const bdeResponse = await axios.get('/api/bde/report');
        const mentorResponse = await axios.get('/api/mentor/report');
        const programResponse = await axios.get('/api/program/report');

        setBdeCount(bdeResponse.data.length || defaultBDEData.length);
        setMentorCount(mentorResponse.data.length || defaultMentorData.length);
        setProgramManagerCount(programResponse.data.length || defaultProgramManagerData.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report counts:', error);
        // Use default data if API fails
        setBdeCount(defaultBDEData.length);
        setMentorCount(defaultMentorData.length);
        setProgramManagerCount(defaultProgramManagerData.length);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []); // No warning now, as defaults are static and outside the component

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      {loading ? (
        <p className="text-gray-500">Loading counts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white px-6 py-4 rounded shadow hover:bg-blue-600">
            <h3 className="text-lg font-bold">BDE Management</h3>
            <p className="text-xl font-semibold">Total: {bdeCount}</p>
          </div>
          <div className="bg-green-500 text-white px-6 py-4 rounded shadow hover:bg-green-600">
            <h3 className="text-lg font-bold">Mentor Management</h3>
            <p className="text-xl font-semibold">Total: {mentorCount}</p>
          </div>
          <div className="bg-purple-500 text-white px-6 py-4 rounded shadow hover:bg-purple-600">
            <h3 className="text-lg font-bold">Program Managers</h3>
            <p className="text-xl font-semibold">Total: {programManagerCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
