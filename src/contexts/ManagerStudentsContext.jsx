import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const ManagerStudentsContext = createContext();

export const useStudentsManageData = () => {
  return useContext(ManagerStudentsContext);
};

export const StudentsManageProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchManageStudents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Get location from localStorage
      const location = localStorage.getItem('location');

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/stdlocations`, {
        params: { location }, // Pass location as a query parameter
      });

      setStudentsList(response.data);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchManageStudents();
  }, [fetchManageStudents]);

  const contextValue = useMemo(
    () => ({ studentsList, loading, error, fetchManageStudents }),
    [studentsList, loading, error, fetchManageStudents]
  );

  return (
    <ManagerStudentsContext.Provider value={contextValue}>
      {children}
    </ManagerStudentsContext.Provider>
  );
};
