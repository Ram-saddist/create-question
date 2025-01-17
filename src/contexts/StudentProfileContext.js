import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const StudentProfileContext = createContext();

export const useStudent = () => useContext(StudentProfileContext);

export const StudentProvider = ({ children }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch function defined outside useEffect for reusability
  const fetchStudentDetails = async () => {
    const student_id = localStorage.getItem("student_id");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/getstudentdetails?student_id=${student_id}`
      );
      setStudentDetails(
        response.data || {
          name: null,
          age: null,
          city: null,
          state: null,
          phone: null,
          githubLink: null,
          collegeName: null,
          collegeUSNNumber: null,
          department: null,
          qualification: null,
          highestGraduationpercentage: null,
          yearOfPassing: null,
          studentSkills: [],
        }
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setStudentDetails({
        name: null,
        age: null,
        city: null,
        state: null,
        phone: null,
        githubLink: null,
        collegeName: null,
        collegeUSNNumber: null,
        department: null,
        qualification: null,
        highestGraduationpercentage: null,
        yearOfPassing: null,
        studentSkills: [],
      });
      setLoading(false);
    }
  };

  // Fetch data when the component mounts


  return (
    <StudentProfileContext.Provider
      value={{
        studentDetails,
        setStudentDetails,
        loading,
        fetchStudentDetails, // Expose fetch function for manual refresh
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
};
