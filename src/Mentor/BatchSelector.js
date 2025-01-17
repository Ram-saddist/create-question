import React from "react";

const batches = {
  Python: ["PFS-100", "PFS-101", "PFS-102", "PFS-103", "PFS-104"],
  Flask: ["PFS-100", "PFS-101", "PFS-102", "PFS-103", "PFS-104"],
  MySQL: [
    "PFS-100",
    "PFS-101",
    "PFS-102",
    "JFS-10",
    "JFS-11",
    "JFS-12",
    "JFS-13",
    "JFS-14",
  ],
  Frontend: ["Frontend-01", "Frontend-02", "Frontend-03"],
  CoreJava: ["JFS-11", "JFS-12", "JFS-13", "JFS-14", "JFS-15"],
  AdvJava: ["JFS-11", "JFS-12", "JFS-13", "JFS-14", "JFS-15"],
  SoftSkills: ["SoftSkills-01", "SoftSkills-02", "SoftSkills-03"],
  Aptitude: ["Aptitude-01", "Aptitude-02", "Aptitude-03"],
};

const BatchSelector = ({ selectedSubject, setSelectedBatch }) => {
  return (
    <div className="flex flex-col items-center bg-black space-y-4 md:space-y-6 px-6 py-6  rounded-lg shadow-lg max-w-md mx-auto">
      <label
        htmlFor="batch-selector"
        className="text-xl font-semibold text-white text-center"
      >
        Select a Batch
      </label>
      <select
        id="batch-selector"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 hover:shadow-lg transition duration-300"
        onChange={(e) => setSelectedBatch(e.target.value)}
      >
        <option value="" className="text-gray-400">
          --Select Batch--
        </option>
        {batches[selectedSubject]?.map((batch, index) => (
          <option key={index} value={batch}>
            {batch}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BatchSelector;
