import React from 'react';
import { useUniqueBatches } from '../contexts/UniqueBatchesContext';
import { FaIdCard, FaBook, FaCodeBranch, FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

const ViewBatch = () => {
  const { batches, loading } = useUniqueBatches();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <p className="text-lg font-semibold text-gray-600">Loading batches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          View All Batches
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {batches.map((batch) => (
          <div
            key={batch.BatchId}
            className="bg-white rounded-lg shadow-lg p-6 border-t-4 hover:shadow-2xl transition duration-300 ease-in-out"
            style={{
              borderTopColor:
                batch.Status === 'Active'
                  ? 'green'
                  : batch.Status === 'Upcoming'
                  ? 'yellow'
                  : 'gray',
            }}
          >
            <h2 className="text-xl font-bold text-gray-700 flex items-center mb-2">
              <FaIdCard className="mr-2 text-blue-500" />
              {batch.Batch}
            </h2>
          
            <p className="text-md text-gray-500 flex items-center mb-2">
              <FaCodeBranch className="mr-2 text-green-500" />
              {batch.Course}
            </p>
            <p className="text-md text-gray-500 flex items-center mb-2">
              <FaCalendarAlt className="mr-2 text-yellow-500" />
              Start Date: {batch.Date}
            </p>
            <p className="text-md text-gray-500 flex items-center mb-2">
              <FaClock className="mr-2 text-indigo-500" />
              Duration: {batch.Duration}
            </p>
            <p
              className={`text-md font-semibold flex items-center ${
                batch.Status === 'Active'
                  ? 'text-green-600'
                  : batch.Status === 'Upcoming'
                  ? 'text-yellow-600'
                  : 'text-gray-500'
              }`}
            >
              <FaInfoCircle className="mr-2 text-pink-500" />
              {batch.Status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBatch;
