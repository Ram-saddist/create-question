import React from "react";

function MockInterviewHome() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <header className="text-center mt-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-700">
          Advanced AI Mock Interview Platform
        </h1>
        <p className="text-xl mt-4 text-gray-600 italic">
          Sharpen your skills with real-time AI-driven interviews and get job-ready!
        </p>
      </header>

      {/* Stats Section */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-11/12 md:w-2/4">
        {/* Total Mock Interviews Taken */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Interviews Taken</h3>
          <p className="text-4xl font-bold text-blue-500 mt-4">9</p>
        </div>

        {/* Upcoming Mock Interviews */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
  <h3 className="text-xl font-semibold text-gray-800">Upcoming Interviews</h3>
  <ul className="mt-4 space-y-2">
    <li className="text-lg text-green-500 font-medium">
      January 5, 2025 - 10:00 AM
    </li>
   
  </ul>
</div>


        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">ATS Score</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-4">63/100</p>
        </div>
      </section>

   
      {/* Start Interview Button */}
      <div className="mt-16">
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transform hover:scale-105 hover:bg-blue-600 transition duration-300"
          onClick={() =>
            (window.location.href = "https://interview.framewise.ai/?comp_id=codegnan.com")
          }
        >
          Start Your Mock Interview
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-20 text-center">
        <p className="text-gray-600 text-sm">
          Built with 💻 and ❤️ by Codegnan. © 2025 All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default MockInterviewHome;
