import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import axios from "axios";
import { useStudentsData } from "../../contexts/StudentsListContext";
import { useUniqueBatches } from '../../contexts/UniqueBatchesContext';
import { read, utils } from "xlsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


import {
  FaUpload,
  FaFileExcel,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa"; 

export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const { fetchStudentsData } = useStudentsData();
    const { batches,fetchBatches } = useUniqueBatches();
 

  const [formData, setFormData] = useState({
    studentId: "",
    batchNo: "",
    email: "",
    studentPhNumber: "",
    parentNumber: "",
    location: "",
  });
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useExcel, setUseExcel] = useState(false);
  const location = localStorage.getItem('location');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    useEffect(() => {
      fetchBatches();
    }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      switch (fileExtension) {
        case "xlsx":
        case "xls": {
          const data = new Uint8Array(content);
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows = utils.sheet_to_json(sheet, { header: 1 });

          if (rows.length > 1) {
            const headers = rows[0].map((header) => header.toLowerCase().trim());
            const formattedData = rows.slice(1).map((row) => ({
              studentId: row[headers.indexOf("studentid")]?.toString().toUpperCase() || "",
              batchNo: row[headers.indexOf("batchno")]?.toString().toUpperCase() || "",
              email: row[headers.indexOf("email")]?.toString() || "",
              studentPhNumber: row[headers.indexOf("studentphnumber")]?.toString() || "",
              parentNumber: row[headers.indexOf("parentnumber")]?.toString() || "",
              location: row[headers.indexOf("location")]?.toString().toLowerCase() || "",
            }));
            setExcelData(formattedData);
            console.log(formattedData);
          } else {
            Swal.fire({
              title: "Invalid Excel File",
              text: "The file is empty or missing headers.",
              icon: "error",
            });
          }
          break;
        }

        default:
          Swal.fire({
            title: "Invalid File",
            text: "Unsupported file type. Please upload Excel, CSV, or JSON files.",
            icon: "error",
          });
          break;
      }
    };

    if (["xlsx", "xls"].includes(fileExtension)) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        studentId: "CG112",
        batchNo: "PFS-100",
        email: "example@gmail.com",
        studentPhNumber: "8688031605",
        parentNumber: "8688031603",
        location
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Student_Enrollment_Template.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`;

      if (!useExcel) {
        const response = await axios.post(endpoint, {
          ...formData,
          studentId: formData.studentId.toUpperCase(),
          batchNo: formData.batchNo.toUpperCase(),
        });

        if (response.status === 200) {
          Swal.fire({ title: `Student Enrolled Successfully`, icon: "success" });
        }
      } else {
        const response = await axios.post(endpoint, { excelData });

        if (response.status === 200) {
          Swal.fire({ title: "Students Enrolled Successfully", icon: "success" });
        }
      }

      await fetchStudentsData();
      navigate("/bdedashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.error || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] bg-[#e1e7ff] p-4">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
      {useExcel && (
          <div className="flex justify-center gap-4 mb-4 text-center items-center">
            <span className="text-red-600"> Demo template for uploade Excel File
            </span>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleDownloadTemplate}
            >
              <FaDownload /> Download Template
            </button>
          </div>
        )}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Enrollment
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 ${
              !useExcel ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUseExcel(false)}
          >
            <FaUser /> Manual Entry
          </button>
          <button
            className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 
              ${
              useExcel ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUseExcel(true)}
          >
            <FaFileExcel /> Excel Upload
          </button>
        </div>

      

        <form onSubmit={handleSubmit}>
  {!useExcel ? (
    <>
      {/* Student ID */}
      <div className="mb-4">
        <label htmlFor="studentId" className="block text-black font-semibold mb-2">
          Student ID
        </label>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaUsers className="text-black mr-2" />
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="Enter Student ID"
            value={formData.studentId}
            onChange={handleChange}
            className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
            required
          />
        </div>
      </div>

      {/* Batch No (Dropdown) */}
      <div className="mb-4">
  <label htmlFor="batchNo" className="block text-black font-semibold mb-2">
    Batch
  </label>
  <div className="flex items-center border border-gray-300 rounded-md p-2">
    <FaCalendarAlt className="text-black mr-2" />
    <select
      id="batchNo"
      name="batchNo"
      value={formData.batchNo}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, batchNo: e.target.value }))
      }
      className="w-full px-3 py-2 text-gray-800 font-medium"
      required
    >
      <option value="" disabled>
        Select Batch
      </option>
      {batches.map((batch) => (
        <option key={batch.Batch} value={batch.Batch}>
          {batch.Batch}
        </option>
      ))}
    </select>
  </div>
</div>



      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-black font-semibold mb-2">
          Email
        </label>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaEnvelope className="text-black mr-2" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
            required
          />
        </div>
      </div>

      {/* Student Phone Number */}
      <div className="mb-4">
        <label htmlFor="studentPhNumber" className="block text-black font-semibold mb-2">
          Student Phone Number
        </label>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaPhone className="text-black mr-2" />
          <input
            id="studentPhNumber"
            name="studentPhNumber"
            type="number"
            placeholder="Enter Student Phone Number"
            value={formData.studentPhNumber}
            onChange={handleChange}
            className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
            required
          />
        </div>
      </div>

      {/* Parent Phone Number */}
      <div className="mb-4">
        <label htmlFor="parentNumber" className="block text-black font-semibold mb-2">
          Parent Phone Number
        </label>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaPhone className="text-black mr-2" />
          <input
            id="parentNumber"
            name="parentNumber"
            type="number"
            placeholder="Enter Parent Phone Number"
            value={formData.parentNumber}
            onChange={handleChange}
            className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-black font-semibold mb-2">
          Location
        </label>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaMapMarkerAlt className="text-black mr-2" />
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-800 font-medium"
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            <option value={location}>{location}</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 text-white font-semibold rounded-md mt-4 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </>
  ) : (
    <div className="mb-4">
      <label
        htmlFor="excelUpload"
        className="block text-black font-semibold mb-2"
      >
        Upload Excel
      </label>
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <FaUpload className="text-black mr-2" />
        <input
          id="excelUpload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="flex-1 px-2 py-1 text-gray-800 outline-none"
        />
      </div>
    </div>
  )}
        </form>

      </div>
    </div>
  );
}
