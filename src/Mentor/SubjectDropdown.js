import React from "react";

const subjects = [
  "Python",
  "MySQL",
  "Flask",
  "Frontend",
  "CoreJava",
  "AdvJava",
  "SoftSkills",
  "Aptitude",
];

const SubjectDropdown = ({ setSelectedSubject }) => {
  return (
    <div className="flex flex-col items-center bg-black space-y-4 md:space-y-6 px-6 py-6  rounded-lg shadow-lg max-w-md mx-auto">
      <label className="text-lg font-semibold text-white md:text-xl">
        Select a Subject:
      </label>
      <select
        className="w-full px-4 py-2 text-sm md:text-base bg-white text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:border-transparent shadow-md hover:shadow-lg transition duration-300"
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="" className="text-gray-400">
          --Select Subject--
        </option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectDropdown;
