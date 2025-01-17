import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UniqueBatchesContext = createContext();

export const UniqueBatchesProvider = ({ children }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = localStorage.getItem('location')

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/batches`, {
        params: { location }, // Pass location dynamically
      });
      console.log(response)
      setBatches(response.data.data );
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch batch data. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

console.log(batches)

  useEffect(() => {
    fetchBatches(); // Fetch unique batches
  }, []);

  return (
    <UniqueBatchesContext.Provider value={{ batches, loading, fetchBatches }}>
      {children}
    </UniqueBatchesContext.Provider>
  );
};

export const useUniqueBatches = () => useContext(UniqueBatchesContext);
