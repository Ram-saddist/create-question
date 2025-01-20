import React, { useState } from "react";
import axios from "axios";
import SubjectDropdown from "./SubjectDropdown";
import BatchSelector from "./BatchSelector";
import CurriculumTable from "./CurriculumTable";

const Course = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [curriculumData, setCurriculumData] = useState([]);

  const fetchSyllabus = async (subject) => {
    const location = localStorage.getItem("location");
    try {
      console.log(subject,location)
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/mentorsyllabus`,
        {
          params: { subject, location: location || "default_location" },
        }
      );
      console.log("response",response.data)
      setCurriculumData(response.data.curriculum || []); // Assuming the API returns { syllabus: [...] }
    } catch (error) {
      console.error("Error fetching syllabus:", error);
      setCurriculumData([]); // Reset if there's an error
    }
  };

  return (
    <div className="min-h-screen bg- py-10 px-5 bg-black">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Mentor Dashboard
        </h1>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex-1 min-w-[200px]">
              <SubjectDropdown
                setSelectedSubject={(subject) => {
                  setSelectedSubject(subject);
                  if (subject) fetchSyllabus(subject); // Fetch syllabus on subject selection
                }}
              />
            </div>
            {selectedSubject && (
              <div className="flex-1 min-w-[200px]">
                <BatchSelector
                  selectedSubject={selectedSubject}
                  setSelectedBatch={setSelectedBatch}
                />
              </div>
            )}
          </div>
          {selectedBatch && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <CurriculumTable
                selectedBatch={selectedBatch}
                curriculumData={curriculumData} // Pass fetched data here
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
