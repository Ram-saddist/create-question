import React, { useState } from "react";
import SubjectDropdown from "./SubjectDropdown";
import BatchSelector from "./BatchSelector";
import CurriculumTable from "./CurriculumTable";

const Course = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  return (
    <div className="min-h-screen bg- py-10 px-5 bg-black">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Mentor Dashboard
        </h1>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex-1 min-w-[200px]">
              <SubjectDropdown setSelectedSubject={setSelectedSubject} />
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
              <CurriculumTable selectedBatch={selectedBatch} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
