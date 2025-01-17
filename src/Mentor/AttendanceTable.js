import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import { useUniqueBatches } from '../contexts/UniqueBatchesContext';
import { FaCalendarAlt } from "react-icons/fa"; 

const mockSubjects = {
  Python: ["Python Full Stack (PFS)"],
  CoreJava: ["Java Full Stack (JFS)"],
  AdvancedJava: ["Java Full Stack (JFS)"],
  Flask: ["Python Full Stack (PFS)"],
  Frontend: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
  MySQL: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
  SoftSkills: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
  Aptitude: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
  "Data Science": ["Data Science"],
  "Data Analytics": ["Data Analytics"],
};

const AttendanceTable = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("SelectSubject");
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("SelectBatch");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { batches, fetchBatches } = useUniqueBatches();

  useEffect(() => {
    fetchBatches(); // Fetch batches on component mount
  }, []);

  useEffect(() => {
    // Filter batches based on the selected subject
    if (selectedSubject && mockSubjects[selectedSubject]) {
      const validCourses = mockSubjects[selectedSubject];
      const filtered = batches.filter((batch) =>
        validCourses.includes(batch.Course)
      );
      setFilteredBatches(filtered);
    } else {
      setFilteredBatches([]);
    }
  }, [selectedSubject, batches]);

  const fetchAttendanceData = async () => {
    if (selectedSubject === "SelectSubject" || selectedBatch === "SelectBatch") {
      return;
    }

    const location = localStorage.getItem("location");
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getattends`, {
        params: {
          subject: selectedSubject,
          batch: selectedBatch,
          location,
        },
      });

      const data = response.data?.data || [];
      setStudents(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedSubject, selectedBatch]);

  const handleExportToExcel = () => {
    if (!students.length) {
      alert("No attendance data to export!");
      return;
    }

    const wb = XLSX.utils.book_new();
    const formattedData = students.flatMap((record) =>
      record.students.map((student, index) => ({
        "S.No": index + 1,
        "Student ID": student.studentId || "N/A",
        Name: student.name || "N/A",
        Status: student.status || "N/A",
        Remarks: student.remarks || "N/A",
        "Batch No": record.batchNo || "N/A",
        Course: record.course || "N/A",
        Date: record.datetime || "N/A",
      }))
    );

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const sheetName = students[0]?.course?.replace(/[^a-zA-Z0-9]/g, "_") || "Attendance";
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}_Summary.xlsx`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text pt-4">
            Student Attendance
          </span>
        </h1>
        <div className="mb-6 flex justify-between items-center">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Select Subject</label>
            <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="SelectSubject" disabled>
              Select Subject
            </option>
            {Object.keys(mockSubjects).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Select Batch</label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              disabled={filteredBatches.length === 0}
            >
              <option value="SelectBatch" disabled>
                Select Batch
              </option>
              {filteredBatches.map((batch) => (
                <option key={batch.Batch} value={batch.Batch}>
                  {batch.Batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Details */}
        {loading ? (
          <p className="text-blue-600 font-semibold mt-6">Loading attendance data...</p>
        ) : students.length > 0 ? (
            students.map((record, index) => (
            <div key={index} className="bg-blue-100 rounded-lg p-4 shadow-md mt-6">
              {/* Attendance Details */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">Attendance Details</h2>
                  <p><strong>Batch:</strong> {record.batchNo}</p>
                  <p><strong>Course:</strong> {record.course}</p>
                  <p><strong>Date:</strong> {record.datetime}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-md">
                    Present: {record.students.filter((s) => s.status === "present").length}
                  </p>
                  <p className="text-red-600 font-semibold bg-red-100 px-4 py-2 rounded-md">
                    Absent: {record.students.filter((s) => s.status === "absent").length}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b border-gray-200">Student ID</th>
                  <th className="p-3 border-b border-gray-200">Name</th>
                  <th className="p-3 border-b border-gray-200">Status</th>
                  <th className="p-3 border-b border-gray-200">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {record.students.map((student, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="p-3 border-b border-gray-200">{student.studentId}</td>
                    <td className="p-3 border-b border-gray-200">{student.name}</td>
                    <td
                      className={`p-3 border-b border-gray-200 font-semibold ${
                        student.status === "present" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {student.status}
                    </td>
                    <td className="p-3 border-b border-gray-200">{student.remarks || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

              
            </div>
          ))
        ) : (
          <p className="text-gray-500 font-semibold mt-6">No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;
