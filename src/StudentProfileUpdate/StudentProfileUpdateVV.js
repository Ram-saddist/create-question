import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useStudent } from "../contexts/StudentProfileContext";
import StudentProfileV from "../StudentProfile/StudentProfileV";
import { useEdit } from "../contexts/EditContext";
import {
  FaUserCircle,
  FaGraduationCap,
  FaBriefcase,
  FaFileUpload,
  FaEdit,
} from "react-icons/fa";

export default function StudentProfileUpdateVV() {
  const { studentDetails, loading, fetchStudentDetails } = useStudent();
  const [file, setFile] = useState(null);
  const { edit, setEdit } = useEdit();

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const updateResume = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No File Selected",
        text: "Please select a file before submitting.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("student_id", localStorage.getItem("student_id"));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/updateresume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Resume Updated Successfully",
          icon: "success",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an issue updating your resume. Please try again later.",
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 100 * 1024; // 100 KB

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "The uploaded file must be less than 100 KB.",
        });
        e.target.value = "";
      } else {
        setFile(selectedFile);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4 py-6">
      {edit ? (
        <StudentProfileV />
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 lg:p-10">
          {loading ? (
            <p className="text-lg text-gray-500 text-center">Loading...</p>
          ) : (
            <>
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-blue-500 text-5xl">
                    {studentDetails?.name
                      ? studentDetails.name.charAt(0).toUpperCase()
                      : <FaUserCircle />}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      {studentDetails?.name || "No Name"}
                    </h1>
                    <p className="text-gray-500">Student Profile</p>
                  </div>
                </div>
                <button
                  onClick={() => setEdit(!edit)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaEdit className="inline mr-2" /> Edit Profile
                </button>
              </div>

              {/* Profile Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    <FaUserCircle className="inline mr-2 text-blue-500" /> Personal Information
                  </h2>
                  <p className="text-gray-700">
                    <strong>Age:</strong> {studentDetails?.age || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {studentDetails?.city || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>State:</strong> {studentDetails?.state || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {studentDetails?.phone || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Github:</strong>{" "}
                    <a
                      href={studentDetails?.githubLink || "#"}
                      className="text-blue-500 hover:underline"
                    >
                      {studentDetails?.githubLink || "N/A"}
                    </a>
                  </p>
                </div>

                {/* Academic Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    <FaGraduationCap className="inline mr-2 text-purple-500" /> Academic Information
                  </h2>
                  <p className="text-gray-700">
                    <strong>College:</strong> {studentDetails?.collegeName || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>USN:</strong> {studentDetails?.collegeUSNNumber || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Department:</strong> {studentDetails?.department || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Qualification:</strong> {studentDetails?.qualification || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Graduation %:</strong>{" "}
                    {studentDetails?.highestGraduationpercentage || "N/A"}%
                  </p>
                  <p className="text-gray-700">
                    <strong>Year of Passing:</strong> {studentDetails?.yearOfPassing || "N/A"}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  <FaBriefcase className="inline mr-2 text-green-500" /> Skills
                </h2>
                <p className="text-gray-700">
                  {studentDetails?.studentSkills?.length > 0
                    ? studentDetails.studentSkills.join(", ")
                    : "N/A"}
                </p>
              </div>

              {/* Resume Upload */}
              <form encType="multipart/form-data" onSubmit={updateResume} className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  <FaFileUpload className="inline mr-2 text-indigo-500" /> Update Resume
                </h2>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <input
                    className="w-full md:w-auto text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none p-2"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    Update Resume
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
